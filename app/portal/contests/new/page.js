"use client"

import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation'
import { useAddNewContestMutation } from "@components/features/contests/contestsApiSlice";

const NewContest = () => {
    const errRef = useRef(null);

    const [addNewContest, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewContestMutation();

    const router = useRouter();

    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [max_score, setMaxScore] = useState('');

    const handleNameChange = (e) => setName(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleMaxScoreChange = (e) => setMaxScore(e.target.value);

    const canSubmit = [name, year, description, max_score].every(Boolean) && !isLoading;

    useEffect(() => {
        if (isSuccess) router.push('/portal/contests');
    }, [isSuccess, router]);

    const onCreateContestClicked = async (e) => {
        e.preventDefault();
        if (canSubmit) await addNewContest({ name, year, description, max_score });
    }

    let errmsg;
    if (isError) errmsg = error.error;

    const content = (
        <section>
            <p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>

            <h1>New Contest</h1>

            <form onSubmit={onCreateContestClicked}>
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

                <button type="submit" disabled={!canSubmit}>Save Contest</button>
            </form>
        </section>
    );

    return (
        <div>
            {content}
        </div>
    )
}

export default NewContest
