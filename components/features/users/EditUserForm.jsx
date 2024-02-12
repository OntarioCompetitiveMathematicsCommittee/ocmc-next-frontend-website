"use client"

import { useState, useEffect, useRef } from 'react';
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice';
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { SCHOOLS } from '../../../config/schools';
import useAuth from '../../../hooks/useAuth';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const EditUserForm = ({ user, editingAll }) => {
    const { isAdmin } = useAuth();

    const errRef = useRef(null);

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error,
    }] = useUpdateUserMutation();

    const [deleteUser, {
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        error: deleteError,
    }] = useDeleteUserMutation();

    const router = useRouter();

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)

    const [firstname, setFirstname] = useState(user.first_name)
    const [validFirstname, setValidFirstname] = useState(false)

    const [lastname, setLastname] = useState(user.last_name)
    const [validLastname, setValidLastname] = useState(false)

    const [school, setSchool] = useState(user.school)
    const [validSchool, setValidSchool] = useState(false)

    const [email, setEmail] = useState(user.email)
    const [validEmail, setValidEmail] = useState(false)

    const [grade, setGrade] = useState(user.grade)
    const [validGrade, setValidGrade] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [roles, setRoles] = useState(user.roles);

    const submitRoute = editingAll ? '/portal/users' : '/portal';
    const rerouteText = editingAll ? 'Return to Users List' : 'Return to Portal Home';

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidFirstname(firstname.length > 0)
    }, [firstname])

    useEffect(() => {
        setValidLastname(lastname.length > 0)
    }, [lastname])

    useEffect(() => {
        setValidSchool(school.length > 0 && SCHOOLS.includes(school.toString()))
    }, [school])

    useEffect(() => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        setValidEmail(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        if (user.roles.includes('Proctor') || isAdmin) {
            setValidGrade(true);
        } else {
            const isNumber = /^\d+$/.test(grade);
            if (isNumber) setValidGrade(grade >= 1 && grade <= 12);
            else setValidGrade(false);
        }
    }, [grade, isAdmin, user.roles]);

    const onUsernameChanged = e => setUsername(e.target.value);
    const onFirstnameChanged = e => setFirstname(e.target.value);
    const onLastnameChanged = e => setLastname(e.target.value);
    const onSchoolChanged = e => setSchool(e.target.value);
    const onEmailChanged = e => setEmail(e.target.value);
    const onGradeChanged = e => setGrade(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);
    const onRolesChanged = (e) => setRoles([...e.target.selectedOptions].map(o => o.value));

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({
                id: user.id,
                username,
                first_name: firstname,
                last_name: lastname,
                school,
                email,
                grade,
                password,
                roles
            });
        } else {
            await updateUser({
                id: user.id,
                username,
                first_name: firstname,
                last_name: lastname,
                school,
                email,
                grade,
                roles
            });
        }
    }

    const onDeleteUserClicked = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm("Are you sure you want to delete? This action cannot be undone.");

        if (confirmDelete) {
            await deleteUser({ id: user.id });
            router.replace(submitRouter);
        }
    }

    let canSave;
    if (password) canSave = [validUsername, validFirstname, validLastname, validSchool, validEmail, validGrade, validPassword].every(Boolean) && !isLoading;
    else canSave = [validUsername, validFirstname, validLastname, validSchool, validEmail, validGrade].every(Boolean) && !isLoading;

    let errmsg;
    if (isError) {
        window.scrollTo(0, 0);
        if (error.status === 409) {
            errmsg = <>Username is already taken. Please choose another.</>
        } else {
            errmsg = <>An error occurred. Please try again later.</>
        }
    } else if (isDeleteError) {
        window.scrollTo(0, 0);
        errmsg = <>An error occurred. Please try again later.</>
    }

    if (isSuccess) {
        window.scrollTo(0, 0);
        return (
            <section className="flex flex-col items-center flex-1 w-full gap-6 text-center pt-36 ">
                <h1 className='portalh2'>User {username} successfully updated.</h1>
                <p className='text-2xl text-blue-600 underline'>
                    <button onClick={() => router.replace(submitRoute)}> {rerouteText} </button>
                </p>
            </section>
        )
    }

    return (
        <section className='flex flex-col items-center w-full h-full gap-4 py-8 pt-24 overflow-y-scroll text-center'>

			<h2 className='portalh2'>Edit User Data</h2>

            <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4 text-left'>
                <div className='flex flex-col gap-2'>
                    <label className="text-xl text-brandBlue-900" htmlFor="id">
                        User ID:
                    </label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={user.code}
                        className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)] text-gray-500"
                        readOnly
                    />

                    <label className="text-xl text-brandBlue-900" htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={onUsernameChanged}
                        className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                        aria-invalid={!validUsername}
                        aria-describedby="username-err"
                        required
                    />
                    <p id="uidnote" 
                        className={
                            "text-red-600 text-sm w-[min(24rem,80vw)] " +
                            (validUsername && 'hidden')
                        }>
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>
                <div className='flex flex-col gap-4 md:gap-2 md:flex-row'>
                    <div className='flex flex-col gap-2'>
                        <label className="text-xl text-brandBlue-900" htmlFor="firstname">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={firstname}
                            onChange={onFirstnameChanged}
                            className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                            aria-invalid={!validFirstname}
                            aria-describedby="firstname-err"
                            required
                        />
                        <p id="firstnote"
                            className={
                                "text-red-600 text-sm w-[min(24rem,80vw)] " +
                                (validFirstname && 'hidden')
                            }>
                            You must enter a first name.
                        </p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="text-xl text-brandBlue-900" htmlFor="lastname">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={lastname}
                            onChange={onLastnameChanged}
                            className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                            aria-invalid={!validLastname}
                            aria-describedby="lastname-err"
                            required
                        />
                        <p id="lastnote"
                            className={
                                "text-red-600 text-sm w-[min(24rem,80vw)] " +
                                (validLastname && 'hidden')
                            }>
                            You must enter a last name.
                        </p>
                    </div>
                </div>
                

                {
                    ((!user.roles.includes('Proctor')) || isAdmin) &&
                    <div className='flex flex-col gap-4 md:gap-2 md:flex-row'>
                        <div className='flex flex-col gap-2'>
                            <label className="text-xl text-brandBlue-900" htmlFor="school">
                                School:
                            </label>
                            <select
                                id="school"
                                onChange={onSchoolChanged}
                                value={school}
                                required
                                aria-invalid={validSchool ? "false" : "true"}
                                aria-describedby="schoolnote"
                                className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                            >
                                <option value="" disabled hidden>Select a school</option>
                                {SCHOOLS.map((school, index) => (
                                    <option key={index} value={school}>{school}</option>
                                ))}
                            </select>
                            <p id="schoolnote" 
                                className={
                                    "text-red-600 text-sm w-[min(24rem,80vw)] " +
                                    (validSchool && 'hidden')
                                }>
                                You must select a school.
                            </p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className="text-xl text-brandBlue-900" htmlFor="grade">
                                Grade:
                            </label>
                            <input
                                type="number"
                                id="grade"
                                name="grade"
                                value={grade}
                                onChange={onGradeChanged}
                                className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                                aria-invalid={!validGrade}
                                aria-describedby="grade-err"
                                required
                            />
                            <p id="gradenote"
                                className={
                                    "text-red-600 text-sm w-[min(24rem,80vw)] " +
                                    (validGrade && 'hidden')
                                }>
                                Must be valid grade between 1 and 12, with no spaces.
                            </p>
                        </div>
                    </div>
                }
                <div className='flex flex-col gap-4 md:gap-2 md:flex-row'>
                    <div className='flex flex-col gap-2'>
                        <label className="text-xl text-brandBlue-900" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onEmailChanged}
                            className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                            aria-invalid={!validEmail}
                            aria-describedby="email-err"
                            required
                        />
                        <p id="emailnote" 
                            className={
                                "text-red-600 text-sm w-[min(24rem,80vw)] " +
                                (validEmail && 'hidden')
                            }>
                            You must enter a valid email address.
                        </p>
                    </div>
                    {
                        !editingAll &&
                        <div className='flex flex-col gap-2'>
                            <label className="text-xl text-brandBlue-900" htmlFor="password">
                                Password (Leave Empty to Keep Current):
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onPasswordChanged}
                                className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                                aria-invalid={!validPassword}
                                aria-describedby="password-err"
                                autoComplete="new-password"
                            />
                            <p id="passwordnote" 
                                className={
                                    "text-red-600 text-sm w-[min(24rem,80vw)] " +
                                    ((!password || validPassword) && 'hidden')
                                }>
                                8 to 24 characters.<br />
                                Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                            </p>
                        </div>
                    }
                </div>

                {isAdmin && editingAll &&
                    <>
                        <label className="text-xl text-brandBlue-900" htmlFor="roles">
                            Roles:
                        </label>
                        <select
                            id="roles"
                            onChange={onRolesChanged}
                            value={roles}
                            required
                            className="px-2 py-1 border-2 rounded-md w-[min(24rem,80vw)]"
                        >
                            <option value="Participant">Participant</option>
                            <option value="Proctor">Proctor</option>
                            <option value="Executive">Executive</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </>
                }

                <p ref={errRef} className={isError ? "errmsg" : "hidden"} aria-live="assertive">{errmsg}</p>

                <div className='flex flex-col gap-4 md:gap-2 md:flex-row'>
                    <button onClick={onSaveUserClicked} disabled={!canSave} type="submit"
                        className={'flex justify-center px-2 py-2 text-xl transition-colors rounded-md w-[min(24rem,80vw)] ' +
                        (!canSave ? "border-2 bg-brandNeutral-100" : ("text-white bg-brandBlue-500 hover:bg-brandBlue-600"))}>
                        Save Changes
                    </button>
                    {
                        (isAdmin && editingAll) &&
                        <button onClick={onDeleteUserClicked} type="button"
                            className='flex justify-center items-center gap-2 px-2 py-2 text-xl transition-colors rounded-md w-[min(24rem,80vw)] text-white bg-red-500 hover:bg-red-600'>
                            <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Delete User
                        </button>
                    }
                </div>
                
            </form>
        </section>
    )
}

export default EditUserForm
