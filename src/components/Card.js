// src/components/Card.js
import React from 'react';
import classNames from 'classnames';

const getColor = (value) => {
  switch (value) {
    case 1:
      return 'bg-green-200';
    case 2:
      return 'bg-blue-200';
    case 3:
      return 'bg-yellow-200';
    case 5:
      return 'bg-orange-200';
    case 8:
      return 'bg-red-200';
    case 13:
      return 'bg-purple-200';
    case 21:
      return 'bg-pink-200';
    default:
      return 'bg-gray-200';
  }
};

const Card = ({ value, onClick }) => {
  const cardColor = getColor(value);

  return (
    <div 
      className={classNames(
        "w-16 h-24 border border-gray-700 flex items-center justify-center m-2 cursor-pointer rounded-lg shadow-lg transition-transform transform hover:scale-105",
        cardColor
      )}
      onClick={() => onClick(value)}
    >
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
};

export default Card;
