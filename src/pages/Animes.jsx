import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setAnimes,
  setError,
  setLoading,
  setAnimesFilter,
  setQuery,
} from '../actions/index';

import Fetch from '../API/Fetch';
import Layout from './Layout.jsx';
import PageError from './Error';
import Loading from './PointLoading.jsx';
import Search from '../components/Search.jsx';
import GridCards from '../components/GridCards.jsx';
import Card from '../components/Card.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Animes = ({
  loading,
  error,
  animes,
  animesFilter,
  query,
  setLoading,
  setError,
  setAnimes,
  setAnimesFilter,
  setQuery,
}) => {
  const fetchData = async () => {
    // type, endpoint, body
    setLoading(true);
    const [response, error] = await Fetch(
      'GET',
      '/animes?order={"name": 1}',
      null
    );
    if (!error) {
      setAnimes(response.data);
      setAnimesFilter(response.data);
      setLoading(false);
    } else {
      setLoading(false);
      setError(error);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const result = animes.filter((anime) => {
      return anime.name.toLowerCase().includes(query.toLowerCase());
    });
    setAnimesFilter(result);
  }, [query]);

  if (error) {
    return <PageError title="500" error={error.message} />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
      <div className="container-home">
        <Search onChange={handleSearch} />
        {animesFilter.length > 0 ? (
          <GridCards>
            {animesFilter.map((anime) => (
              <Card key={anime._id} {...anime} />
            ))}
          </GridCards>
        ) : (
          <div className="container-noResult">
            <h1>
              Sin resultados <FontAwesomeIcon icon={['fas', 'tired']} />
            </h1>
          </div>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    animes: state.animes,
    animesFilter: state.animesFilter,
    query: state.query,
  };
};

const mapDispatchToProps = {
  setLoading,
  setError,
  setAnimes,
  setAnimesFilter,
  setQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Animes);
