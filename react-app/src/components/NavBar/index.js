
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './NavBar.css'

const NavBar = () => {
  const location = useLocation().pathname;
  const [textColor, setTextColor] = useState(location !== '/us/en' ? 'white-text' : 'black-text');
  const [bgColor, setBgColor] = useState(location === '/us/en' ? 'white-bg' : 'transparent-bg')

  return (
    <nav id='main-nav'>
      <ul id='main-nav__ul' className='flx-row-justify-ctr'>

        <li className='navbar-li'>
          <NavLink to='/' exact={true} activeClassName='active' className={`${textColor} navbar-link`}>
            Home
          </NavLink>
        </li>

        <li className='navbar-li'>
          <NavLink to='/login' exact={true} activeClassName='active' className={`${textColor} navbar-link`}>
            Login
          </NavLink>
        </li>

        <li className='navbar-li'>
          <NavLink to='/sign-up' exact={true} activeClassName='active' className={`${textColor} navbar-link`}>
            Sign Up
          </NavLink>
        </li>

        <li className='navbar-li'>
          <NavLink to='/users' exact={true} activeClassName='active' className={`${textColor} navbar-link`}>
            Users
          </NavLink>
        </li>

        <li className='navbar-li'>
          <LogoutButton />
        </li>

      </ul>
    </nav>
  );
}

export default NavBar;
