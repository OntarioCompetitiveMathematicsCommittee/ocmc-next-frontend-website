"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

import PortalElement from '@components/PortalElement';
import PortalFooter from '@components/components/PortalFooter'

import contestRegistration from '@public/assets/dashboard-icons/contest-registration.svg'
import contests from '@public/assets/dashboard-icons/contests.svg'
import dashboard from '@public/assets/dashboard-icons/dashboard.svg'
import logout from '@public/assets/dashboard-icons/logout.svg'
import posts from '@public/assets/dashboard-icons/posts.svg'
import schools from '@public/assets/dashboard-icons/schools.svg'
import scores from '@public/assets/dashboard-icons/scores.svg'
import todos from '@public/assets/dashboard-icons/todos.svg'
import user from '@public/assets/dashboard-icons/user.svg'
import users from '@public/assets/dashboard-icons/users.svg'

const PortalHeader = () => {
    const { isAdmin, isExecutive, isProctor, isParticipant } = useAuth();

    const router = useRouter();

    const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) router.replace('/');;
    }, [isSuccess, router]);

    const handleLogout = () => {
        sendLogout();
        router.replace('/');
    }

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Unable to Logout: {error.data?.message}</p>
    const header = (
        <nav className=''>
            <ul className='flex flex-col justify-between w-80 h-full bg-brandNeutral-200 px-4'>
                <div className='flex flex-col gap-4 pt-2'>
                    <PortalElement 
                        icon={dashboard} 
                        name={"Dashboard"} 
                        path="/portal"
                    />

                    {isAdmin && 
                        <PortalElement 
                            icon={users} 
                            name={"Users List"} 
                            path="/portal/users"
                        />}
                    {(isAdmin || isExecutive) && 
                        <PortalElement 
                            icon={posts} 
                            name={"Posts List"} 
                            path="/portal/posts"
                        />}
                    {(isAdmin || isExecutive) && 
                        <PortalElement 
                            icon={contests} 
                            name={"Contests List"} 
                            path="/portal/contests"
                        />}

                    {isParticipant && 
                        <PortalElement 
                            icon={scores} 
                            name={"View Scores"} 
                            path="/portal/participants/results"
                        />}
                    

                    {isParticipant && 
                        <PortalElement 
                            icon={contestRegistration} 
                            name={"Contest Registration"} 
                            path="/portal/participants/registration"
                        />}

                    {isProctor && 
                        <PortalElement 
                        icon={todos} 
                        name={"Proctor Todo"} 
                        path="/portal/proctors/todos"
                    />}

                    {isProctor && 
                        <PortalElement
                            icon={schools}
                            name={"Schools Participants"}
                            path="/portal/proctors/schoolsUsers"
                        />}
                    
                    <PortalElement
                        icon={user}
                        name={"Edit Account"}
                        path="/portal/edit-self"
                    />
                </div>
                
                <div>
                    <PortalElement
                        icon={logout}
                        name={"Logout"}
                        path="/"
                        onClick={handleLogout}
                    />
                    <PortalFooter/>
                </div>
            </ul>
        </nav>
    )

    return header;
}

export default PortalHeader
