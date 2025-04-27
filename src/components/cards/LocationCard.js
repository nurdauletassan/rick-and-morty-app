import React from 'react';
import './LocationCard.css';

function LocationCard({ location, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(location);
    }
  };

  return (
    <div 
      className={`location-card ${onClick ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <h3>{location.name}</h3>
      <div className="location-details">
        <p>Type: {location.type}</p>
        <p>Dimension: {location.dimension}</p>
        <p>Residents: {location.residents.length}</p>
      </div>
    </div>
  );
}

export default LocationCard; 