"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useUpdateContestMutation, useDeleteContestMutation } from './contestsApiSlice'

const EditContestForm = ({ contest, id }) => {
	const errRef = useRef(null)

	const [updateContest, { isLoading, isSuccess, isError, error }] = useUpdateContestMutation()
	const [deleteContest, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] = useDeleteContestMutation()

    const router = useRouter()

	const [name, setName] = useState(contest.name)
	const [year, setYear] = useState(contest.year)
	const [description, setDescription] = useState(contest.description)
	const [max_score, setMaxScore] = useState(contest.max_score)
	const [signups_active, setSignupsActive] = useState(contest.signups_active)

	const handleNameChange = (e) => setName(e.target.value)
	const handleYearChange = (e) => setYear(e.target.value)
	const handleDescriptionChange = (e) => setDescription(e.target.value)
	const handleMaxScoreChange = (e) => setMaxScore(e.target.value)
	const handleSignupsActiveChange = (e) => setSignupsActive(e.target.checked)

	const canSubmit = [name, year, description, max_score].every(Boolean) && !isLoading

	useEffect(() => {
		if (isSuccess || isDeleteSuccess) router.push('/portal/contests');
	}, [isSuccess, isDeleteSuccess, router])

	const onUpdateContestClicked = async (e) => {
		e.preventDefault()
		if (canSubmit) await updateContest({ id, name, year, description, max_score, signups_active })
        router.push('/portal/contests');
	}

	const onDeleteContestClicked = async (e) => {
		e.preventDefault();
		const confirmDelete = window.confirm("Are you sure you want to delete? This action cannot be undone.");
		if (confirmDelete) await deleteContest({ id });
        //the navigation back the page is supposed to be handled by the useEffect hook above, but it doesn't work. This is a temporary fix and will not be needed once the useEffect hook is fixed.
        router.push('/portal/contests');
	};

	let errmsg;
	if (isError) errmsg = error.error
	else if (isDeleteError) errmsg = deleteError.error

	const content = (
		<section>
			<p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>

			<h1>Edit Contest</h1>

			<form onSubmit={onUpdateContestClicked}>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					value={name}
					onChange={handleNameChange}
				/>

				<label htmlFor="year">Year:</label>
				<input
					type="text"
					id="year"
					name="year"
					value={year}
					onChange={handleYearChange}
				/>

				<label htmlFor="description">Description:</label>
				<textarea
					id="description"
					name="description"
					value={description}
					onChange={handleDescriptionChange}
				/>

				<label htmlFor="max_score">Max Score:</label>
				<input
					type="number"
					id="max_score"
					name="max_score"
					value={max_score}
					onChange={handleMaxScoreChange}
				/>

				<label htmlFor="signups_active">Signups Active:</label>
				<input
					type="checkbox"
					id="signups_active"
					name="signups_active"
					checked={signups_active}
					onChange={handleSignupsActiveChange}
				/>

				<button type="submit" disabled={!canSubmit}>Update Contest</button>
			</form>

			<button onClick={onDeleteContestClicked} disabled={isDeleting} className="delete-button">Delete Contest</button>

		</section>
	)

	return (
		<div>
			{content}
		</div>
	)
}

export default EditContestForm
