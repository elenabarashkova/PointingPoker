import { Store } from '../../types/room';
import { User, UserStatus } from '../../types/user';

export const changeUserStatus = (
  roomId: string,
  userId: string,
  status: keyof typeof UserStatus,
  store: Store
): User => {
  const room = store[roomId];
  const user = room.users[userId];
  const updatedUser = { ...user, status };
  room.users = { ...room.users, [userId]: updatedUser };
  return updatedUser;
};

export const addDisconnectedStatus = (
  roomId: string,
  userId: string,
  store: Store
): User | undefined => {
  const room = store[roomId];
  const user = room.users[userId];
  if (user && user.status === UserStatus.active) {
    const disconnectedUser = { ...user, status: UserStatus.disconnected };
    room.users = { ...room.users, [userId]: disconnectedUser };
    return disconnectedUser;
  }
  return undefined;
};
