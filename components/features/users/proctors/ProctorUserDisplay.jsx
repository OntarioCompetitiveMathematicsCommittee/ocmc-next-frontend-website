"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectUserById, useUpdateUserMutation, useDeleteUserMutation } from "../usersApiSlice"

import Link from "next/link"

const ProctorUserDisplay = ({ userId, school, searchQuery }) => {
    const [tempPwd, setTempPwd] = useState("");

    const user = useSelector((state) => selectUserById(state, userId));

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

    const [deleteUser, {
        isLoading: isDeleting,
        isSuccess: isDeleted,
        isError: isDeleteError,
        deleteError
    }] = useDeleteUserMutation();

    useEffect(() => {
        if (isDeleted) {
            alert(`${user.username} has been deleted.`);
        }
    }, [isDeleted]);

    useEffect(() => {
        if (isDeleteError) {
            alert(`Error deleting ${user.username}: ${deleteError}!`);
        }
    }, [isDeleteError]);

    const [updateUser2, {
        isLoading: isActivating,
        isSuccess: isActivated,
        isError: isActivateError,
        activateError
    }] = useUpdateUserMutation();

    useEffect(() => {
        if (isActivated) {
            alert(`${user.username} has been activated.`);
        }
    }, [isActivated]);

    useEffect(() => {
        if (isActivateError) {
            alert(`Error activating ${user.username}: ${activateError}!`);
        }
    }, [isActivateError]);

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

    const handleDelete = async (e) => {
        e.preventDefault();
    
        if (window.confirm(`Are you sure you want to delete ${user.username}? This is an irreversible action.`)) {
            try {
                console.log("Attempting to delete user with ID: ", user.id);
                const response = await deleteUser({ id: user.id });
                console.log("Delete response: ", response);
            } catch (err) {
                console.error("Error occurred while deleting user: ", err);
            }
        }
    }       

    const handleActivate = async (e) => {
        e.preventDefault();

        if (window.confirm(`Are you sure you want to activate ${user.username}?`)) {
            await updateUser2({
                id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                grade: user.grade,
                school: user.school,
                password: user.password,
                roles: user.roles,
                activate: true
            });
        }
    }

    if (user) {
        if (user.school !== school || !user.roles.includes("Participant")) return null;

        if (searchQuery !== "") {
            if (!user.username.toLowerCase().includes(searchQuery.toLowerCase())
                && !user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
                && !user.last_name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return null;
            }
        }

        return (
            <tr className="bg-white border-2">
                <td className="py-4 pl-4">{user.username}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.grade}</td>
                <td>{user.email}</td>
                <td>
                    <Link className="px-6 py-2 text-white bg-green-500 rounded-md" href={"school-users/view/" + userId}>View</Link>
                </td>
                <td>
                    {user.active ?
                        "Already Verified" :
                        <button className="px-6 py-1 text-white bg-green-500 rounded-md" onClick={(e) => handleActivate(e)}>
                            Activate
                        </button>
                    }
                </td>
                <td>
                    <button className="px-6 py-1 text-white bg-red-500 rounded-md" onClick={(e) => handlePwdReset(e)}>Reset</button>
                </td>
                <td>
                    <button className="px-6 py-1 text-white bg-red-500 rounded-md" onClick={(e) => handleDelete(e)}>Delete</button>
                </td>
            </tr>
        );

    } else return null;
}

export default ProctorUserDisplay
