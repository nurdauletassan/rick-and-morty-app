import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './ui/SearchBar';
import Pagination from './ui/Pagination';
import CharacterCard from './cards/CharacterCard';
import SkeletonCard from './skeletons/SkeletonCard';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`
        );
        await new Promise((resolve) => setTimeout(resolve, 300));
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
        setError(null);
      } catch (err) {
        setError('No characters found');
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCharacterClick = (character) => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div>
      <SearchBar
        value={search}
        onChange={handleSearch}
        placeholder="Search characters..."
      />

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="card-container">
            {loading ? (
              Array(20).fill(null).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onClick={handleCharacterClick}
                />
              ))
            )}
          </div>

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

export default Characters; 