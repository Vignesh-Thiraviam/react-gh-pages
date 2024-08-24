import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name : "comments",
    initialState : {
        comments : [ {
            text : "Excited to play at old trafford",
            playerName : "Deligt"
        }]
    },
    reducers : {
        setComments : (state,action) => {
            state.comments = action.payload;
        }
    }
})

export const {setComments} = commentSlice.actions;
export default commentSlice.reducer;