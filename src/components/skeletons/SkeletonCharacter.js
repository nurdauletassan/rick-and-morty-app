import React from 'react';
import './SkeletonCharacter.css';

const SkeletonCharacter = () => {
  return (
    <div className="skeleton-character">
      <div className="skeleton-character-image"></div>
      <div className="skeleton-character-content">
        <div className="skeleton-character-name"></div>
        <div className="skeleton-character-info">
          <div className="skeleton-character-info-item"></div>
          <div className="skeleton-character-info-item"></div>
          <div className="skeleton-character-info-item"></div>
          <div className="skeleton-character-info-item"></div>
          <div className="skeleton-character-info-item"></div>
          <div className="skeleton-character-info-item"></div>
        </div>
        <div className="skeleton-character-episodes">
          <div className="skeleton-character-episodes-title"></div>
          <div className="skeleton-character-episodes-count"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCharacter; 