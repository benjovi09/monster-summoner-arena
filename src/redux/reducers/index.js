import { combineReducers } from 'redux';
import playerReducer from './player';
import marketsReducer from './markets';
import arenaReducer from './arena';
import tickerReducer from './ticker';

export default combineReducers({
  playerReducer,
  marketsReducer,
  arenaReducer,
  tickerReducer
});
