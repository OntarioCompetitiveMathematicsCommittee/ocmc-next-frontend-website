"use client"

import { useEffect, useState } from 'react'

import { useGetUsersByContestMutation } from '@components/features/users/usersApiSlice'

import ProctorUserDisplay from '@components/features/users/proctors/ProctorUserDisplay'
import TableHead from '@components/TableHead'

const Contests = () => {
    const [yoyoyo, {isLoading, isSuccess, isError, error}] = useGetUsersByContestMutation();
    const [users, setUsers] = useState([]);
    
    const fetchData = async () => {
        const users = await yoyoyo({contest_id: "6494e8d8383c89a925ffdc9a"});
        setUsers(users);
        console.log(users);
    }

    useEffect(() => {
        fetchData()
    }, [])

    let content;
    let userScore

	// page loading
	if (isLoading) content = <p>Loading...</p>

	// display error
	if (isError) content = <p>{error.error}</p>

	// render list of participants
	if (isSuccess) {
		// const { ids } = users;

		// // list of participants based on their ids
		// const tableContent = ids?.map(userId => <ProctorUserDisplay key={userId} userId={userId} school={proctor.school} />);
	
		content = (
			<div className='flex flex-col items-center w-full h-full gap-24 py-24 overflow-scroll'>
				{/** title with proctor school name */}
				<div className='text-center'>
					<h1 className={"text-5xl"}>Registered Participants for</h1>
				</div>
				<div className='flex flex-col w-4/5 gap-4'>
					{/** table to display list of registered participants under the proctor */}
					<table className='table-auto border-spacing-10'>
						<TableHead headings={["Username", "First Name", "Last Name", "Email", "Score"]}/>
						<tbody className='text-xl'>
                            {users?.data?.map((user, index) => {
                                userScore = user.contest_data.find(item => item.contest_id === "6494e8d8383c89a925ffdc9a").score;
                                return (
                                <tr className="bg-white border-2" key={index}>
                                    <td className="p-4">{user.username}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
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