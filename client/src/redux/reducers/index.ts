import { combineReducers } from 'redux';
import { users } from './setUsers';
import { currentUserId } from './currentUser';
import { game } from './game';

export default combineReducers({
  users,
  currentUserId,
  // messages,
  // issues,
  game,
});
