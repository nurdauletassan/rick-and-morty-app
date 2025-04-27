import React from 'react';
import './SkeletonLocation.css';

function SkeletonLocation() {
  return (
    <div className="skeleton-location">
      <div className="skeleton-location-name"></div>
      <div className="skeleton-location-details">
        <div className="skeleton-location-detail"></div>
        <div className="skeleton-location-detail"></div>
        <div className="skeleton-location-detail"></div>
      </div>
    </div>
  );
}

export default SkeletonLocation; 