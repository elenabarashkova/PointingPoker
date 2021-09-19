import { Room, Store } from '../../types/room';
import { User, UserStatus } from '../../types/user';

export const reconnectUser = (
  roomId: string,
  newUserId: string,
  prevUserId: string,
  store: Store
): { room: Room; updatedUser: User } => {
  const room = store[roomId];
  const user = room.users[prevUserId];
  const updatedUser = { ...user, status: UserStatus.active };

  const updatedMessages = room.messages.map((message) =>
    message.userId === prevUserId ? { ...message, userId: newUserId } : message
  );
  room.messages = updatedMessages;
  room.users = { ...room.users, [newUserId]: updatedUser };

  return { room, updatedUser };
};
