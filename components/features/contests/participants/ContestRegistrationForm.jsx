"use client"

import { useEffect, useState } from "react";
import { selectContestById, useUpdateContestSignupsMutation } from "../contestsApiSlice";
import { useUpdateUserContestsMutation } from "@components/features/users/usersApiSlice";
import { useSelector } from "react-redux";

const ContestRegistrationForm = ({ userId, contestId, username }) => {
    const contest = useSelector((state) => selectContestById(state, contestId));
    const { name, year, description, max_score, signups_active, signup_ids } = contest;

    const [buttonText, setButtonText] = useState(signup_ids.includes(userId) ? "Unregister" : "Register");
    const [isRegistered, setIsRegistered] = useState(signup_ids.includes(userId));

    const [updateContestSignups, { isLoading, isSuccess, isError, error }] = useUpdateContestSignupsMutation();
    const [updateUserContests, { isLoading: isUserLoading, isSuccess: isUserSuccess, isError: isUserError, error: userError }] = useUpdateUserContestsMutation();

    useEffect(() => {
        if (isError && isUserError) {
            alert(error.error + " " + userError.error);
        }
    }, [isError, isUserError, error, userError]);

    useEffect(() => {
        if (isSuccess && isUserSuccess) {
            setButtonText(isRegistered ? "Register" : "Unregister");
            setIsRegistered(!isRegistered);
            alert(`Successfully ${isRegistered ? "unregistered" : "registered"} for ${name}`);
        }
    }, [isSuccess, isUserSuccess]);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (isLoading || isUserLoading) return; // Prevent multiple submissions
        const type = isRegistered ? "remove" : "add";
        try {
            await Promise.all([
                updateContestSignups({ id: contestId, participant_id: userId, type }),
                updateUserContests({ username, contest_id: contestId, score: -1, type })
            ]);
        } catch (err) {
            console.error("Failed to update registrations:", err);
        }
    };

    if (!signups_active) return null;

    return (
        <form className={"flex w-4/5 max-w-3xl px-12 py-6 rounded-xl justify-between items-start md:items-center shadow-sm flex-col md:flex-row gap-2 md:gap-0 " 
            + (isRegistered ? "bg-emerald-100 border-2 border-emerald-200" : "bg-brandBlue-100 border-2 border-brandBlue-200")} 
            onSubmit={handleSignup}>
            <div className="flex flex-col">
                <p className={"text-xl "  + (isRegistered ? "bg-emerald-100 text-emerald-700" : "bg-brandBlue-100 text-brandBlue-700")}>{year}</p>
                <h2 className="text-3xl">{name}</h2>
                <p>{description}</p>
            </div>
            <button className={"w-auto px-8 h-full py-2 rounded-full text-white text-2xl " 
                + (isRegistered ? "bg-emerald-800" : "bg-brandBlue-800")} 
                type="submit" 
                disabled={isLoading || isUserLoading}>
                {buttonText}
            </button>
        </form>
    );
}

export default ContestRegistrationForm;
