import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import TestCoinGecko from './components/TestCoinGecko';
import UserHomePage from './components/UserHomePage';
import AssetPage from './components/AssetPage';
import CryptoList from './components/CryptoList';
import { getAllLatestPrices } from './store/market';

function App() {
  const [loaded, setLoaded] = useState(false);
  // const [hasLoaded, setHasLoaded] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllLatestPrices())
      setLoaded(true);
    })();

    // const latestPricesInterval = setInterval(() => dispatch(getAllLatestPrices()), 5000)

    // return () => clearInterval(latestPricesInterval)
  }, [dispatch]);

  // NOTE: THIS DOESN'T APPEAR TO WORK SINCE IT KEEPS GIVING A CACHED RESPONSE
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(getAllLatestPrices())

  //     if (!hasLoaded) {
  //       setTimeout(()=> {
  //         setHasLoaded(true)
  //       }, 2000)
  //     }

  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />

      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <ProtectedRoute path='/' exact={true} >
          <UserHomePage />
        </ProtectedRoute>

        <ProtectedRoute path='/lists/:userId/:listId' exact={true} >
          <CryptoList />
        </ProtectedRoute>

        <ProtectedRoute path='/crypto/:symbol' exact={true} >
          <AssetPage />
        </ProtectedRoute>

        <Route path='/testcg'>
          <TestCoinGecko />
        </Route>

      </Switch>

    </BrowserRouter>
  );
}

export default App;
