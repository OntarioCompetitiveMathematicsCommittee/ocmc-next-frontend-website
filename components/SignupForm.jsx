"use client"

import { useRef, useState, useEffect } from "react"
import { useRegisterMutation } from "@components/features/auth/authApiSlice"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { SCHOOLS } from '@config/schools' 


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignupForm = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [register, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRegisterMutation();

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [usernameFocus, setUsernameFocus] = useState(false)

    const [firstname, setFirstname] = useState('')
    const [validFirstname, setValidFirstname] = useState(false)
    const [firstnameFocus, setFirstnameFocus] = useState(false)

    const [lastname, setLastname] = useState('')
    const [validLastname, setValidLastname] = useState(false)
    const [lastnameFocus, setLastnameFocus] = useState(false)

    const [school, setSchool] = useState('')
    const [validSchool, setValidSchool] = useState(false)
    const [schoolFocus, setSchoolFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [grade, setGrade] = useState('')
    const [validGrade, setValidGrade] = useState(false)
    const [gradeFocus, setGradeFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatchPassword, setValidMatchPassword] = useState(false)
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false)

    const roles = ["Participant"]

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        setValidMatchPassword(password === matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setValidFirstname(firstname.length > 0)
    }, [firstname])

    useEffect(() => {
        setValidLastname(lastname.length > 0)
    }, [lastname])

    useEffect(() => {
        setValidSchool(school.length > 0 && SCHOOLS.includes(school))
    }, [school])

    useEffect(() => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        setValidEmail(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        const isNumber = /^\d+$/.test(grade);
        if(isNumber) setValidGrade(grade >= 1 && grade <= 12);
        else setValidGrade(false);
    }, [grade]);

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onMatchPasswordChanged = e => setMatchPassword(e.target.value)
    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onLastnameChanged = e => setLastname(e.target.value)
    const onSchoolChanged = e => setSchool(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onGradeChanged = e => setGrade(e.target.value)

    const canSave = [roles.length, validUsername, validPassword, validMatchPassword, validFirstname, validLastname, validSchool, validEmail, validGrade].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await register({
                username: username,
                password: password,
                roles: roles,
                first_name: firstname,
                last_name: lastname,
                school: school,
                email: email,
                grade: grade
            })
        }
    }

    let errmsg;
    if (isError) {
        window.scrollTo(0, 0);
        if (error.status === 409) {
            errmsg = <>Username is already taken. Please choose another.</>
        } else {
            errmsg = <>An error occurred. Please try again later.</>
        }
    }

    let content;
    if (isSuccess) {
        content = (
            <section>
                <h1>User {username} successfully created!</h1>
                <br/>
                <p>
                    Click <Link href="/auth/login">here</Link> to log in.
                </p>
            </section>
        )
    } else {
        content = (
            <>
                <h1 className="text-3xl font-bold mb-3">
                    Register
                </h1>
                <section className="flex flex-col w-full items-center gap-2">
                    <form onSubmit={onSaveUserClicked} className='w-full flex flex-col gap-3 items-center'>
                        <div className='flex flex-col w-3/4'>
                            <label htmlFor="username">
                                Username:
                            </label>
                            <input
                                className='bg-gray-100 border border-gray-200 rounded-md text-sm py-2 px-4 w-full'
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={onUsernameChanged}
                                value={username}
                                required
                                aria-invalid={validUsername ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)}
                            />
                        </div>
                        <div className='flex flex-col w-3/4'>
                            <label htmlFor="email">
                                Email:
                            </label>
                            <input
                                className='bg-gray-100 border border-gray-200 rounded-md text-sm py-2 px-4 w-full'
                                type="text"
                                id="email"
                                onChange={onEmailChanged}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                        </div>
                        <div className='flex flex-col w-3/4'>
                            <label htmlFor="password">
                                Password:
                            </label>
                            <input
                                className='bg-gray-100 border border-gray-200 rounded-md text-sm py-2 px-4 w-full'
                                type="password"
                                id="password"
                                onChange={onPasswordChanged}
                                value={password}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                        </div>
                        <div className='flex flex-col w-3/4'>
                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                            </label>
                            <input
                                className='bg-gray-100 border border-gray-200 rounded-md text-sm py-2 px-4 w-full'
                                type="password"
                                id="confirm_pwd"
                                onChange={onMatchPasswordChanged}
                                value={matchPassword}
                                required
                                aria-invalid={validMatchPassword ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchPasswordFocus(true)}
                                onBlur={() => setMatchPasswordFocus(false)}
                            />
                        </div>
                        <button disabled={!canSave} type='submit' className='bg-gradient-to-br from-brandGreen-500 to-brandBlue-500 text-white font-medium px-8 py-2 rounded-full'>SIGN IN</button>
                    </form>
                </section>
            </>
        )
    }

    return content

}

export default SignupForm