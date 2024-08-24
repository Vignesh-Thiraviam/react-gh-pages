// LandingPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import headerImage from '../Pointsplanner.jpeg'; 
import { useDispatch } from 'react-redux';
import { setPlayer } from './utils/playerSlice';



const LandingPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [players, setPlayers] = useState([ ]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // const response = await fetch('${apiUrl}/api/playerpoints');
        const response = await fetch(`${apiUrl}/api/playerpoints`);
        const data = await response.json();
        // const allPlayerNames = data.map(player => player.playerName);
        // console.log(allPlayerNames);
        setPlayers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial fetch
    fetchData();

  }, []);

  const handlePlayerSelection = (player) => {
    localStorage.setItem('selectedPlayer', JSON.stringify(player));
    dispatch(setPlayer(player));
    navigate('/main');
  };

  return (
<div className="w-full h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 text-white flex flex-col items-center justify-center">
      {/* Logo at the top */}
      <img
        src={headerImage}
        alt="Logo"
        className="w-52 h-auto mb-4" // Adjust width as needed, height auto maintains aspect ratio
      />
      <h1 className="text-3xl font-bold mb-4">Select a Player</h1>
            {/* Additional Notes */}
            <p className="text-3xl mb-6 font-dancing text-center">
                Kindly choose one role below and stick to it !
            </p>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <ClipLoader color="#ffffff" loading={loading} size={150} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {players.map((player, index) => (
            <button
              key={index}
              onClick={() => handlePlayerSelection(player)}
              className="bg-white text-gray-900 p-4 rounded-lg shadow-md text-xl font-bold"
            >
              {player.playerName}
            </button>
          ))}
          <button
            onClick={() => handlePlayerSelection({ id: 1, playerName: 'Scrum Master' })}
            className="bg-white text-gray-900 p-4 rounded-lg shadow-md text-xl font-bold"
          >
            Scrum Master
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
