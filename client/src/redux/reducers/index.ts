import { combineReducers } from 'redux';
import { currentUserId } from './currentUser';
import { game } from './game';
import { gameSettings } from './gameSettings';
import { issuesStore } from './issues';
import { messages } from './messages';
import { notifications } from './notifications';
import { users } from './setUsers';
import { voting } from './voting';

const rootReducer = combineReducers({
  users,
  currentUserId,
  messages,
  issuesStore,
  game,
  gameSettings,
  notifications,
  voting,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
