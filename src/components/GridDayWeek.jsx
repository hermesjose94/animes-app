import React from 'react';
import GridCards from './GridCards.jsx';
import Card from './Card.jsx';

const GridDayWeek = ({ animes, day, follow, title }) => (
  <React.Fragment>
    {animes[day] && (
      <React.Fragment>
        <h1>{title}</h1>
        <GridCards>
          {animes[day].map((item) => (
            <Card key={item._id} {...item} follow={follow} />
          ))}
        </GridCards>
      </React.Fragment>
    )}
  </React.Fragment>
);

export default GridDayWeek;
