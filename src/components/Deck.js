// src/components/Deck.js
import React from 'react';

const Deck = ({ onCardClick }) => {
  const cards = [1, 2, 3, 5, 8, 13, 21];

  const cardColors = {
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    5: 'bg-green-500',
    8: 'bg-teal-500',
    13: 'bg-blue-500',
    21: 'bg-purple-500',
  };

  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((card) => (
        <button
          key={card}
          onClick={() => onCardClick(card)}
          className={`p-4 rounded-lg shadow-md text-white w-16 h-16 flex items-center justify-center ${cardColors[card]}`}
        >
          {card}
        </button>
      ))}
    </div>
  );
};

export default Deck;
