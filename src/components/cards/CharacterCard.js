import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterCard.css';

function CharacterCard({ character, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(character);
    } else {
      navigate(`/character/${character.id}`);
    }
  };

  const formatStatus = (status) => {
    return status === 'unknown' ? 'Unknown' : status;
  };

  return (
    <div 
      className={`card character-card ${onClick ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <div className="character-status">
        <span className={`status-indicator ${character.status.toLowerCase()}`}></span>
        {formatStatus(character.status)}
      </div>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <div className="character-info">
        <p>Species: {character.species}</p>
        <p>Location: {character.location.name}</p>
      </div>
    </div>
  );
}

export default CharacterCard; 