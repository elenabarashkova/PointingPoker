import { combineReducers } from 'redux';
import { currentUserId } from './currentUser';
import { game } from './game';
import { gameSettings } from './gameSettings';
import { issuesStore } from './issues';
import { messages } from './messages';
import { users } from './setUsers';

export default combineReducers({
  users,
  currentUserId,
  messages,
  issuesStore,
  game,
  gameSettings,
});
