import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAnime, setError, setLoading } from '../actions/index';
import { Link } from 'react-router-dom';
import Fetch from '../API/Fetch';
import Layout from './Layout.jsx';
import DeleteAnimeModal from '../components/DeleteAnimeModal.jsx';
import UpEpisodeModal from '../components/UpEpisodeModal.jsx';
import PageError from './Error.jsx';
import Loading from './PointLoading.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/styles/pages/DetailAnime.scss';

const DetailAnime = ({
  match,
  history,
  loading,
  error,
  token,
  anime,
  user,
  isAuthenticated,
  setLoading,
  setError,
  setAnime,
}) => {
  let hasAdmin = false;
  if (isAuthenticated) {
    if (user.isAdmin) {
      hasAdmin = true;
    }
  }

  const day = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miercoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sabado',
    7: 'Domigo',
  };

  const Status = {
    1: 'Online',
    2: 'Detenido',
    3: 'Finalizado',
  };

  const Station = {
    1: 'Primavera',
    2: 'Verano',
    3: 'Otoño',
    4: 'Invierno',
  };

  // const [state, setState] = useState({
  //   modalIsOpenD: false,
  //   modalIsOpenUp: false,
  //   follow: {
  //     status: false,
  //     episode: 1,
  //   },
  // });

  const fetchData = async () => {
    // type, endpoint, body, token, auth
    setLoading(true);
    let response;
    let error;
    if (user) {
      [response, error] = await Fetch(
        'GET',
        `/user-animes/${user.id}/${match.params.animeId}`,
        null,
        token
      );
    } else {
      [response, error] = await Fetch(
        'GET',
        `/animes/${match.params.animeId}`,
        null
      );
    }

    if (!error) {
      const icon =
        response.data.status === 1
          ? 'calendar-alt'
          : response.data.status === 2
          ? 'calendar-times'
          : 'calendar-check';
      const classStatus =
        response.data.status === 1
          ? 'success'
          : response.data.status === 2
          ? 'danger'
          : 'primary';

      setAnime({
        ...response.data,
        icon: icon,
        classStatus: classStatus,
        modalIsOpenD: false,
        modalIsOpenUp: false,
      });
      setLoading(false);
    } else {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseModalD = () => {
    setAnime({
      ...anime,
      modalIsOpenD: false,
    });
  };

  const handleOpenModalD = () => {
    setAnime({
      ...anime,
      modalIsOpenD: true,
    });
  };

  const handleCloseModalUp = () => {
    console.log('Modal Up false');

    setAnime({
      ...anime,
      modalIsOpenUp: false,
    });
  };

  const handleOpenModalUp = () => {
    console.log('Modal Up true');

    setAnime({
      ...anime,
      modalIsOpenUp: true,
    });
  };

  const handleDeleteAnime = async () => {
    setLoading(true);
    // type, endpoint, body
    const [response, error] = await Fetch(
      'DELETE',
      `/animes/${match.params.animeId}`,
      null,
      token
    );
    if (!error) {
      history.push('/animes');
      setLoading(false);
    } else {
      setError(error);
      setLoading(false);
    }
  };

  const handleAddAnime = async () => {
    setLoading(true);
    const [response, error] = await Fetch(
      'POST',
      `/user-animes`,
      { userId: user.id, animeId: match.params.animeId },
      token
    );
    if (!error) {
      setAnime({
        ...anime,
        id_follow: response.data,
        episode_follow: 1,
      });
      setLoading(false);
    } else {
      setError(error);
      setLoading(false);
    }
  };

  const handleRemoveAnime = async () => {
    setLoading(true);
    const [response, error] = await Fetch(
      'DELETE',
      `/user-animes/${anime.id_follow}`,
      null,
      token
    );
    console.log(response, error);

    if (!error) {
      setAnime({
        ...anime,
        id_follow: null,
        episode_follow: null,
      });
      setLoading(false);
    } else {
      setError(error);
      setLoading(false);
    }
  };

  const handleUpEpisodeAnime = async () => {
    const episodeFollow =
      anime.episode_follow +
      parseInt(document.getElementById('modalEpisode').value);

    const [response, error] = await Fetch(
      'PUT',
      `/user-animes/${anime.id_follow}`,
      {
        episode: episodeFollow,
      },
      token
    );
    if (!error) {
      setAnime({
        ...anime,
        episode_follow: episodeFollow,
        modalIsOpenUp: false,
      });
    } else {
      setError(error);
      setLoading(false);
    }
  };

  const handleDownEpisodeAnime = async () => {
    let episodeFollow =
      anime.episode_follow -
      parseInt(document.getElementById('modalEpisode').value);

    if (episodeFollow < 0) {
      episodeFollow = 1;
    }

    const json = {
      episode: episodeFollow,
    };

    const [response, error] = await Fetch(
      'PUT',
      `/user-animes/${anime.id_follow}`,
      {
        episode: episodeFollow,
      },
      token
    );

    if (!error) {
      setAnime({
        ...anime,
        episode_follow: episodeFollow,
        modalIsOpenUp: false,
      });
    } else {
      setError(error);
      setLoading(false);
    }
  };

  if (error) {
    return <PageError title="500" error={error.message} />;
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
      <div className="contentCard">
        <div className="card">
          <div className="banner">
            <img src={anime.cover} alt="cover" className="cover" />
          </div>
          <div className="menu">
            <div className="opener">
              {user && (
                <React.Fragment>
                  <button
                    onClick={handleRemoveAnime}
                    title="Sacar de mi lista"
                    className={`follow ${
                      anime.id_follow != null ? 'active' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={['fas', 'heart']} />
                  </button>
                  <button
                    onClick={handleAddAnime}
                    title="Agregar a mi lista"
                    className={`no-follow ${
                      anime.id_follow == null ? 'active' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={['far', 'heart']} />
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
          <h2 className="name">{anime.name}</h2>
          <div className="title">{`${anime.date} - ${
            Station[anime.station]
          }`}</div>
          <div className="actions">
            <div className="follow-info">
              <h2>
                <div>
                  <span>{anime.season}</span>
                  <small>Temporada</small>
                </div>
              </h2>
              <h2>
                {anime.id_follow != null ? (
                  <button
                    onClick={handleOpenModalUp}
                    className="upEpisode"
                    title="Click para subir el episodio"
                  >
                    <span>{`${anime.episode_follow} / ${anime.episode}`}</span>
                    <small>Episodio</small>
                  </button>
                ) : (
                  <div>
                    <span>{anime.episode}</span>
                    <small>Episodio</small>
                  </div>
                )}
              </h2>
            </div>
            <a
              title="Ir a ver"
              className={`status-btn btn-lg btn btn-${anime.classStatus} btn-block`}
              href={anime.source}
              target="_blank"
            >
              <span>
                <FontAwesomeIcon icon={['fas', anime.icon || 'calendar-alt']} />{' '}
                {Status[anime.status]}
              </span>
              {anime.status === 1 && <span>{day[anime.premiere]}</span>}
            </a>
          </div>
          <div className="desc">{anime.description}</div>
          {hasAdmin && (
            <div className="actions">
              <div className="follow-btn footer">
                <div>
                  <Link
                    to={`/anime/edit/${anime._id}`}
                    className="btn btn-info btn-block"
                  >
                    Editar
                  </Link>
                </div>
                <div>
                  <button
                    onClick={handleOpenModalD}
                    className="btn btn-danger btn-block"
                  >
                    Borrar
                  </button>
                </div>
              </div>
              <DeleteAnimeModal
                isOpen={anime.modalIsOpenD}
                onClose={handleCloseModalD}
                onClick={handleDeleteAnime}
              />
            </div>
          )}
          <UpEpisodeModal
            isOpen={anime.modalIsOpenUp}
            onClose={handleCloseModalUp}
            onClickUp={handleUpEpisodeAnime}
            onClickDown={handleDownEpisodeAnime}
          />
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    anime: state.anime,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    token: state.token,
  };
};

const mapDispatchToProps = {
  setLoading,
  setError,
  setAnime,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailAnime);

// export default DetailAnime;
