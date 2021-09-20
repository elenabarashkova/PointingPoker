import store from 'src/redux/store';
import { UserRole } from 'src/types/user';

export const isObserver = (): boolean => {
  const { users, currentUserId } = store.getState();
  return users[currentUserId].role === UserRole.observer;
};
