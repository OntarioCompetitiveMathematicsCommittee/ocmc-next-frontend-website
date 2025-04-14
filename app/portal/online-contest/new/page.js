"use client"

// importing required modules and components
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAddNewProblemListMutation } from "@components/features/online-contest/problemListsApiSlice";

import MCQuestions from '@components/features/online-contest/new/MCQuestions';
import MetadataForm from "@components/features/online-contest/new/MetadataForm";
import SAQuestions from "@components/features/online-contest/new/SAQuestions";


const NewOnlineContest = () => {
    // mutation function for adding a new online contest (problemlist)
    const [addNewProblemList, {isLoading, isSuccess, isError, error}] = useAddNewProblemListMutation();

    const router = useRouter();

    // online contest details
    const [name, setName] = useState("");
    const [contestStart, setContestStart] = useState(new Date(new Date(Date.now()).setSeconds(0, 0))); // default to now, remove seconds and milliseconds
    const [contestEnd, setContestEnd] = useState(new Date(new Date(Date.now()).setSeconds(0, 0) + 60 * 60 * 1000)); // default end time to 1 hour later
    
    const [mc_questions, setMcQuestions] = useState([]);
    const [short_answer_questions, setShortAnswerQuestions] = useState([]);

    // event handlers
    const onCreateContestClicked = async (e) => {
        e.preventDefault();

        // Check for and compile errors
        // errors array
        let errors = [];   

        // redux loading/error
        if (isLoading || isError) errors.push("Loading/error: please wait before submitting again");

        // Invalid dates
        // If start is before now
        if (Date.now() > contestStart) errors.push("Invalid date: the start time has passed already");
        // End is before start
        if (contestStart >= contestEnd) errors.push("Invalid date: the end time is earlier than the start time");

        // MC Questions
        mc_questions.map((question, i) => {
            // Blank problem statement
            if (!question.question) errors.push(`MC Question ${i+1} has a blank problem statement`);
            
            // Blank option
            if (question.options.some((option) => !option)) errors.push(`MC Question ${i+1} has at least 1 blank answer option`);

            // No correct 
            if (!question.answer) errors.push(`MC Question ${i+1} has no correct answer set`);
        });

        // SA Questions
        short_answer_questions.map((question, i) => {
            // Blank problem statement
            if (!question.question) errors.push(`SA Question ${i+1} has a blank problem statement`);

            // Invalid answer 
            if (question.answer < 0 || question.answer > 999) errors.push(`SA Question ${i+1} has an invalid answer (# < 0 or # > 999)`);
        });

        // If there are any errors, alert them
        if (errors.length !== 0) {
            window.alert("There are errors:\n" + errors.join("\n"));
            return;
        }

        await addNewProblemList({name, contestStart, contestEnd, mc_questions, short_answer_questions});
    }

    // Submit went through
    useEffect(() => {
        if (isSuccess) router.push('/portal/online-contest');
    }, [isSuccess, router]);
    
    return (
        <div className='flex flex-col items-center w-full h-full gap-6 py-8 pt-24 overflow-y-scroll'>
            <h1 className="portalh2">New Online Contest</h1>

            <form onSubmit={onCreateContestClicked} className="flex flex-col items-center gap-12">
                {/* metadata (name, start, end) */}
                <MetadataForm
                    name={name}
                    setName={setName}
                    contestStart={contestStart}
                    setContestStart={setContestStart}
                    contestEnd={contestEnd}
                    setContestEnd={setContestEnd}
                />

                {/* mc questions */}
                <div className='flex flex-col items-center gap-2 w-full'>
                    <h1 className="text-2xl">Multiple Choice Questions</h1>
                    <div className="w-[min(50rem,60vw)]">
                        <MCQuestions
                            mc_questions={mc_questions}
                            setMcQuestions={setMcQuestions}
                        />
                    </div>
                </div>

                {/* short answer questions */}
                <div className='flex flex-col items-center gap-2 w-full'>
                    <h1 className="text-2xl">Short Answer Questions</h1>
                    <div className="w-[min(50rem,60vw)]">
                        <SAQuestions
                            sa_questions={short_answer_questions}
                            setSAQuestions={setShortAnswerQuestions}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 w-[min(24rem,80vw)] text-xl text-white transition-colors rounded-md bg-blue-500 hover:bg-blue-600"
                >
                    Create Contest
                </button>
            </form>
        </div>
    )
}

export default NewOnlineContest;