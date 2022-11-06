
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './NavBar.css'

const NavBar = () => {

  return (
    <nav id='main-nav' className='flx-row-justify-align-ctr'>
      <ul id='main-nav__ul' className='flx-row-align-ctr justify-space-btw'>

        <li className='navbar-li'>
          <NavLink to='/' exact={true} activeClassName='active' className={`white-text navbar-link`}>
            Home
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
