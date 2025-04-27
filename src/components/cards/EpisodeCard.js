import React from 'react';
import './EpisodeCard.css';

const EpisodeCard = ({ episode, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(episode);
    }
  };

  return (
    <div 
      className={`episode-card ${onClick ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <h3>{episode.name}</h3>
      <div className="episode-details">
        <p>Episode: {episode.episode}</p>
        <p>Air Date: {episode.air_date}</p>
      </div>
    </div>
  );
};

export default EpisodeCard; 