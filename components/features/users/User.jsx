"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectUserById, useUpdateUserMutation } from './usersApiSlice'

import Link from 'next/link'

const User = ({ userId, searchQuery }) => {
    const [tempPwd, setTempPwd] = useState("");

    const user = useSelector((state) => selectUserById(state, userId));
    const router = useRouter();
    const pathname = usePathname();

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation();

    useEffect(() => {
        if (isSuccess) {
            alert(`Password reset for ${user.username}! Their new password is ${tempPwd}. Please note this down somewhere as it will not be shown again, and notify the individual to log in with this password and change it as soon as possible.`);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            alert(`Error resetting password: ${error.error}!`);
        }
    }, [isError]);

    const handlePwdReset = async (e) => {
        e.preventDefault();

        if (window.confirm(`Are you sure you want to reset ${user.username}'s password? This is an irreversible action.`)) {
            const pwd = Math.random().toString(36).slice(-8);
            setTempPwd(pwd);
            await updateUser({
                id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                grade: user.grade,
                school: user.school,
                password: pwd,
                roles: user.roles
            });
        }
    }

    if (user) {
        if (searchQuery !== "") {
            if (!user.username.toLowerCase().includes(searchQuery.toLowerCase())
                && !user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
                && !user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
                && !user.school.toLowerCase().includes(searchQuery.toLowerCase())
                && !user.email.toLowerCase().includes(searchQuery.toLowerCase())) {
                return null;
            }
        }

        const handleEdit = () => router.push("/portal/users/" + userId);
        const userRolesString = user.roles.join(', ');

        return (
            <tr className="bg-white border-2">
                <td className="py-4 pl-4">{user.username}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.school}</td>
                <td>{user.email}</td>
                <td>{userRolesString}</td>
                <td>
                    <button onClick={handleEdit} className='px-6 py-1 text-white bg-blue-500 rounded-md'>Edit</button>
                </td>
                <td>
                    <button className="px-6 py-1 text-white bg-red-500 rounded-md" onClick={(e) => handlePwdReset(e)}>Reset</button>
                </td>
                <td>
                    <Link className="px-6 py-2 text-white bg-green-500 rounded-md" href={"users/view/" + userId}>View</Link>
                </td>
            </tr>
        )
    } else return null;
}

export default User
