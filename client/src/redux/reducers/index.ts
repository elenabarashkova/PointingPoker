import { combineReducers } from 'redux';
import { users } from './setUsers';
import { currentUserId } from './currentUser';
import { game } from './game';
import { gameSettings } from './gameSettings';
import { messages } from './messages';
import { issues } from './issues';
import { notifications } from './notifications';

const rootReducer = combineReducers({
  users,
  currentUserId,
  messages,
  issues,
  game,
  gameSettings,
  notifications,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
