import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SkeletonCharacter from './skeletons/SkeletonCharacter';
import './CharacterDetails.css';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        await new Promise((resolve) => setTimeout(resolve, 300));
        setCharacter(response.data);
        setError(null);
      } catch (err) {
        setError('Character not found');
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (error) return <div className="character-error">{error}</div>;

  return (
    <div className="character-details-container">
      <Link to="/" className="character-back-button">
        ← Back to Characters
      </Link>

      {loading ? (
        <SkeletonCharacter />
      ) : (
        <div className="character-profile">
          <div className="character-image-container">
            <img src={character.image} alt={character.name} className="character-image" />
            <div className={`character-status ${character.status.toLowerCase()}`}>
              <span className="status-dot"></span>
              {character.status}
            </div>
          </div>
          
          <div className="character-content">
            <h1 className="character-name">{character.name}</h1>
            
            <div className="character-info-grid">
              <div className="info-group">
                <h3>Species</h3>
                <p>{character.species}</p>
              </div>
              
              <div className="info-group">
                <h3>Gender</h3>
                <p>{character.gender}</p>
              </div>
              
              <div className="info-group">
                <h3>Origin</h3>
                <p>{character.origin.name}</p>
              </div>
              
              <div className="info-group">
                <h3>Last Known Location</h3>
                <p>{character.location.name}</p>
              </div>
              
              <div className="info-group">
                <h3>Type</h3>
                <p>{character.type || 'Unknown'}</p>
              </div>
              
              <div className="info-group">
                <h3>First Seen</h3>
                <p>Episode {character.episode[0].split('/').pop()}</p>
              </div>
            </div>
            
            <div className="character-episodes">
              <h3>Featured in {character.episode.length} Episodes</h3>
              <div className="episode-count">
                {character.episode.length}
                <span>Episodes</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterDetails; 