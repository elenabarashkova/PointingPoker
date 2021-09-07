import { combineReducers } from 'redux';
import { addNewRoom } from './addNewRoom';

export default combineReducers({
  room: addNewRoom,
});
