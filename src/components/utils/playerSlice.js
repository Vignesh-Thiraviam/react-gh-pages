import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;
// {id: 54, playerName: 'Player9', selectedPoints: 0, timestamp: '2024-08-09T15:40:33.086801'}
const playerSlice = createSlice({
    name : "players", 
    initialState : {
        player : {
            id : 0,
            playerName : "PlayerX",
        }
    },
    reducers : {
        setPlayer : ( state , action) => {
          console.log("player update in reducer " + action.payload);
          console.log(action.payload);
          state.player = action.payload;
        }
    },
    extraReducers: (builder) => {
      builder.addCase(updatePlayerAsync.fulfilled, (state, action) => {
        // Handle the fulfilled action
        state.player = action.payload;
      });
    }
});

const updatePlayerData = async (selectedPlayer , playerName) => {

    // Your API call logic here
    console.log("Updating player:", selectedPlayer.id, "with new name:", playerName);
    console.log("In reducer slice ");
    console.log(playerName);
    const payload = 
    { 
        id: selectedPlayer.id,
        playerName: playerName
    };

    console.log("data to update player");
    console.log(JSON.stringify(payload));

  try {
    const response = await fetch(`${apiUrl}/api/playerpoints/name/${payload.id}`, {
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
    return result;

    // Handle the response or update state if needed
  } catch (error) {
    console.error('Error:', error);
  }

}

export const updatePlayerAsync = createAsyncThunk(
  'player/updatePlayerAsync', 
  async ({ selectedPlayer, playerName }, { dispatch, getState }) => {
    console.log("from thunk selectedPlayer: " + JSON.stringify(selectedPlayer));
    console.log("from thunk playerName: " + JSON.stringify(playerName));

    const response = await updatePlayerData(selectedPlayer, playerName);
    return response;
  }
);

export const { setPlayer } = playerSlice.actions;
export default playerSlice.reducer;