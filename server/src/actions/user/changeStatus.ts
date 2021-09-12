import { Room } from '../../types/room';
import { User, UserStatus } from '../../types/user';

export const changeUserStatus = (
  room: Room,
  userId: string,
  status: keyof typeof UserStatus
): { updatedRoom: Room; updatedUser: User } => {
  const user = room.users[userId];
  const updatedUser = { ...user, status };
  const updatedRoom = {
    ...room,
    users: { ...room.users, [userId]: updatedUser },
  };
  return { updatedRoom, updatedUser };
};

export const addDisconnectedStatus = (
  room: Room,
  userId: string
): { updatedRoom: Room | undefined; disconnectedUser: User | undefined } => {
  const user = room.users[userId];
  if (user.status === UserStatus.active) {
    const disconnectedUser = { ...user, status: UserStatus.disconnected };
    const updatedRoom = {
      ...room,
      users: { ...room.users, [userId]: disconnectedUser },
    };
    return { updatedRoom, disconnectedUser };
  }

  return { updatedRoom: undefined, disconnectedUser: undefined };
};
