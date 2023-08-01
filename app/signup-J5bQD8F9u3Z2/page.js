"use client"
//signup-J5bQD8F9u3Z2

import { useRef, useState, useEffect } from "react"
import { useRegisterMutation } from "@components/features/auth/authApiSlice"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { SCHOOLS } from '@config/schools'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ProctorSignup = () => {
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

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatchPassword, setValidMatchPassword] = useState(false)
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false)

    const [registrationPasscode, setRegistrationPasscode] = useState('')

    const [errMsg, setErrMsg] = useState('')

    const roles = ["Proctor"]

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

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onMatchPasswordChanged = e => setMatchPassword(e.target.value)
    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onLastnameChanged = e => setLastname(e.target.value)
    const onSchoolChanged = e => setSchool(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onRegistrationPasscodeChanged = e => setRegistrationPasscode(e.target.value)

    const canSave = [roles.length, validUsername, validPassword, validMatchPassword, validFirstname, validLastname, validSchool, validEmail].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (registrationPasscode !== process.env.REACT_APP_PROCTOR_PASSKEY) {
            errRef.current.focus();
            setErrMsg("Invalid registration passcode. Please contact the OCMC Executive Team at placeholder@gmail.com to recieve a passkey.");
            return;
        }
        if (canSave) {
            await register({
                username: username,
                password: password,
                roles: roles,
                first_name: firstname,
                last_name: lastname,
                school: school,
                email: email,
                grade: -1
            })
        }
    }

    if (isError) {
        window.scrollTo(0, 0);
        if (error.status === 409) {
            setErrMsg("Username already exists. Please choose another.");
        } else {
            setErrMsg("An error occurred. Please try again.");
        }
    }

    let content;
    if (isSuccess) {
        content = (
            <section>
                <h1>Proctor {username} successfully registered!</h1>
                <br/>
                <p>
                    Click <Link href="/login">here</Link> to log in.
                </p>
            </section>
        )
    } else {
        content = (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Proctor Registration</h1>
                <form onSubmit={onSaveUserClicked}>
                    <label htmlFor="username">
                        Username:
                        <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                    </label>
                    <input
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
                        onChange={onFirstnameChanged}
                        value={firstname}
                        required
                        aria-invalid={validFirstname ? "false" : "true"}
                        aria-describedby="firstnote"
                        onFocus={() => setFirstnameFocus(true)}
                        onBlur={() => setFirstnameFocus(false)}
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
                        onChange={onLastnameChanged}
                        value={lastname}
                        required
                        aria-invalid={validLastname ? "false" : "true"}
                        aria-describedby="lastnote"
                        onFocus={() => setLastnameFocus(true)}
                        onBlur={() => setLastnameFocus(false)}
                    />
                    <p id="lastnote" className={lastnameFocus && !validLastname ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        You must enter a last name.
                    </p>

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

                    <label htmlFor="email">
                        Email:
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                    </label>
                    <input
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
                    <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must be a valid email address.
                    </p>

                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                    </label>
                    <input
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
                    <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>


                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatchPassword && matchPassword ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatchPassword || !matchPassword ? "hide" : "invalid"} />
                    </label>
                    <input
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
                    <p id="confirmnote" className={matchPasswordFocus && !validMatchPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <label htmlFor="registration_passcode" style={{'color': 'lightblue'}}>
                        Proctor Registration Passcode:
                    </label>
                    <input
                        type="password"
                        id="registration_passcode"
                        onChange={onRegistrationPasscodeChanged}
                        value={registrationPasscode}
                        required
                        aria-describedby="passcodenote"
                    />

                    <button disabled={!canSave}>Sign Up</button>
                </form>
                <p>
                    Already registered?<br />
                    <span className="line">
                        <Link href="/login">Log In</Link>
                    </span>
                </p>
            </section>
        )
    }

    return (
        <div className="Signup">
            {content}
        </div>
    )
}

export default ProctorSignup