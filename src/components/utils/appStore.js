import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import commentReducer from "./commentSlice";

const appStore = configureStore( {
    reducer : {
        players: playerReducer,
        comments : commentReducer
    }
});

export default appStore;
