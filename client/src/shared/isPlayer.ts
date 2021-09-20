import store from 'src/redux/store';
import { UserRole } from 'src/types/user';

export const isPlayer = (): boolean => {
  const { users, currentUserId } = store.getState();
  return users[currentUserId].role === UserRole.player;
};
