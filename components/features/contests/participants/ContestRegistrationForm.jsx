"use client"

import { useEffect, useState } from "react";
import { selectContestById, useUpdateContestSignupsMutation } from "../contestsApiSlice";
import { useSelector } from "react-redux";

const ContestRegistrationForm = ({ userId, contestId }) => {
    const contest = useSelector((state) => selectContestById(state, contestId));
    const { name, year, description, max_score, signups_active, signup_ids } = contest;

    const [buttonText, setButtonText] = useState(signup_ids.includes(userId) ? "Unregister" : "Register");
    const [isRegistered, setIsRegistered] = useState(signup_ids.includes(userId));

    const [updateContestSignups, { isLoading, isSuccess, isError, error }] = useUpdateContestSignupsMutation();

    useEffect(() => {
        if (isError) alert(error.error);
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            setButtonText(isRegistered ? "Register" : "Unregister");
            setIsRegistered(!isRegistered);
            alert(`Successfully ${isRegistered ? "unregistered" : "registered"} for ${name}`);
        }
    }, [isSuccess]);

    const handleSignup = async (e) => {
        e.preventDefault();
        const type = isRegistered ? "remove" : "add";
        await updateContestSignups({ id: contestId, participant_id: userId, type });
    }

    if (!signups_active) return null;

    let registeredText = (isRegistered)
        ? <p style={{'color': 'green'}}>You are registered for this contest!</p>
        : <p style={{'color': 'red'}}>You are not registered for this contest.</p>;

    if (isLoading) {
        return (
            <>
                <section>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h2>Contest Name: {name}</h2>
                        <p>Contest Year: {year}</p>
                        <p>Contest Description:<br /> {description}</p>
                        <p>Out of: {max_score}</p>
                        <button disabled>{buttonText} Loading...</button>
                    </form>
                </section>
                <br />
            </>
        )
    }

    return (
        <>
            <section>
                <form onSubmit={handleSignup}>
                    <h2>Contest Name: {name}</h2>
                    <p>Contest Year: {year}</p>
                    <p>Contest Description:<br /> {description}</p>
                    <p>Out of: {max_score}</p>
                    {registeredText}
                    <button type="submit">{buttonText}</button>
                </form>
            </section>
            <br />
        </>
    );
}

export default ContestRegistrationForm;
