"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectUserById, useUpdateUserMutation } from "../usersApiSlice"

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
        if (user.school !== school || !user.roles.includes("Participant")) return null;

        if (searchQuery !== "") {
            if (!user.username.toLowerCase().includes(searchQuery.toLowerCase())
                && !user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
                && !user.last_name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return null;
            }
        }

        return (
            <tr>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                    <button className="pwd-reset" onClick={(e) => handlePwdReset(e)}>Reset Password</button>
                </td>
            </tr>
        );

    } else return null;
}

export default ProctorUserDisplay
