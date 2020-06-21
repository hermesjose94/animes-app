import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAnimesWeek, setError, setLoading } from '../actions/index';
import Fetch from '../API/Fetch';
import Layout from './Layout.jsx';
import PageError from './Error';
import Loading from './PointLoading.jsx';
import BannerAstro from '../components/BannerAstro';
import GridDayWeek from '../components/GridDayWeek.jsx';
import '../assets/styles/pages/Home.scss';

const Home = ({
  history,
  loading,
  error,
  animesWeek,
  setLoading,
  setError,
  setAnimesWeek,
}) => {
  const fetchData = async () => {
    // type, endpoint, body
    setLoading(true);
    const [response, error] = await Fetch(
      'GET',
      '/animes?status=1&week=true&order={"premiere":1,"name": 1}',
      null
    );

    if (!error) {
      setLoading(false);
      setAnimesWeek(response.data);
    } else {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <PageError title="500" error={error.message} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout history={history}>
      <BannerAstro />
      <div className="container-home">
        <React.Fragment>
          <GridDayWeek
            animes={animesWeek}
            follow={false}
            day={1}
            title={'Lunes'}
          />
          <GridDayWeek
            animes={animesWeek}
            follow={false}
            day={2}
            title={'Martes'}
          />
          <GridDayWeek
            animes={animesWeek}
            follow={false}
            day={3}
            title={'Miercoles'}
          />
          <GridDayWeek
            animes={animesWeek}
            follow={false}
            day={4}
            title={'Jueves'}
          />
          <GridDayWeek
            animes={animesWeek}
            follow={false}
            day={5}
            title={'Viernes'}
          />
          <GridDayWeek
            animes={animesWeek}
            follow={false}
            day={6}
            title={'Sabado'}
          />
          <GridDayWeek
            animes={animesWeek}
            follow={false}
            day={7}
            title={'Domingo'}
          />
        </React.Fragment>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    animesWeek: state.animesWeek,
  };
};

const mapDispatchToProps = {
  setLoading,
  setError,
  setAnimesWeek,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
