import { useHistory } from 'react-router-dom';
import './GuestNavBar.css';

import logo from '../../img/logo.png'
import logoInverted from '../../img/logo-inverted.png'
import github from '../../img/github.png'
import linkedin from '../../img/linkedin.png'


const GuestNavBar = () => {
    const history = useHistory();

    return (
        <header id='guest-navbar' className='flx-row-align-ctr justify-space-btw'>
            <div id='guest-navbar__left' className='flx-row-justify-align-ctr'>
                <div id='navbar-app-name'>
                    Yuanhood
                </div>

                <div id='splash-logo-container' className='flx-row-align-ctr justify-space-btw'>
                    <img id='splash-logo' src={logo} alt='yuanhood-logo'/>
                </div>

                <div id='social-links' className='flx-row-justify-align-ctr'>
                    <a className='link-to-social flx-row-align-ctr' href='https://github.com/hang-justin'>
                        <img id='github-logo' className='social-logo-img' src={github} alt='github-logo-link'/>
                    </a>

                    <a className='link-to-social flx-row-align-ctr' href='https://www.linkedin.com/in/hang-justin/'>
                        <img id='linkedin-logo' className='social-logo-img' src={linkedin} alt='linkedin-logo-link'/>
                    </a>

                </div>

            </div>

            <div id='guest-session-btn-container' className='flx-row-justify-align-ctr'>
                <button id='splash-nav-login' onClick={() => history.push('/login')}>
                    Log In
                </button>

                <button id='splash-nav-signup' onClick={()=> history.push('/signup')}>
                    Sign Up
                </button>
            </div>
        </header>
    )
}

export default GuestNavBar
