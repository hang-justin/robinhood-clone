
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import cartman from '../img/imgoinghome.png'

import './PageNotFound.css';

const PageNotFound = () => {
    const user = useSelector(state => state.session.user)

    return (
        <div id={user ? 'page-not-found-user' : 'page-not-found'} className='flx-col-justify-align-ctr'>

            <h1 className='page-not-found-header'>
                Page not found! :()
            </h1>

            <div id='going-home' className='flx-row-justify-align-ctr'>
                <img id='cartman-left' className='cartman' src={cartman} alt='cartman-left' />
                    <NavLink className='page-not-found-nav' to='/'>
                        Click here to go home
                    </NavLink>
                <img id='cartman-right' className='cartman' src={cartman} alt='cartman-right' />
            </div>

        </div>
    )
}

export default PageNotFound
