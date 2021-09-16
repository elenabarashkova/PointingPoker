import { combineReducers } from 'redux';
import { currentUserId } from './currentUser';
import { game } from './game';
import { gameSettings } from './gameSettings';
import { issuesStore } from './issues';
import { messages } from './messages';
import { notifications } from './notifications';
import { users } from './setUsers';

const rootReducer = combineReducers({
  users,
  currentUserId,
  messages,
  issuesStore,
  game,
  gameSettings,
  notifications,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
