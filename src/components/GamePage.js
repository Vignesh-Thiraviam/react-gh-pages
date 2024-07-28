// src/pages/GamePage.js
import React, { useState } from 'react';
import Task from './Task';
import Deck from './Deck';
import Player from './Player';


const GamePage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const task = { title: 'Sample Task', description: 'This is a sample task to estimate.' };

  const handleCardClick = (value) => {
    setSelectedCard(value);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Task task={task} selectedValue={selectedCard} />
      <Deck onCardClick={handleCardClick} />
      <Player name="Player 1" selectedCard={selectedCard} />
    </div>
  );
};

export default GamePage;
