"use client"

import { useState } from 'react'

const ViewContestUserScores = ({user, index, contest_id, updateScore, isAdmin, maxScore}) => {
    const userScore = user.contest_data.find(item => item.contest_id === contest_id).score;
    
    const [initialScore, setInitialScore] = useState(userScore)
    const [currScore, setCurrScore] = useState(userScore)

    const changeCurrScore = (e) => {
        setCurrScore(e.target.value)
    }

    const updateCurrScore = () => {
        setInitialScore(currScore)
        updateScore(currScore, contest_id, user.username)
    }

    return (
        <tr className="bg-white border-2" key={index}>
            <td className="py-4 pl-4">{user.username}</td>
            <td>{user.first_name} {user.last_name}</td>
            {isAdmin && <td>{user.school}</td>}
            <td>{user.grade}</td>
            <td>{user.email}</td>
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
        </tr>
    )
}

export default ViewContestUserScores