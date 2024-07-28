// src/components/PlayersPoints.js
import React from 'react';

const PlayersPoints = ({ selectedCards }) => {
  const players = [
    { name: 'Player 1', color: '#DA291C' },  // Manchester United
    { name: 'Player 2', color: '#034694' },  // Chelsea
    { name: 'Player 3', color: '#C8102E' },  // Liverpool
    { name: 'Player 4', color: '#6CABDD' },  // Manchester City
    { name: 'Player 5', color: '#EF0107' },  // Arsenal
    { name: 'Player 6', color: '#132257' },  // Tottenham
    { name: 'Player 7', color: '#0053A0' },  // Leicester City
    { name: 'Player 8', color: '#003399' },  // Everton
    { name: 'Player 9', color: '#FFCD00' },  // Watford
    { name: 'Player 10', color: '#7A263A' }, // West Ham United
  ];

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md text-white w-full">
      <h3 className="text-lg font-bold mb-4">Players Points</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2 border-2 rounded-lg"
            style={{ borderColor: player.color, backgroundColor: player.color }}
          >
            <span className="font-bold text-sm">{player.name}</span>
            <span className="text-xl">
              {selectedCards[player.name] !== undefined ? selectedCards[player.name] : '😢'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersPoints;
