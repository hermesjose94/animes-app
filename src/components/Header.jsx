import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import Fetch from '../API/Fetch';
import moment from 'moment';
import {
  setUser,
  setIsAuthenticated,
  setToken,
  setExpitedAt,
  setLoading,
  setError,
} from '../actions/index';
import '../assets/styles/components/Header.scss';

const Header = ({
  history,
  user,
  expiredAt,
  token,
  isAuthenticated,
  setUser,
  setIsAuthenticated,
  setToken,
  setExpitedAt,
  setError,
}) => {
  let hasAdmin = false;

  if (isAuthenticated) {
    if (user.isAdmin) {
      hasAdmin = true;
    }
  }

  const handleClickMenu = (e) => {
    var nav = document.getElementById('menu-nav');
    var active = nav.className;

    if (active === 'active') {
      nav.classList.remove('active');
    } else {
      nav.classList.add('active');
    }
  };

  const handleClickPerfil = (e) => {
    var nav = document.getElementById('perfil-nav');
    var active = nav.className;

    if (active === 'active') {
      nav.classList.remove('active');
    } else {
      nav.classList.add('active');
    }
  };

  const verifyToken = async () => {
    setLoading(true);
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
      setLoading(false);
    } else {
      setToken(response.token);
      setExpitedAt(response.expiredAt);
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    const [response, error] = await Fetch(
      'POST',
      `/auth/logout`,
      null,
      null,
      null
    );
    if (error) {
      setError(error);
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    } else {
      setToken(null);
      setExpitedAt(null);
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      history.push('/');
    }
  };

  useEffect(() => {
    const verifyTokenTimer = setTimeout(() => {
      verifyToken();
    }, moment(expiredAt).diff() - 10 * 1000);
    return () => {
      clearTimeout(verifyTokenTimer);
    };
  }, [expiredAt, token]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div onClick={handleClickMenu} className="menu-toggle">
        <FontAwesomeIcon icon={['fas', 'bars']} />
      </div>
      <div className="logo">ANIME</div>
      {isAuthenticated && (
        <React.Fragment>
          <div onClick={handleClickPerfil} className="perfil-toggle">
            <FontAwesomeIcon icon={['fas', 'user-circle']} />
          </div>
          <nav id="perfil-nav">
            <ul>
              <li className="perfl">
                <FontAwesomeIcon icon={['fas', 'user-astronaut']} />
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>
              </li>
              <li>
                <NavLink id="home" exact to="/profile" activeClassName="active">
                  <FontAwesomeIcon icon={['fas', 'user']} />
                  Perfil
                </NavLink>
              </li>
              <li>
                <button id="logout" onClick={handleLogout}>
                  <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
                  Cerrar Sesion
                </button>
              </li>
            </ul>
          </nav>
        </React.Fragment>
      )}

      <nav id="menu-nav">
        <ul>
          <li>
            <NavLink id="home" exact to="/" activeClassName="active">
              <FontAwesomeIcon icon={['fas', 'home']} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink id="animesAll" exact to="/animes" activeClassName="active">
              <FontAwesomeIcon icon={['fas', 'video']} />
              Todos
            </NavLink>
          </li>
          {isAuthenticated ? (
            <React.Fragment>
              <li>
                <NavLink
                  id="follows"
                  exact
                  to="/animes/follows"
                  activeClassName="active"
                >
                  <FontAwesomeIcon icon={['fas', 'heart']} />
                  Mi Lista
                </NavLink>
              </li>
              {hasAdmin && (
                <li>
                  <NavLink
                    id="create"
                    exact
                    to="/anime/create"
                    activeClassName="active"
                  >
                    <FontAwesomeIcon icon={['fas', 'plus']} />
                    Crear
                  </NavLink>
                </li>
              )}
            </React.Fragment>
          ) : (
            <li>
              <NavLink id="login" to="/login" activeClassName="active">
                <FontAwesomeIcon icon={['fas', 'sign-in-alt']} /> Iniciar
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    expiredAt: state.expiredAt,
    token: state.token,
  };
};

const mapDispatchToProps = {
  setUser,
  setIsAuthenticated,
  setToken,
  setExpitedAt,
  setLoading,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
