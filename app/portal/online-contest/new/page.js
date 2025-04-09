"use client"

// importing required modules and components
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { useAddNewProblemListMutation } from "@components/features/problem-lists/problemListsApiSlice";

import MathEditor from "@components/features/problem-lists/MathEditor";
import Latex from "@node_modules/react-latex-next/dist";

// conversion functions, maybe move to another file
// conversion to work with html datetime strings
const dateToLocalString = (date) => {
    if (!date) return null;

    const year = String(date.getFullYear()).padStart(4, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}`;
};

// duration in milliseconds to string (maximum to weeks)
const durationToString = (duration) => {
    if (duration === 0) return "0 minutes";
    if (duration < 0) return "negative duration";
    if (duration < 60 * 1000) return "less than a minute";

    // holy modulus
    const weeks = Math.floor(duration / (7 * 24 * 60 * 60 * 1000));
    const days = Math.floor((duration % (7 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((duration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));

    var result = '';
    if (weeks > 0) result += `${weeks} week${weeks > 1 ? 's' : ''} `;
    if (days > 0) result += `${days} day${days > 1 ? 's' : ''} `;
    if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) result += `${minutes} minute${minutes > 1 ? 's' : ''}`;

    return result.trim();
}


const NewOnlineContest = () => {
    // reference to error message element
    const errRef = useRef(null);

    // mutation function for adding a new online contest (problemlist)
    const [addNewProblemList, {isLoading, isSuccess, isError, error}] = useAddNewProblemListMutation();

    const router = useRouter();

    // online contest details
    const [name, setName] = useState("");
    // todo: clean up this mess of inits
    const [contestStart, setContestStart] = useState(new Date(new Date(Date.now()).setSeconds(0, 0))); // default to now, remove seconds and milliseconds
    const [contestEnd, setContestEnd] = useState(new Date(new Date(Date.now()).setSeconds(0, 0) + 60 * 60 * 1000)); // default end time to 1 hour later
    const [mc_questions, setMcQuestions] = useState([]);
    const [short_answer_questions, setShortAnswerQuestions] = useState([]);
    const [mathEditorText, setMathEditorText] = useState("");

    // event handlers
    const onCreateContestClicked = async (e) => {
        e.preventDefault();
        await addNewProblemList({name, startTime, endTime}); // todo: enforce validation (ex: start time earlier than end time)
    }
    
    return (
        <div className='flex flex-col items-center w-full h-full gap-4 py-8 pt-24 overflow-y-scroll'>
            <h1 className="portalh2">New Online Contest</h1>

            <form onSubmit={onCreateContestClicked} className="flex flex-col items-center gap-6">
                <div className='flex flex-col items-center gap-4'>
                    <div className='flex flex-col items-center gap-2'>
                        <label className="text-xl text-brandBlue-900" htmlFor="name">Contest Name:</label>
                        <input
                            className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                            placeholder="Contest Name"
                            type="text"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <span className="flex flex-col items-center">
                            <label className="text-xl text-brandBlue-900" htmlFor="contestStart">Start Time:</label>
                            <label className="text-sm text-gray-500">Note: The time uses your local timezone.</label>
                        </span>
                        <input
                            className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                            type="datetime-local"
                            id="contestStart"
                            value={dateToLocalString(contestStart)}
                            onChange={e => {
                                const date = new Date(e.target.value);
                                if (isNaN(date) || !(date instanceof Date)) return; // checks for invalid date

                                setContestStart(date);
                            }}
                            required
                        />
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <label className="text-xl text-brandBlue-900" htmlFor="contestEnd">End Time:</label>
                        <input
                            className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                            type="datetime-local"
                            id="contestEnd"
                            value={dateToLocalString(contestEnd)}
                            onChange={e => {
                                const date = new Date(e.target.value);
                                if (isNaN(date) || !(date instanceof Date)) return; // checks for invalid date

                                setContestEnd(date);
                            }}
                            required
                        />
                        <button
                            className="px-4 py-2 text-white transition-colors rounded-md bg-blue-500 hover:bg-blue-600"
                            onClick={() => setContestEnd(contestStart)}
                            type="button"
                        >Set to start time</button>
                        <label className="text-lg text-brandBlue-900">Duration: {durationToString(contestEnd - contestStart)}</label>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-4 w-full'>
                    {/* mc questions */}
                    <h1 className="text-2xl">Multiple Choice Questions</h1>
                    <ol>
                        { mc_questions.map((question, index) => (
                            <li key={index} className="flex flex-col items-center gap-2 w-full">
                                <Latex>{question.question}</Latex>
                            </li>
                        ))}
                    </ol>
                    <MathEditor text={mathEditorText} setText={setMathEditorText} />
                </div>
            </form>
        </div>
    )
}

export default NewOnlineContest;