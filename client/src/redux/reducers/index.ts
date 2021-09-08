import { combineReducers } from 'redux';
import { users } from './setUsers';
import { currentUserId } from './currentUser';
import { game } from './game';
import { gameSettings } from './gameSettings';
import { messages } from './messages';
import { issues } from './issues';

export default combineReducers({
  users,
  currentUserId,
  messages,
  issues,
  game,
  gameSettings,
});
