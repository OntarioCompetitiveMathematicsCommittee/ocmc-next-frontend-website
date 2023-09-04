"use client";

// importing required modules and components
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAddNewContestMutation } from "@components/features/contests/contestsApiSlice";

import CreateEditLayout from "@components/features/CreateEditLayout";

const NewContest = () => {
    // reference to error message element
    const errRef = useRef(null);

    // mutation function for adding a new contest
    const [addNewContest, { isLoading, isSuccess, isError, error }] = useAddNewContestMutation();

    const router = useRouter();

    // state variables for contest details
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [max_score, setMaxScore] = useState("");

    // event handlers that update state variables when input fields change
    const handleNameChange = (e) => setName(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleMaxScoreChange = (e) => setMaxScore(e.target.value);

    // form can be submitted if all fields have values and are not in loading state
    const canSubmit = [name, year, description, max_score].every(Boolean) && !isLoading;

    // redirects to contest page after successful contest creation
    useEffect(() => {
        if (isSuccess) router.push("/portal/contests");
    }, [isSuccess, router]);

    // handles form submission
    const onCreateContestClicked = async (e) => {
        e.preventDefault();
        if (canSubmit) await addNewContest({ name, year, description, max_score });
    };

    // error message handling
    let errmsg;
    if (isError) errmsg = error.error;

    const fields = [
        {
            label: "Name:",
            placeholder: "Contest Name",
            type: "text",
            id: "name",
            value: name,
            onChange: handleNameChange,
        },
        {
            label: "Year:",
            placeholder: "ex. 2024, 2011, etc.",
            type: "number",
            id: "year",
            value: year,
            onChange: handleYearChange,
        },
        {
            label: "Description:",
            placeholder: "This contest is about...",
            type: "textarea",
            id: "description",
            value: description,
            onChange: handleDescriptionChange,
        },
        {
            label: "Max Score:",
            placeholder: "ex. 100, 200, etc.",
            type: "number",
            id: "max_score",
            value: max_score,
            onChange: handleMaxScoreChange,
        },
    ]

    const buttons = [
        {
            type: "submit",
            disabled: !canSubmit,
            text: "Save Contest",
            color: "bg-brandBlue-500 hover:bg-brandBlue-600",
        }
    ]

    // styling
    return <CreateEditLayout title="New Contest" fields={fields} buttons={buttons} backPath={"/portal/contests"} onSubmit={onCreateContestClicked} isError={isError} error={errmsg} errRef={errRef}/>
}

export default NewContest;
