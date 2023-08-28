"use client"

import { useGetContestsQuery, selectContestById } from "../contestsApiSlice"
import { useSelector } from "react-redux"
import { useState } from 'react'

const ContestDisplay = ({ id, score, maxScore, updateScore, isAdmin }) => {
    const [initialScore, setInitialScore] = useState(score)
    const [currScore, setCurrScore] = useState(score)

    const { isSuccess } = useGetContestsQuery(); // Fetch all contests

    const currContest = useSelector((state) => selectContestById(state, id));

    const changeCurrScore = (e) => {
        setCurrScore(e.target.value)
    }

    const updateCurrScore = () => {
        setInitialScore(currScore)
        updateScore(currScore, id)
    }

    if (isSuccess) {
        const { name, year } = currContest;
        return (
            <>
                <td className="py-4 pl-4">{name}</td>
                <td>{year}</td>
                <td className="flex items-center justify-center gap-4 h-14">
                    <div>
                        {isAdmin ? 
                            <input className="inline w-12 text-right bg-brandNeutral-200" 
                                type="number" 
                                value={currScore} 
                                onChange={changeCurrScore}
                            /> :
                            <p className="inline w-12 text-right">{currScore}</p>
                        }
                        /{maxScore}
                    </div>
                    {
                        isAdmin &&
                        <button onClick={updateCurrScore} 
                            className={"inline px-6 py-1 text-white bg-blue-500 rounded-md " 
                            + (initialScore == currScore && "hidden")}>
                            Change
                        </button>
                    }
                    
                </td>
            </>
        );
    }

    return <p>Something went wrong</p>;
}

export default ContestDisplay
