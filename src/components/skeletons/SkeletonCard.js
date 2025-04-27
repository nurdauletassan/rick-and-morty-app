import React from 'react';
import './SkeletonCard.css';

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-name"></div>
        <div className="skeleton-species"></div>
        <div className="skeleton-status"></div>
      </div>
    </div>
  );
}

export default SkeletonCard; 