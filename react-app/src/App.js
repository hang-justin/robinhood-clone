import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserHomePage from './components/UserHomePage';
import AssetPage from './components/AssetPage';
import CryptoList from './components/CryptoList';
import History from './components/History';
import { getAllLatestPrices } from './store/market';
import SplashPage from './components/SplashPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import { getSparklineData } from './store/sparklines';
import PageNotFound from './components/PageNotFound';
import { getGeneralNews } from './store/news';

function App() {
  const [loaded, setLoaded] = useState(false);
  // const [hasLoaded, setHasLoaded] = useState(false)
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllLatestPrices())
      await dispatch(getSparklineData())
      await dispatch(getGeneralNews())
      .then(() => setLoaded(true))
    })();

    // const latestPricesInterval = setInterval(() => dispatch(getAllLatestPrices()), 5000)

    // return () => clearInterval(latestPricesInterval)
  }, [dispatch]);

  // NOTE: THIS DOESN'T APPEAR TO WORK SINCE IT KEEPS GIVING A CACHED RESPONSE
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAllLatestPrices())
      dispatch(getSparklineData())

      // if (!hasLoaded) {
      //   setTimeout(()=> {
      //     setHasLoaded(true)
      //   }, 2000)
      // }

    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user && <NavBar />}

      <Switch>

        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>

        <Route path='/signup' exact={true}>
          <SignupPage />
        </Route>

        <Route path='/us/en' exact={true}>
          <SplashPage />
        </Route>

        <ProtectedRoute path='/' exact={true}>
          <UserHomePage />
        </ProtectedRoute>

        <ProtectedRoute path='/lists/:userId/:listId' exact={true}>
          <CryptoList />
        </ProtectedRoute>

        <ProtectedRoute path='/crypto/:symbol' exact={true}>
          <AssetPage />
        </ProtectedRoute>

        <ProtectedRoute path='/account/history' exact={true}>
          <History />
        </ProtectedRoute>

        <Route path='*'>
          <PageNotFound />
        </Route>

      </Switch>

    </BrowserRouter>
  );
}

export default App;
