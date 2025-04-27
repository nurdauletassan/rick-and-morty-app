import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './ui/SearchBar';
import Pagination from './ui/Pagination';
import SkeletonEpisode from './skeletons/SkeletonEpisode';
import EpisodeCard from './cards/EpisodeCard';
import CharacterCard from './cards/CharacterCard';

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [characters, setCharacters] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://rickandmortyapi.com/api/episode/?page=${page}&name=${search}`
        );
        await new Promise((resolve) => setTimeout(resolve, 300));
        setEpisodes(response.data.results);
        setTotalPages(response.data.info.pages);
        setError(null);
      } catch (err) {
        setError('No episodes found');
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [page, search]);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (selectedEpisode) {
        try {
          const characterPromises = selectedEpisode.characters.map(url =>
            axios.get(url)
          );
          const responses = await Promise.all(characterPromises);
          setCharacters(responses.map(response => response.data));
        } catch (err) {
          console.error('Error fetching characters:', err);
        }
      }
    };

    fetchCharacters();
  }, [selectedEpisode]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setCharacters([]);
    navigate(`/episodes/${episode.id}`);
  };

  return (
    <div>
      <SearchBar
        value={search}
        onChange={handleSearch}
        placeholder="Search episodes..."
      />

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="card-container">
            {loading ? (
              Array(8).fill(null).map((_, index) => (
                <SkeletonEpisode key={index} />
              ))
            ) : (
              episodes.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  onClick={() => handleEpisodeClick(episode)}
                />
              ))
            )}
          </div>

          {selectedEpisode && (
            <div className="characters-section">
              <h2>Characters in {selectedEpisode.name}</h2>
              <div className="card-container">
                {characters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                  />
                ))}
              </div>
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export default Episodes; 