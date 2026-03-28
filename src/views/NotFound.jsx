import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-glitch" data-text="404">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          id="go-home-btn"
          className="not-found-btn"
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>
      </div>
      <div className="not-found-orb orb-1" />
      <div className="not-found-orb orb-2" />
    </div>
  );
}
