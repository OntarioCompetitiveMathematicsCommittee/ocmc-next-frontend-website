"use client"

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'next/navigation'

import { useGetUsersByContestQuery, selectUserById } from '@components/features/users/usersApiSlice'
import useAuth from '@components/hooks/useAuth'

import TableHead from '@components/TableHead'
import BackButton from '@components/elements/BackButton'

const Contests = () => {
    const params = useParams();
    const contest_id = params.contestId;
    const proctor_id = useAuth().id;
	const proctor = useSelector((state) => selectUserById(state, proctor_id));

    const {data:users, isLoading, isSuccess, isError, error} = useGetUsersByContestQuery({contest_id, school: "Oakville Trafalgar High School"}, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
      });

    let content;
    let userScore

	// page loading
	if (isLoading) content = <p>Loading...</p>

	// display error
	if (isError) content = <p>{error.error}</p>

	// render list of contest participants
	if (isSuccess) {
		content = (
			<div className='relative flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
                <BackButton path={"/portal/proctors/contests"}/>
				<div className='text-center'>
					<h1 className={"portalh2 font-normal"}>{"CONTEST"} Score</h1>
                    <h2 className={"portalh2 text-brandBlue-900"}>{proctor?.school}</h2>
				</div>
				<div className='flex flex-col w-4/5 gap-4'>
					{/** table to display list of registered participants under the proctor */}
					<table className='table-auto border-spacing-10'>
						<TableHead headings={["Username", "Full Name", "Grade", "Email", "Score"]}/>
						<tbody className='text-xl'>
                            {
                            users?.map((user, index) => {
                                userScore = user.contest_data.find(item => item.contest_id === contest_id).score;
                                return (
                                <tr className="bg-white border-2" key={index}>
                                    <td className="py-4 pl-4">{user.username}</td>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.grade}</td>
                                    <td>{user.email}</td>
                                    <td>{userScore === -1 ? "TBA" : userScore}</td>
                                </tr>
                                )})}
                        </tbody>
					</table>
				</div>
			</div>
		);
    }
    return content;
}

export default Contests