
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import logo from '../img/logo.png'

import './NavBar.css'
import SearchBar from './SearchBar';

const NavBar = () => {
  // NavBar is only rendered for logged in users

  return (
    <nav id='main-nav' className='flx-row-justify-align-ctr'>
      <ul id='main-nav__ul' className='flx-row-align-ctr justify-space-btw'>

        <li className='navbar-li'>
          <NavLink to='/' exact={true} activeClassName='active' className={`white-text navbar-link`}>
            <img id='nav-home-logo' alt='logo-nav-home' src={logo} />
          </NavLink>
        </li>

        <SearchBar />

        <li className='navbar-li'>
          <LogoutButton />
        </li>

      </ul>
    </nav>
  );
}

export default NavBar;
