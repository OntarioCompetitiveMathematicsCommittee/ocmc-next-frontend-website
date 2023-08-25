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
    const [usernameFocus, setUsernameFocus] = useState(false)

    const [firstname, setFirstname] = useState(user.first_name)
    const [validFirstname, setValidFirstname] = useState(false)
    const [firstnameFocus, setFirstnameFocus] = useState(false)

    const [lastname, setLastname] = useState(user.last_name)
    const [validLastname, setValidLastname] = useState(false)
    const [lastnameFocus, setLastnameFocus] = useState(false)

    const [school, setSchool] = useState(user.school)
    const [validSchool, setValidSchool] = useState(false)
    const [schoolFocus, setSchoolFocus] = useState(false)

    const [email, setEmail] = useState(user.email)
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [grade, setGrade] = useState(user.grade)
    const [validGrade, setValidGrade] = useState(false)
    const [gradeFocus, setGradeFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

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
            <div className="success">
                <section>
                    <h2>Success!</h2>
                    <p>User <strong><em>{username}</em></strong> has been successfully updated.</p>

                    <button onClick={() => router.replace(submitRoute)}> {rerouteText} </button>
                </section>
            </div>
        )
    }

    const content = (
        <section>
            <p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>
            <form onSubmit={e => e.preventDefault()}>
                <h2>Edit User Data</h2>

                <label htmlFor="username">
                    Username:
                    <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={onUsernameChanged}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    className={usernameFocus ? (validUsername ? "valid" : "invalid") : ""}
                    aria-invalid={!validUsername}
                    aria-describedby="username-err"
                    required
                />
                <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="firstname">
                    First Name:
                    <FontAwesomeIcon icon={faCheck} className={validFirstname ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validFirstname || !firstname ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={firstname}
                    onChange={onFirstnameChanged}
                    onFocus={() => setFirstnameFocus(true)}
                    onBlur={() => setFirstnameFocus(false)}
                    className={firstnameFocus ? (validFirstname ? "valid" : "invalid") : ""}
                    aria-invalid={!validFirstname}
                    aria-describedby="firstname-err"
                    required
                />
                <p id="firstnote" className={firstnameFocus && !validFirstname ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    You must enter a first name.
                </p>

                <label htmlFor="lastname">
                    Last Name:
                    <FontAwesomeIcon icon={faCheck} className={validLastname ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validLastname || !lastname ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={lastname}
                    onChange={onLastnameChanged}
                    onFocus={() => setLastnameFocus(true)}
                    onBlur={() => setLastnameFocus(false)}
                    className={lastnameFocus ? (validLastname ? "valid" : "invalid") : ""}
                    aria-invalid={!validLastname}
                    aria-describedby="lastname-err"
                    required
                />
                <p id="lastnote" className={lastnameFocus && !validLastname ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    You must enter a last name.
                </p>

                {
                    ((!user.roles.includes('Proctor')) || isAdmin) &&
                    <>
                        <label htmlFor="school">
                            School:
                            <FontAwesomeIcon icon={faCheck} className={validSchool ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validSchool || !school ? "hide" : "invalid"} />
                        </label>
                        <select
                            id="school"
                            onChange={onSchoolChanged}
                            value={school}
                            required
                            aria-invalid={validSchool ? "false" : "true"}
                            aria-describedby="schoolnote"
                            onFocus={() => setSchoolFocus(true)}
                            onBlur={() => setSchoolFocus(false)}
                            className="select-school"
                        >
                            <option value="" disabled hidden>Select a school</option>
                            {SCHOOLS.map((school, index) => (
                                <option key={index} value={school}>{school}</option>
                            ))}
                        </select>
                        <p id="schoolnote" className={schoolFocus && !validSchool ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            You must select a school.
                        </p>

                        <label htmlFor="grade">
                            Grade:
                            <FontAwesomeIcon icon={faCheck} className={validGrade ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validGrade || !grade ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="grade"
                            name="grade"
                            value={grade}
                            onChange={onGradeChanged}
                            onFocus={() => setGradeFocus(true)}
                            onBlur={() => setGradeFocus(false)}
                            className={gradeFocus ? (validGrade ? "valid" : "invalid") : ""}
                            aria-invalid={!validGrade}
                            aria-describedby="grade-err"
                            required
                        />
                        <p id="gradenote" className={gradeFocus && !validGrade ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be valid grade between 1 and 12, with no spaces.
                        </p>
                    </>
                }

                <label htmlFor="email">
                    Email:
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onEmailChanged}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    className={emailFocus ? (validEmail ? "valid" : "invalid") : ""}
                    aria-invalid={!validEmail}
                    aria-describedby="email-err"
                    required
                />
                <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    You must enter a valid email address.
                </p>

                {
                    !editingAll &&
                    <>
                        <label htmlFor="password">
                            Password (Leave Empty to Keep Current):
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onPasswordChanged}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            className={passwordFocus ? (validPassword ? "valid" : "invalid") : ""}
                            aria-invalid={!validPassword}
                            aria-describedby="password-err"
                        />
                        <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                        </p>
                    </>
                }

                {isAdmin && editingAll &&
                    <>
                        <label htmlFor="roles">
                            Roles:
                        </label>
                        <select
                            id="roles"
                            onChange={onRolesChanged}
                            value={roles}
                            required
                            className="select-roles"
                            multiple
                        >
                            <option value="Participant">Participant</option>
                            <option value="Proctor">Proctor</option>
                            <option value="Executive">Executive</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </>
                }

                <button onClick={onSaveUserClicked} disabled={!canSave}>Save Changes</button>
            </form>

            {
                (isAdmin && editingAll) &&
                <button onClick={onDeleteUserClicked} className="delete-button">
                    <FontAwesomeIcon icon={faTrashCan} />
                    Delete User
                </button>
            }
        </section>
    )

    return <div className="edit-user">{content}</div>
}

export default EditUserForm
