"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

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

  const logoutButton = (
    <button
      className="logout"
      onClick={handleLogout}
    > Logout </button>
  )

  const header = (
    <header>
      <div>
        <nav>
          <ul>
            <li> <Link href="/portal">Home</Link> </li>

            {isAdmin && <li> <Link href="/portal/users">Users List</Link> </li>}

            {(isAdmin || isExecutive) && <li> <Link href="/portal/posts">Posts List</Link> </li>}
            {(isAdmin || isExecutive) && <li> <Link href="/portal/contests">Contests List</Link> </li>}

            {isParticipant && <li> <Link href="/portal/participants/results">View Scores</Link> </li>}
            {isParticipant && <li> <Link href="/portal/participants/registration">Contest Registration</Link> </li>}

            {isProctor && <li> <Link href="/portal/proctors/todos">Proctor Todos</Link> </li>}
            {isProctor && <li> <Link href="/portal/proctors/schoolUsers">Your Schools Participant List</Link> </li>}

            <li> <Link href="/portal/edit-self">Edit Account</Link> </li>

            <li> {logoutButton} </li>
          </ul>
        </nav>
      </div>
    </header>
  )

  return header;
}

export default PortalHeader
