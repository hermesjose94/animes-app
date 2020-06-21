import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  loginRequest,
  setError,
  setLoading,
  setToken,
  setExpitedAt,
  setUser,
  setIsAuthenticated,
} from '../actions/index';
import Fetch from '../API/Fetch';
import Layout from './Layout.jsx';
import Loading from './PointLoading.jsx';
import PageError from './Error';
import '../assets/styles/pages/Form.scss';

const Login = ({
  history,
  setLoading,
  setError,
  setToken,
  setExpitedAt,
  setUser,
  setIsAuthenticated,
}) => {
  const [state, setState] = useState({
    errorForm: null,
    username: '',
    password: '',
  });

  useEffect(() => {
    document.body.classList.add('background-form');
    return () => {
      document.body.classList.remove('background-form');
    };
  }, []);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // handle button click of login form
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = {
      username: state.username,
      password: state.password,
    };
    const [response, error] = await Fetch(
      'GET',
      `/auth/sign-in`,
      null,
      null,
      auth
    );

    if (error) {
      if (error.statusCode) {
        setLoading(false);
        setState({ ...state, errorForm: error.message });
      } else {
        setLoading(false);
        setError(error);
      }
    } else {
      // loginRequest(response.user);
      setLoading(false);
      setToken(response.token);
      setUser(response.user);
      setExpitedAt(response.expiredAt);
      setIsAuthenticated(true);
      history.push('/');
    }
  };

  if (state.error) {
    return <PageError title="500" error={state.error.message} />;
  }

  if (state.loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="container__form">
        <h1 className="container__form--title">Iniciar Sesion</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Constraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
            />
          </div>
          {state.errorForm && (
            <div className="col-md-12">
              <div className="form-group">
                <div className="alert alert-danger">
                  <p>{state.errorForm}</p>
                </div>
              </div>
            </div>
          )}
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Iniciar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = {
  setLoading,
  setError,
  loginRequest,
  setToken,
  setExpitedAt,
  setUser,
  setIsAuthenticated,
};

export default connect(null, mapDispatchToProps)(Login);
