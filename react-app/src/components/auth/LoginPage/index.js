
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import loginImage from '../../img/login-page.jpg'

import './LoginPage.css'

const LoginPage = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([])

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = await dispatch(login(email, password))
        if (data) setErrors(data)
        console.log(data);
    }

    const setDemoCredentials = (e) => {
        e.preventDefault();
        setEmail('demo@aa.io')
        setPassword('password')
    }

    if (user) return <Redirect to='/' />

    return (
        <div id='login-page' className='flx-row-justify-align-ctr'>

            <div id='login-page__left' className='flx-col'>
            </div>

            <div id='login-page__right'>

                <form id='login-form' className='flx-col' onSubmit={handleLogin}>
                    <span id='login-form-header'>Log in to Yuanhood</span>

                    <label className='login-label' htmlFor='email'>Email</label>
                    <input
                    className='login-input'
                    name='email'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    />

                    <label className='login-label' htmlFor='password'>Password</label>
                    <input
                    className='login-input'
                    name='password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    />

                    {!!errors.length &&
                        <div id='login-error-msg' className='flx-row-align-ctr'>
                            <span className="material-symbols-outlined">
                                info
                            </span>
                            <span>
                                Unable to log in with provided credentials.
                            </span>
                        </div>
                    }

                    <div id='login-btns-container' className='flx-row-align-ctr'>
                        <button id='login' type='submit'>
                            Log In
                        </button>

                        <button id='set-demo-credentials' onClick={setDemoCredentials}>
                            Log In as a Demo User
                        </button>

                    </div>


                </form>

                <div id='nav-to-signup'>
                    <span>Not on Yuanhood? </span>
                    <NavLink id='signup-from-login' to='/signup'>Create an account</NavLink>
                </div>

            </div>

        </div>
    )
}

export default LoginPage
