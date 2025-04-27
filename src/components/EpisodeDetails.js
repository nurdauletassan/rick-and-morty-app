import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SkeletonCard from './skeletons/SkeletonCard';
import CharacterCard from './cards/CharacterCard';
import './DetailsPage.css';

function EpisodeDetails() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        setLoading(true);
        const episodeResponse = await axios.get(
          `https://rickandmortyapi.com/api/episode/${id}`
        );
        await new Promise((resolve) => setTimeout(resolve, 300));
        setEpisode(episodeResponse.data);
        
        if (episodeResponse.data.characters.length > 0) {
          const characterPromises = episodeResponse.data.characters.map(url =>
            axios.get(url)
          );
          const responses = await Promise.all(characterPromises);
          setCharacters(responses.map(response => response.data));
        }
        
        setError(null);
      } catch (err) {
        setError('Episode not found');
        setEpisode(null);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeDetails();
  }, [id]);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="details-page">
      <Link to="/episodes" className="back-button">
        ← Back to Episodes
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
          <h2>Characters</h2>
          <div className="card-container">
            {Array(6).fill(null).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="details-header">
            <h1>{episode.name}</h1>
            <div className="details-info">
              <div className="info-item">
                <span className="info-label">Episode:</span>
                <span className="info-value">{episode.episode}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Air Date:</span>
                <span className="info-value">{episode.air_date}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Characters:</span>
                <span className="info-value">{episode.characters.length}</span>
              </div>
            </div>
          </div>
          
          <div className="characters-section">
            <h2>Characters in {episode.name}</h2>
            {characters.length > 0 ? (
              <div className="card-container">
                {characters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                  />
                ))}
              </div>
            ) : (
              <p className="no-characters">No characters found in this episode.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default EpisodeDetails; 