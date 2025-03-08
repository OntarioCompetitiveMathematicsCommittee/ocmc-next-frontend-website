'use client';

import React, { useState, useEffect } from 'react';
import useAuth from '@hooks/useAuth';
import { useSelector } from 'react-redux';
import {
    useGetUsersQuery,
    selectUserById,
} from '@components/features/users/usersApiSlice';
import { useGetProblemListQuery } from '@components/features/ocontests/problemApiSlice';
import {
    useGetUserSubsQuery,
    useAddUserAnswerMutation,
    useSaveUserAnswerMutation,
} from '@components/features/ocontests/subApiSlice';

const OnlineContest = () => {
    const { id: user_id } = useAuth();
    const { isSuccess: isUsersSuccess, isLoading: isUsersLoading } = useGetUsersQuery();
    const currUser = useSelector((state) => selectUserById(state, user_id));

    const { data: problemLists, isSuccess: isProblemListsSuccess, isLoading: isProblemListsLoading } = useGetProblemListQuery();
    const { data: userSubsData, refetch: refetchUserSubmissions, isFetching: isFetchingUserSubs } = useGetUserSubsQuery(user_id);
    
    const [addUserAnswer, { isLoading: isAdding, isError: isAddError, error: addError }] = useAddUserAnswerMutation();
    const [saveUserAnswer, { isLoading: isSaving, isError: isSaveError, error: saveError }] = useSaveUserAnswerMutation();
    const [submissionId, setSubmissionId] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [answers, setAnswers] = useState({ mcAnswers: [], shortAnswers: [] });
    const [remainingTime, setRemainingTime] = useState('');

    let curContest = null;
    if (isProblemListsSuccess && problemLists) {
        const { ids, entities } = problemLists;
        const currentDate = new Date();
        curContest = ids.map(id => entities[id]).find(problemList => {
            const contestStart = new Date(problemList.contestStart);
            const contestEnd = new Date(problemList.contestEnd);
            return currentDate >= contestStart && currentDate <= contestEnd;
        });
    }

    useEffect(() => {
        if (userSubsData && curContest) {
            const userSubmissions = Object.values(userSubsData.entities);
            const submission = userSubmissions.find(sub => sub.problemList_id === curContest.id);
            if (submission) {
                setSubmissionId(submission.id);
                setAnswers({ mcAnswers: submission.mc_answers, shortAnswers: submission.short_answers });
                setIsSubmitted(submission.is_submitted);
            } else {
                setSubmissionId(null);
            }
        }
    }, [userSubsData, curContest]);

    useEffect(() => {
        if (submissionId !== null) {
            saveUserAnswer({ id: submissionId, mc_answers: answers.mcAnswers, short_answers: answers.shortAnswers, is_submitted: isSubmitted})
                .then(response => {
                })
                .catch(error => {
                    console.error("Save failed:", error);
                });
        } else if (submissionId === null && (answers.mcAnswers.length > 0 || answers.shortAnswers.length > 0)) {
            addUserAnswer({ user_id, problemList_id: curContest.id, mc_answers: answers.mcAnswers, short_answers: answers.shortAnswers })
                .then(response => {
                    refetchUserSubmissions();
                })
                .catch(error => {
                    console.error("Initial save failed:", error);
                });
        }
    }, [answers]);

    useEffect(() => {
        if (curContest) {
            const interval = setInterval(() => {
                const currentTime = new Date();
                const contestEndTime = new Date(curContest.contestEnd);
                const timeDiff = contestEndTime - currentTime;

                if (timeDiff <= 0) {
                    setRemainingTime('Contest has ended');
                    clearInterval(interval);
                } else {
                    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                    setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [curContest]);

    if (isUsersLoading || isProblemListsLoading || isFetchingUserSubs) return <p>Loading...</p>;
    if (!curContest) return <p>No active contest found</p>;

    const handleMcAnswerChange = async (index, value) => {
        const newMcAnswers = [...answers.mcAnswers];
        newMcAnswers[index] = value;
        setAnswers(prevAnswers => ({ ...prevAnswers, mcAnswers: newMcAnswers }));
    };
    
    const handleShortAnswerChange = async (index, value) => {
        const newShortAnswers = [...answers.shortAnswers];
        newShortAnswers[index] = value;
        setAnswers(prevAnswers => ({ ...prevAnswers, shortAnswers: newShortAnswers }));
    };

    // const registered = currUser?.contest_data.find(
    //     (contest) => contest.contest_id === curContest.con
    // );
    // contest id isnt part of the schema for problemlist so i cant check

    const handleSubmit = async () => {
        if (submissionId !== null) {
            saveUserAnswer({ id: submissionId, mc_answers: answers.mcAnswers, short_answers: answers.shortAnswers, is_submitted: true })
                .then(response => {
                    setIsSubmitted(true);
                })
                .catch(error => {
                    console.error("Submission failed:", error);
                });
        } else {
            console.error("No submission ID found. Cannot submit answers.");
        }
    };
    
    if (isUsersSuccess && curContest) {
        return (
            <section className='flex flex-col items-center justify-start flex-1 w-full h-full overflow-y-auto'>
                <h1 className='my-4 text-2xl font-bold'>{curContest.name}</h1>
                <p className='text-lg'>{remainingTime}</p>
                {curContest.mc_questions.map((problem, index) => (
                    <div key={index} className='w-5/6 p-4 mb-6 bg-white border rounded shadow'>
                        <h2 className='mb-2 text-xl font-semibold'>{problem.question}</h2>
                        <div className='flex flex-col'>
                            {problem.options.map((option, idx) => (
                                <label key={idx} className='mb-2'>
                                    <input
                                        type='radio'
                                        name={`mc_question-${index}`}
                                        value={option}
                                        className='mr-2'
                                        checked={answers.mcAnswers[index] === option}
                                        onChange={() => handleMcAnswerChange(index, option)}
                                        disabled={isSubmitted}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                {curContest.short_answer_questions.map((problem, index) => (
                    <div key={index} className='w-5/6 p-4 mb-6 bg-white border rounded shadow'>
                        <h2 className='mb-2 text-xl font-semibold'>{problem.question}</h2>
                        <input
                            type='number'
                            className='w-full p-2 border rounded'
                            placeholder='Enter your answer'
                            value={answers.shortAnswers[index] || ''}
                            onChange={(e) => handleShortAnswerChange(index, e.target.value)}
                            disabled={isSubmitted}
                        />
                    </div>
                ))}
                <button
                    className={`px-4 py-2 mt-4 text-white rounded ${isSubmitted ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}
                    onClick={handleSubmit}
                    disabled={isSubmitted}
                >
                    Submit
                </button>
            </section>
        );
    }

    return (
        <section className='flex flex-col items-center justify-center flex-1 w-full h-full'>
            <p>You are not registered for this contest or no active problem list found</p>
        </section>
    );
};

export default OnlineContest;