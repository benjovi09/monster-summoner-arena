import { combineReducers } from "redux";
import playerReducer from "./player";
import marketsReducer from "./markets";

export default combineReducers({
    playerReducer,
    marketsReducer
});