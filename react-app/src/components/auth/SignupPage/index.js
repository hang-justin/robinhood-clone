import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { signUp } from '../../../store/session';

import './SignupPage.css'

const SignupPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('')


    useEffect(() => {
        if (!firstNameError) return;
        else setFirstNameError('')
    }, [firstName])

    useEffect(() => {
        if (!lastNameError) return;
        else setLastNameError('')
    }, [lastName])

    useEffect(() => {
        if (!emailError) return;
        else setEmailError('')
    }, [email])

    useEffect(() => {
        if (!passwordError) return;
        else setPasswordError('')
    }, [password])

    useEffect(() => {
        if (!confirmPasswordError) return;
        else setConfirmPasswordError('')
    }, [confirmPassword])


    const handleSignup = async (e) => {
        e.preventDefault();
        let validationErrors = [];

        if (firstName.trim().length === 0) {
            validationErrors.push('Please enter your first name.')
            setFirstNameError('Please enter your first name')
        }

        if (firstName.length > 50) {
            validationErrors.push('Please enter a first name less than 50 characters.')
            setFirstNameError('Please enter a first name less than 50 characters.')
        }

        if (lastName.trim().length === 0) {
            validationErrors.push('Please enter your last name.')
            setLastNameError('Please enter your last name.')
        }

        if (lastName.length > 50) {
            validationErrors.push('Please enter a last name less than 50 characters.')
            setLastNameError('Please enter a last name less than 50 characters.')
        }

        if (email.length > 255) {
            validationErrors.push('Please enter a valid email that is at most 255 characters.')
            setEmailError('Please enter a valid email that is at most 255 characters.')
        }

        if (password.length < 6) {
            validationErrors.push('Password must be at least 6 characters.')
            setPasswordError('Password must be at least 6 chracters.')
        }

        if (password.length > 255) {
            validationErrors.push('Password must be at most 255 characters.')
            setPasswordError('Password must be at most 255 chracters.')
        }

        if (password !== confirmPassword) {
            validationErrors.push('Passwords do not match.')
            setConfirmPasswordError('Passwords do not match.')
        }

        setErrors(validationErrors);

        if (validationErrors.length) return;

        const data = await dispatch(signUp(firstName, lastName, email, password))
        if (data) {
            console.log(data)
            if (data.find(err => err === 'email : Email address is already in use.')) {
                setEmailError('Email address is already in use. Please try another.')
            };
            return;
        }

        history.push('/')
    }

    return (
        <div id='signup-page' className='flx-row-justify-align-ctr'>

            <div id='signup-page__left' className='flx-col'>
                <div id='signup__top-left' className='flx-col'>
                    <span id='signup-top-left-text' className='font-size-60'>
                        Invest with zero commission fees
                    </span>
                </div>

                <div id='signup__bottom-left'>

                </div>
            </div>

            <div id='signup-page__right'>
                <form id='signup-form' className='flx-col' onSubmit={handleSignup}>
                    <span className='font-size-30'>Enter your first and last name as they appear on your government ID.</span>

                    <input
                    className={`signup-input ${firstNameError ? 'red-border' : ''}`}
                    name='firstName'
                    type='text'
                    onChange={(e) => setFirstName(e.target.value.trim())}
                    value={firstName}
                    placeholder='First name'
                    required
                    />

                    {firstNameError && (
                        <span className='input-error-message'>
                            {firstNameError}
                        </span>
                    )}

                    <input
                    className={`signup-input ${lastNameError ? 'red-border' : ''}`}
                    name='lastName'
                    type='text'
                    onChange={(e) => setLastName(e.target.value.trim())}
                    value={lastName}
                    placeholder='Last Name'
                    required
                    />

                    {lastNameError && (
                        <span className='input-error-message'>
                            {lastNameError}
                        </span>
                    )}


                    <input
                    className={`signup-input ${emailError ? 'red-border' : ''}`}
                    name='email'
                    type='email'
                    onChange={(e) => setEmail(e.target.value.trim())}
                    value={email}
                    placeholder='Email address'
                    required
                    />
                    {emailError && (
                        <span className='input-error-message'>
                            {emailError}
                        </span>
                    )}

                    <input
                    className={`signup-input ${passwordError ? 'red-border' : ''}`}
                    name='password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder='Password (min. 6 characters)'
                    required
                    />

                    {passwordError && (
                        <span className='input-error-message'>
                            {passwordError}
                        </span>
                    )}

                    <input
                    className={`signup-input ${confirmPasswordError ? 'red-border' : ''}`}
                    name='confirmPassword'
                    type='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder='Confirm your password'
                    required
                    />

                    {confirmPasswordError && (
                        <span className='input-error-message'>
                            {confirmPasswordError}
                        </span>
                    )}

                    {errors.map( (error, ind) => (
                        <div key={ind}>
                            {error}
                        </div>
                    ))}

                    <button
                    id='create-account-btn'
                    type='submit'
                    >
                        Create Account
                    </button>

                </form>

                <div id='nav-to-login'>
                    <span>Already have an account? </span>
                    <NavLink id='login-from-signup' to='/login'>Log in</NavLink>
                </div>

            </div>

        </div>
    )
}

export default SignupPage
