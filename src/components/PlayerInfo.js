import React, { useState } from 'react';
import { FaCog, FaTimes, FaUser } from 'react-icons/fa'; // Import required icons
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayerAsync } from './utils/playerSlice';

const PlayerInfo = ({ selectedPlayer }) => {
  // Ensure you get the 'name' and 'id' from the selectedPlayer object
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(selectedPlayer.playerName);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Dispatch the thunk action
    console.log("handling save click for save player");

    // Dispatch the thunk action with the selectedPlayer and playerName as an object
    dispatch(updatePlayerAsync({ selectedPlayer, playerName }));
  
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setPlayerName(selectedPlayer.name); // Reset the player name to the original value
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2 border p-2 rounded-lg bg-slate-400">
      <FaUser className="text-gray-900 text-xl" /> {/* Player icon */}

      {isEditing ? (
        <input
          type="text"
          value={playerName}
          onChange={handleInputChange}
          className="text-sm bg-white text-gray-900 p-1 rounded flex-grow"
        />
      ) : (
        <span className="text-sm bg-white text-gray-900 p-1 rounded flex-grow">
          {playerName} {/* Display the player's name */}
        </span>
      )}

      {isEditing ? (
        <>
          <button onClick={handleSaveClick} className="p-1 text-blue-500 font-bold">
            Save
          </button>
          <button onClick={handleCancelClick} className="p-1 text-red-500">
            <FaTimes />
          </button>
        </>
      ) : (
        <button onClick={handleEditClick} className="p-1">
          <FaCog className="text-gray-900" />
        </button>
      )}
    </div>
  );
};

export default PlayerInfo;
