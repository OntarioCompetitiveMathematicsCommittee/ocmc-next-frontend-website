"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useUpdateContestMutation, useDeleteContestMutation } from './contestsApiSlice'

import BackButton from '@components/elements/BackButton'

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
		<section className="relative flex flex-col items-center justify-center w-full h-full gap-8 pb-32">
			<BackButton path={'/portal/contests'}/>
			<p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>

			<h1 className="portalh2">Edit Contest</h1>

			<form onSubmit={onUpdateContestClicked} className="flex flex-col items-center gap-4">
				<div className='flex flex-col gap-2'>
					<label className="text-xl text-brandBlue-900" htmlFor="name">Name:</label>
					<input className="border-2 w-96"
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={handleNameChange}
					/>
				</div>
				
				<div className='flex flex-col gap-2'>
					<label className="text-xl text-brandBlue-900" htmlFor="year">Year:</label>
					<input className="border-2 w-96"
						type="text"
						id="year"
						name="year"
						value={year}
						onChange={handleYearChange}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label className="text-xl text-brandBlue-900" htmlFor="description">Description:</label>
					<textarea
						className="h-32 border-2 w-96"
						id="description"
						name="description"
						value={description}
						onChange={handleDescriptionChange}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<label className="text-xl text-brandBlue-900" htmlFor="max_score">Max Score:</label>
					<input className="border-2 w-96"
						type="number"
						id="max_score"
						name="max_score"
						value={max_score}
						onChange={handleMaxScoreChange}
					/>
				</div>

				<div className='flex items-center justify-start w-full gap-1'>
					<label className="text-xl text-brandBlue-900" htmlFor="signups_active">Signups Active:</label>
					<input className="w-4 h-4 border-2 accent-brandBlue-600"
						type="checkbox"
						id="signups_active"
						name="signups_active"
						checked={signups_active}
						onChange={handleSignupsActiveChange}
					/>
				</div>
				<button type="submit" disabled={!canSubmit} className='flex justify-center w-64 px-2 py-2 text-white rounded-md bg-brandBlue-500'>Update Contest</button>
			</form>
			<button onClick={onDeleteContestClicked} disabled={isDeleting} className='flex justify-center w-64 px-2 py-2 text-white bg-red-500 rounded-md'>Delete Contest</button>
		</section>
	)

	return (
		<div>
			{content}
		</div>
	)
}

export default EditContestForm
