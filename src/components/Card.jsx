import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../assets/styles/components/Card.scss';

const Card = ({
  _id: id,
  name,
  episode,
  episode_follow,
  date,
  station,
  cover,
  status,
  season,
  source,
  follow,
}) => {
  const icon =
    status === 1
      ? 'calendar-alt'
      : status === 2
      ? 'calendar-times'
      : 'calendar-check';

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

  return (
    <div className="news-card">
      <Link to={`/anime/detail/${id}`} className="news-card__card-link"></Link>
      <img src={cover} alt={`${name}-${id}`} className="news-card__image" />
      <div className="news-card__text-wrapper">
        <div className="news-card__title">
          <h2>{name}</h2>
        </div>

        <div className="news-card__post-dates">
          <div className="news-card__post-dates--content">
            {follow ? (
              <div className="icon">
                <FontAwesomeIcon icon={['fas', 'list-ol']} />{' '}
                {`${episode_follow} / ${episode}`}
              </div>
            ) : (
              <div className="icon">
                <FontAwesomeIcon icon={['fas', 'list-ol']} /> {episode}
              </div>
            )}

            <div className="icon">
              <FontAwesomeIcon icon={['fas', icon]} /> {Status[status]}
            </div>
          </div>
        </div>
        <div className="news-card__details-wrapper">
          <div className="news-card__details-wrapper--grid">
            <div className="news-card__excerpt">Temporada {season}</div>
            <div className="news-card__excerpt">{date}</div>
            <div className="news-card__excerpt">{Station[station]}</div>
          </div>
          <a href={source} target="_blank" className="news-card__read-more">
            Ver Anime
            <FontAwesomeIcon icon={['fas', 'chevron-right']} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
