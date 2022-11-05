import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './SignupPage.css'

const SignupPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const handleSignup = (e) => {
        e.preventDefault();
        alert('hang on!')
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
                    className='signup-input'
                    name='firstName'
                    type='text'
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder='First name'
                    required
                    />

                    <input
                    className='signup-input'
                    name='lastName'
                    type='text'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder='Last Name'
                    required
                    />

                    <input
                    className='signup-input'
                    name='email'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Email address'
                    required
                    />

                    <input
                    className='signup-input'
                    name='password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder='Password (min. 6 characters)'
                    required
                    />

                    <input
                    className='signup-input'
                    name='confirmPassword'
                    type='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder='Confirm your password'
                    required
                    />

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
