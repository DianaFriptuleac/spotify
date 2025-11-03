import { combineReducers } from "@reduxjs/toolkit";
import albumReducer from "./album";
import authReducer from "./auth";

const rootReducer = combineReducers({
  music: albumReducer,
  auth: authReducer,
});
export default rootReducer;
