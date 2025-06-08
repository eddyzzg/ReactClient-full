import React from 'react';
import '../styles/loader.scss';

export const FullPageLoader: React.FC = () => (
  <div className="fp-loader__overlay">
    <div className="fp-loader__spinner" />
    <div className="fp-loader__text">Ładowanie...</div>
  </div>
);
