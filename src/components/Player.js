import React from 'react';

const Player = ({ name, selectedCard }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md text-white w-full">
      <h3 className="text-lg font-bold">{name}</h3>
      {selectedCard && <p>Selected Card: {selectedCard}</p>}
    </div>
  );
};

export default Player;
