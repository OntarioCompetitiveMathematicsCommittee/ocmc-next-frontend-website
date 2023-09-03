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

	return (
		<div className='flex flex-col items-center w-full h-full gap-4 py-8 overflow-y-scroll'>
			<div className='flex flex-col items-center gap-2 text-center'>
				{/** title */}
				<h1 className="portalh2">Contest List</h1>
			</div>

			<div className='flex flex-col items-center w-4/5 gap-4'>
				<form onSubmit={onUpdateContestClicked} className="flex flex-col items-center gap-4">
					<div className='flex flex-col gap-2'>
						<label className="text-xl text-brandBlue-900" htmlFor="name">Name:</label>
						<input className="px-2 py-1 border-2 rounded-md w-96"
						placeholder="Contest Name"	
							type="text"
							id="name"
							name="name"
							value={name}
							onChange={handleNameChange}
						/>
					</div>
					
					<div className='flex flex-col gap-2'>
						<label className="text-xl text-brandBlue-900" htmlFor="year">Year:</label>
						<input className="px-2 py-1 border-2 rounded-md w-96"
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
							className="h-32 px-2 py-1 border-2 rounded-md w-96"
							id="description"
							name="description"
							value={description}
							onChange={handleDescriptionChange}
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label className="text-xl text-brandBlue-900" htmlFor="max_score">Max Score:</label>
						<input className="px-2 py-1 border-2 rounded-md w-96"
							type="number"
							id="max_score"
							name="max_score"
							value={max_score}
							onChange={handleMaxScoreChange}
						/>
					</div>

					<div className='flex items-center justify-start w-full gap-1'>
						<label className="text-xl text-brandBlue-900" htmlFor="signups_active">Signups Active:</label>
						<input className="w-4 h-4 px-2 py-1 border-2 rounded-md accent-brandBlue-600"
							type="checkbox"
							id="signups_active"
							name="signups_active"
							checked={signups_active}
							onChange={handleSignupsActiveChange}
						/>
					</div>
					<button type="submit" disabled={!canSubmit} className='flex justify-center px-2 py-2 text-xl text-white transition-colors rounded-md w-96 bg-brandBlue-500 hover:bg-brandBlue-600'>Update Contest</button>
				</form>
				<button onClick={onDeleteContestClicked} disabled={isDeleting} className='flex justify-center px-2 py-2 text-xl text-white transition-colors bg-red-500 rounded-md w-96 hover:bg-red-600'>Delete Contest</button>
			</div>
		</div>
	)
}

export default EditContestForm
