import React from 'react';

function ResidentsList({ residents, locationName }) {
  if (!residents.length) return null;

  return (
    <div className="residents-section">
      <h2>Residents of {locationName}</h2>
      <div className="card-container">
        {residents.map((resident) => (
          <div key={resident.id} className="card">
            <img src={resident.image} alt={resident.name} />
            <h3>{resident.name}</h3>
            <p>Status: {resident.status}</p>
            <p>Species: {resident.species}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResidentsList; 