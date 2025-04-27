import React from 'react';
import './SkeletonEpisode.css';

function SkeletonEpisode() {
  return (
    <div className="skeleton-episode">
      <div className="skeleton-episode-name"></div>
      <div className="skeleton-episode-details">
        <div className="skeleton-episode-detail"></div>
        <div className="skeleton-episode-detail"></div>
      </div>
    </div>
  );
}

export default SkeletonEpisode; 