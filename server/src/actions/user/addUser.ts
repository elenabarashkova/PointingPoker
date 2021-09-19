import { Room, Store } from '../../types/room';
import { User, UserStatus } from '../../types/user';

export const addUser = (
  roomId: string,
  userId: string,
  user: User,
  store: Store
): { room: Room; joinedUser: User } => {
  const room = store[roomId];
  const joinedUser = { ...user, status: UserStatus.active };
  room.users = { ...room.users, [userId]: joinedUser };
  return { room, joinedUser };
};
