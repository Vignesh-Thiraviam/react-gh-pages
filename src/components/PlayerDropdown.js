import React, { useState } from 'react';

const PlayerDropdown = ({ onPlayerChange }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const players = [
    'Player 1',
    'Player 2',
    'Player 3',
    'Player 4',
    'Player 5',
    'Player 6',
    'Player 7',
    'Player 8',
    'Player 9',
    'Player 10',
  ];

  const handleChange = (event) => {
    const player = event.target.value;
    setSelectedPlayer(player);
    onPlayerChange(player);  // Call the callback with the selected player
  };

  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md text-white">
      <h1 className="text-2xl mb-4">Select a Player</h1>
      <select
        value={selectedPlayer}
        onChange={handleChange}
        className="w-full p-2 bg-gray-700 text-white rounded"
      >
        <option value="" disabled>Select a player</option>
        {players.map((player, index) => (
          <option key={index} value={player}>
            {player}
          </option>
        ))}
      </select>
      {selectedPlayer && (
        <div className="mt-4">
          <p className="text-lg">Selected Player: {selectedPlayer}</p>
        </div>
      )}
    </div>
  );
};

export default PlayerDropdown;
