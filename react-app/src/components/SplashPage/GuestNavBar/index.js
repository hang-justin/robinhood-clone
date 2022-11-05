import { useHistory } from 'react-router-dom';
import './GuestNavBar.css';

const GuestNavBar = () => {
    const history = useHistory();

    return (
        <header id='guest-navbar' className='flx-row-align-ctr justify-space-btw'>
            <div id='guest-navbar__left' className='flx-row-justify-align-ctr'>
                <div>
                    Logo
                </div>

                <div>
                    Links
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
