"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useUpdateContestMutation, useDeleteContestMutation } from './contestsApiSlice'

import CreateEditLayout from '@components/features/CreateEditLayout'

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

	const fields = [
        {
            label: "Name",
            placeholder: "Contest Name",
            type: "text",
            id: "name",
            value: name,
            onChange: handleNameChange
        },
        {
            label: "Year",
            placeholder: "Contest Year",
            type: "number",
            id: "year",
            value: year,
            onChange: handleYearChange
        },
        {
            label: "Description",
            placeholder: "Contest Description",
            type: "textarea",
            id: "description",
            value: description,
            onChange: handleDescriptionChange
        },
        {
            label: "Max Score",
            placeholder: "Contest Max Score",
            type: "number",
            id: "max_score",
            value: max_score,
            onChange: handleMaxScoreChange
        },
        {
            label: "Signups Active",
            type: "checkbox",
            id: "signups_active",
            checked: signups_active,
            onChange: handleSignupsActiveChange
        }

    ]

    const buttons = [
        {
            type: "submit",
            disabled: !canSubmit,
            color: "bg-brandBlue-500 hover:bg-brandBlue-600",
            text: "Update Contest"
        },
        {
            type: "button",
            disabled: isDeleting,
            color: "bg-red-500 hover:bg-red-600",
            text: "Delete Contest",
            onClick: onDeleteContestClicked
        }
    ]

	return (
		<CreateEditLayout title="Contests List" fields={fields} buttons={buttons} backPath="/portal/contests" onSubmit={onUpdateContestClicked} isError={isError} errmsg={errmsg} errRef={errRef}/>
	)
}

export default EditContestForm

