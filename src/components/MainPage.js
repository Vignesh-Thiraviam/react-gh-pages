// MainPage.js
import React, { useEffect, useState, useRef } from 'react';

const MainPage = () => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedCard, setSelectedCard] = useState('😶');
  const [playerCards, setPlayerCards] = useState([ ]);
  const [isScrumMaster, setIsScrumMaster] = useState(false);
  const [minutesElapsed, setMinutesElapsed] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [clicked, setClicked] = useState(false);
  const timeoutRef = useRef(null);


  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://helloworld-pbyrdyblka-nw.a.run.app/api/playerpoints');
        const data = await response.json();
        setPlayerCards(data);
        calculateAverageScore(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const playerString = localStorage.getItem('selectedPlayer');
    const player = JSON.parse(playerString);
    setSelectedPlayer(player.playerName || '');

    // Check if the selected player is Scrum Master
    if (player.playerName === 'Scrum Master') {
      setIsScrumMaster(true);
    }

    // Start the clock
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 60000); // Convert milliseconds to minutes
      setMinutesElapsed(elapsed);
    }, 60000); // Update every minute

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Cleanup timeout if the component is unmounted
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCardClick = async (points) => {
    setSelectedCard(points);

    const playerString = localStorage.getItem('selectedPlayer');
    const player = JSON.parse(playerString);
    // const match = str.match(/\d+/); // Regular expression to match one or more digits
    // const number = match ? parseInt(match[0], 10) : null;
        // Define your payload
        const payload = 
        { 
            id: player.id,
            playerName: player.playerName,
            selectedPoints: points
         };

      try {
        const response = await fetch(`https://helloworld-pbyrdyblka-nw.a.run.app/api/playerpoints/${payload.id}`, {
          method: 'PUT', // Change the method to PUT
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        console.log('Success:', result);
    
        // Handle the response or update state if needed
      } catch (error) {
        console.error('Error:', error);
      }
  };

  // Define the story points deck
  const storyPoints = [1, 2, 3, 5, 8, 13, 21];

  // Function to calculate the average score
  const calculateAverageScore = (playerCards) => {
    const countVotes = {};

    // Initialize count for each story point
    storyPoints.forEach(point => countVotes[point] = 0);
  
    // Count votes for each point
    playerCards.forEach(card => {
      if (storyPoints.includes(card.selectedPoints)) {
        countVotes[card.selectedPoints] = (countVotes[card.selectedPoints] || 0) + 1;
      }
    });
  
    // Find the point with the maximum votes
    let maxVotes = 0;
    let maxPoint = null;
  
    for (const [point, votes] of Object.entries(countVotes)) {
      if (votes > maxVotes) {
        maxVotes = votes;
        maxPoint = point;
      }
    }
  
    // Update the state with the point having the maximum votes
    setAverageScore(maxPoint ? parseInt(maxPoint, 10) : null);
  };
  

  // reset the points activated by SM
  const resetStoryPointsForNewStory = async () => {

    if (!clicked) {
        setClicked(true);
        console.log('Reset story point clicked!');
        
            const payload = 
            { 
                allPlayers : playerCards
            };

            try {
                const response = await fetch('https://helloworld-pbyrdyblka-nw.a.run.app/api/playerpoints/updateAll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                });
        
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
            
                // Handle the response or update state if needed
            } catch (error) {
                console.error('Error:', error);
            }
            console.log("Update completed ");
            try {
                console.log("Get after update ");
                const getResponse = await fetch('https://helloworld-pbyrdyblka-nw.a.run.app/api/playerpoints');
                const newData = await getResponse.json();
                console.log("Post update ");
                console.log(newData);
                setPlayerCards(newData);
                calculateAverageScore(newData);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        
        timeoutRef.current = setTimeout(() => {
          setClicked(false);
        }, 10000); // 10 seconds
      } else {
        console.log('Second click ignored');
      }

  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Main Page</h1>
        {selectedPlayer && (
          <p className="text-lg bg-white text-gray-900 p-2 rounded-lg">
            Selected Player: {selectedPlayer}
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-white">
              <span className="text-2xl font-bold">{minutesElapsed}m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional rendering based on role */}
      {!isScrumMaster ? (
        <>
          {/* Display story points deck */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {storyPoints.map((points) => (
              <div
                key={points}
                onClick={() => handleCardClick(points)}
                className="cursor-pointer bg-white text-gray-900 p-6 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold"
              >
                {points}
              </div>
            ))}
          </div>

          {/* Display selected card */}
          <div className="mt-8 flex flex-col items-center">
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold mb-4">
              Selected Card: {selectedCard}
            </div>
          </div>
        </>
      ) : (
        <div>
          {/* Display task details */}
          <div className="mt-8 p-4 bg-white text-gray-900 rounded-lg shadow-md flex flex-col items-center">
            <div className="flex justify-between w-full items-center">
                <button
                onClick={() => console.log('Show All Data clicked')}
                className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-xl font-bold"
                >
                Show All Data
                </button>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md text-xl font-bold text-center">
                Average Score
                <div className="text-3xl text-blue-500 mt-2">{averageScore}</div>
                </div>
                <button
                onClick={() => resetStoryPointsForNewStory()}
                className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-xl font-bold"
                >
                Restart/ new story
                </button>
            </div>
            </div>

          {/* Display player cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playerCards.map((playerCard) => (
                <div
                key={playerCard.id}
                className="bg-white text-gray-900 p-6 rounded-lg shadow-md flex items-center justify-center text-xl font-bold"
                >
                {playerCard.playerName}: 
                {playerCard.selectedPoints === 0 ? (
                    <span className="ml-2 text-gray-500">🔄 Pending</span>
                ) : (
                    <span className="ml-2">{playerCard.selectedPoints}</span>
                )}
                </div>
            ))}
            </div>
        </div>
      )}

    </div>
  );
};

export default MainPage;
