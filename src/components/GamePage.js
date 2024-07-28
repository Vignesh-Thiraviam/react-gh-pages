import React, { useState } from 'react';
import Task from './Task';
import Deck from './Deck';
import Player from './Player';
import PlayerDropdown from './PlayerDropdown';
import PlayersPoints from './PlayersPoints';

const GamePage = () => {
  const [selectedCards, setSelectedCards] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const task = { title: 'Sample Task', description: 'This is a sample task to estimate.' };

  const handleCardClick = (value) => {
    if (selectedPlayer) {
      setSelectedCards((prev) => ({
        ...prev,
        [selectedPlayer]: value,
      }));
    }
  };

  const handlePlayerChange = (player) => {
    setSelectedPlayer(player);
  };

  const deckValues = [1, 2, 3, 5, 8, 13, 21];

  const calculateAverage = () => {
    const values = Object.values(selectedCards).filter((value) => value !== null);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return sum / values.length;
  };

  const findNearestDeckValue = (average) => {
    return deckValues.reduce((prev, curr) => Math.abs(curr - average) < Math.abs(prev - average) ? curr : prev);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const average = calculateAverage();
  const nearestWholeValue = Math.round(average);
  const nearestDeckValue = findNearestDeckValue(average);

  return (
    <div className="flex flex-col items-start p-4 min-h-screen bg-black text-white space-y-4">
      <div className="flex flex-row w-full space-x-4">
        {/* Left Column */}
        <div className="flex flex-col items-start w-3/4 space-y-4">
          <Task task={task} selectedValue={selectedCards[selectedPlayer]} />
          <Deck onCardClick={handleCardClick} />
          <Player name={selectedPlayer} selectedCard={selectedCards[selectedPlayer]} />
        </div>
        {/* Right Column */}
        <div className="flex flex-col items-center w-1/4 space-y-4">
          <PlayerDropdown onPlayerChange={handlePlayerChange} />
          <div className="flex flex-wrap justify-center space-x-2">
            <div className="bg-gray-800 rounded-lg shadow-md text-white p-4 w-20 h-24 flex flex-col items-center justify-center">
              <p className="text-sm font-bold">Avg</p>
              <p className="text-lg">{nearestWholeValue}</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-md text-white p-4 w-20 h-24 flex flex-col items-center justify-center">
              <p className="text-sm font-bold">Deck</p>
              <p className="text-lg">{nearestDeckValue}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <PlayersPoints selectedCards={selectedCards} />
      </div>
      <div className="w-full flex justify-center mt-4">
        <button
          onClick={handleReset}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default GamePage;
