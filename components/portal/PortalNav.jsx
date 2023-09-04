"use client"

import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

import HamburgerMenu from '@components/elements/HamburgerMenu';

import PortalElement from '@components/portal/PortalElement';

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

const PortalNav = () => {
    const [page, setPage] = useState('');
    const [navOpen, setNavOpen] = useState(false);

	const handleNavToggle = () => {
		setNavOpen((prev) => !prev);
	};

    const { isAdmin, isExecutive, isProctor, isParticipant, highest_status} = useAuth();

    const router = useRouter();
    const pathname = usePathname();

    const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) router.replace('/');;
    }, [isSuccess, router]);

    useEffect(() => {
        setPage(pathname)
        setNavOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        sendLogout();
        router.replace('/');
    }

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Unable to Logout: {error.data?.message}</p>

    const header = (
        <>
            <div onClick={handleNavToggle} className='fixed z-10 flex p-4 border-2 rounded-full bg-brandNeutral-200 bottom-4 right-4 lg:hidden'>
                <div className='pointer-events-none'>
                    <HamburgerMenu
                        navOpen={navOpen}
                        handleNavToggle={handleNavToggle}
                    />
                </div>
            </div>
            
            <div className='absolute p-4 pointer-events-none w-72 lg:static'></div>
            <nav className={'fixed top-0 flex flex-col justify-between h-full p-4 pt-24 w-72 bg-brandNeutral-200 lg:translate-x-0 transition-transform duration-500 z-20 ' 
                + (navOpen ? 'translate-x-0' : '-translate-x-full')}>
                <div className='flex flex-col gap-4 pt-2'>
                    <PortalElement 
                        selected={page === '/portal'}
                        setPage={setPage}
                        icon={dashboard} 
                        name={"Dashboard"} 
                        path="/portal"
                    />

                    {isAdmin && 
                        <PortalElement 
                            selected={page === '/portal/users'}
                            setPage={setPage}
                            icon={users} 
                            name={"Users List"} 
                            path="/portal/users"
                        />}
                    {(isAdmin || isExecutive) && 
                        <PortalElement 
                            selected={page === '/portal/posts'}
                            setPage={setPage}
                            icon={posts} 
                            name={"Posts List"} 
                            path="/portal/posts"
                        />}
                    {(isParticipant) && 
                        <PortalElement 
                            selected={page === '/portal/participants/posts'}
                            setPage={setPage}
                            icon={posts} 
                            name={"Announcements"} 
                            path='/portal/participants/posts'
                        />}
                    {(isProctor) && 
                        <PortalElement 
                            selected={page === '/portal/proctors/posts'}
                            setPage={setPage}
                            icon={posts} 
                            name={"Announcements"} 
                            path='/portal/proctors/posts'
                        />}
                    
                    {(isAdmin || isExecutive) && 
                        <PortalElement 
                            selected={page === '/portal/contests'}
                            setPage={setPage}
                            icon={contests} 
                            name={"Contests List"} 
                            path="/portal/contests"
                        />}
                    {(isProctor) && 
                        <PortalElement 
                            selected={page === '/portal/proctors/contests'}
                            setPage={setPage}
                            icon={contests} 
                            name={"View Contests"} 
                            path="/portal/proctors/contests"
                        />}

                    {isParticipant && 
                        <PortalElement 
                            selected={page === '/portal/participants/results'}
                            setPage={setPage}
                            icon={scores} 
                            name={"View Scores"} 
                            path="/portal/participants/results"
                        />}
                    

                    {isParticipant && 
                        <PortalElement 
                            selected={page === '/portal/participants/registration'}
                            setPage={setPage}
                            icon={contestRegistration} 
                            name={"Contest Registration"} 
                            path="/portal/participants/registration"
                        />}

                    {isProctor && 
                        <PortalElement 
                            selected={page === '/portal/proctors/todos'}
                            setPage={setPage}
                            icon={todos} 
                            name={"Proctor Todo"} 
                            path="/portal/proctors/todos"
                        />}

                    {isProctor && 
                        <PortalElement
                            selected={page === '/portal/proctors/school-users'}
                            setPage={setPage}
                            icon={schools}
                            name={"Schools Participants"}
                            path="/portal/proctors/school-users"
                        />}
                    
                    <PortalElement
                        selected={page === '/portal/edit-self'}
                        setPage={setPage}
                        icon={user}
                        name={"Edit Account"}
                        path="/portal/edit-self"
                    />
                </div>
                <button className='flex w-full gap-2 p-2 rounded-md' onClick={handleLogout}>
                    <Image src={logout} alt={'logout button'}/>
                    <h1>Logout</h1>
                </button>
            </nav>
        </>
    )

    return header;
}

export default PortalNav
