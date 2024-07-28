// src/components/Player.js
import React from 'react';

const Player = ({ name, selectedCard }) => (
  <div className="m-4">
    <h4>{name}</h4>
    <p>Selected Card: {selectedCard || 'None'}</p>
  </div>
);

export default Player;
