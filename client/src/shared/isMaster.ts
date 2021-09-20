import store from 'src/redux/store';
import { UserRole } from 'src/types/user';

export const isMaster = (): boolean => {
  const { users, currentUserId } = store.getState();
  return users[currentUserId].role === UserRole.master;
};
