// src/components/Deck.js
import React from 'react';
import Card from './Card';

const Deck = ({ onCardClick }) => {
  const cardValues = [1, 2, 3, 5, 8, 13, 21];

  return (
    <div className="flex flex-wrap justify-center">
      {cardValues.map((value) => (
        <Card key={value} value={value} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default Deck;
