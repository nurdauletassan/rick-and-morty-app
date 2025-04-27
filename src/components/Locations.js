import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './ui/SearchBar';
import Pagination from './ui/Pagination';
import SkeletonLocation from './skeletons/SkeletonLocation';
import LocationCard from './cards/LocationCard';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://rickandmortyapi.com/api/location/?page=${page}&name=${search}`
        );
        await new Promise((resolve) => setTimeout(resolve, 200));
        setLocations(response.data.results);
        setTotalPages(response.data.info.pages);
        setError(null);
      } catch (err) {
        setError('No locations found');
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [page, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLocationClick = (location) => {
    navigate(`/locations/${location.id}`);
  };

  return (
    <div>
      <SearchBar
        value={search}
        onChange={handleSearch}
        placeholder="Search locations..."
      />

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="locations-list">
            {loading ? (
              // Show 6 skeleton locations while loading
              Array(6).fill(null).map((_, index) => (
                <SkeletonLocation key={index} />
              ))
            ) : (
              locations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  onClick={handleLocationClick}
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

export default Locations; 