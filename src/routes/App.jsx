//Librerias instaladas
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//Librerias propias
import Fetch from '../API/Fetch';
import {
  setError,
  setLoadingAuth,
  setToken,
  setUser,
  setExpitedAt,
  setIsAuthenticated,
} from '../actions/index';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home';
import Animes from '../pages/Animes';
import Follows from '../pages/Follows.jsx';
import DetailAnime from '../pages/DetailAnime.jsx';
import CreateAnime from '../pages/CreateAnime';
import UpdatedAnime from '../pages/UpdatedAnime';
import Loading from '../pages/PointLoading.jsx';
import NotFound from '../pages/Error.jsx';

const App = ({
  isAuthenticated,
  loadingAuth,
  setLoadingAuth,
  setError,
  setToken,
  setUser,
  setExpitedAt,
  setIsAuthenticated,
}) => {
  const fetchData = async () => {
    setLoadingAuth(true);
    const [response, error] = await Fetch(
      'POST',
      `/auth/verifyToken`,
      null,
      null,
      null
    );
    if (error) {
      setError(error);
      setUser(null);
      setIsAuthenticated(false);
      setLoadingAuth(false);
    } else {
      setToken(response.token);
      setExpitedAt(response.expiredAt);
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loadingAuth) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <PublicRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/login"
          component={Login}
        />
        <Route exact path="/animes" component={Animes} />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/animes/follows"
          component={Follows}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/anime/create"
          component={CreateAnime}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/anime/edit/:animeId"
          component={UpdatedAnime}
        />
        <Route exact path="/anime/detail/:animeId" component={DetailAnime} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    // error: state.error,
    isAuthenticated: state.isAuthenticated,
    loadingAuth: state.loadingAuth,
  };
};

const mapDispatchToProps = {
  setLoadingAuth,
  setError,
  setToken,
  setUser,
  setExpitedAt,
  setIsAuthenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
