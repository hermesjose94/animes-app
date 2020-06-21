import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Fetch from '../API/Fetch';
import Layout from './Layout.jsx';
import Loading from './PointLoading.jsx';
import PageError from './Error';
import FormAnime from '../components/FormAnime.jsx';
import '../assets/styles/pages/Form.scss';

const CreateAnime = ({ history, token }) => {
  const [state, setState] = useState({
    loading: false,
    errorForm: null,
    error: null,
    form: {
      name: '',
      episode: '',
      date: '',
      station: '',
      cover: '',
      description: '',
      source: '',
      status: '',
      season: '',
      premiere: '',
    },
  });

  useEffect(() => {
    document.body.classList.add('background-form');
    return () => {
      document.body.classList.remove('background-form');
    };
  }, []);

  const handleChange = (e) => {
    var value = e.target.value;
    if (
      e.target.name === 'station' ||
      e.target.name === 'status' ||
      e.target.name === 'premiere' ||
      e.target.name === 'episode' ||
      e.target.name === 'season'
    ) {
      value = Number(e.target.value);
    }

    setState({
      ...state,
      form: {
        ...state.form,
        [e.target.name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setState({ ...state, loading: true });
    let form = state.form;

    // type, endoint, body, initialState
    const [response, error] = await Fetch('POST', `/animes`, form, token);
    setState({ ...state, loading: false, error: error });
    console.log(response, error);
    if (!error) {
      if (response.error) {
        setState({
          ...state,
          loading: false,
          errorForm: response.error,
        });
      } else {
        history.push('/animes');
      }
    } else {
      setState({
        ...state,
        loading: false,
        error: error,
      });
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          setState({
            ...state,
            form: {
              ...state.form,
              cover: e.target.result,
            },
          });
        };
        reader.readAsDataURL(file);
        return file;
      });
    },
    [state]
  );

  if (state.error) {
    return <PageError title="500" error={state.error.message} />;
  }

  if (state.loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="container__form">
        <h1 className="container__form--title">Crear Anime</h1>
        <FormAnime
          onChange={handleChange}
          onSubmit={handleSubmit}
          formValues={state.form}
          onError={state.errorForm}
          onClick={handleChange}
          onDrop={onDrop}
        />
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps, null)(CreateAnime);
