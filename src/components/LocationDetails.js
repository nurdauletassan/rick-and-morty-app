import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SkeletonCard from './skeletons/SkeletonCard';
import CharacterCard from './cards/CharacterCard';
import './DetailsPage.css';

function LocationDetails() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        setLoading(true);
        const locationResponse = await axios.get(
          `https://rickandmortyapi.com/api/location/${id}`
        );
        await new Promise((resolve) => setTimeout(resolve, 300));
        setLocation(locationResponse.data);
        
        // Fetch residents
        if (locationResponse.data.residents.length > 0) {
          const residentPromises = locationResponse.data.residents.map(url =>
            axios.get(url)
          );
          const responses = await Promise.all(residentPromises);
          setResidents(responses.map(response => response.data));
        }
        
        setError(null);
      } catch (err) {
        setError('Location not found');
        setLocation(null);
        setResidents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationDetails();
  }, [id]);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="details-page">
      <Link to="/locations" className="back-button">
        ← Back to Locations
      </Link>
      
      {loading ? (
        <div className="details-loading">
          <div className="skeleton-details">
            <div className="skeleton-name"></div>
            <div className="skeleton-info">
              <div className="skeleton-info-item"></div>
              <div className="skeleton-info-item"></div>
              <div className="skeleton-info-item"></div>
            </div>
          </div>
          <h2>Residents</h2>
          <div className="card-container">
            {Array(6).fill(null).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="details-header">
            <h1>{location.name}</h1>
            <div className="details-info">
              <div className="info-item">
                <span className="info-label">Type:</span>
                <span className="info-value">{location.type}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Dimension:</span>
                <span className="info-value">{location.dimension}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Residents:</span>
                <span className="info-value">{location.residents.length}</span>
              </div>
            </div>
          </div>
          
          <div className="characters-section">
            <h2>Residents of {location.name}</h2>
            {residents.length > 0 ? (
              <div className="card-container">
                {residents.map((resident) => (
                  <CharacterCard
                    key={resident.id}
                    character={resident}
                  />
                ))}
              </div>
            ) : (
              <p className="no-characters">No residents found in this location.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default LocationDetails; 