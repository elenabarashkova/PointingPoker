import { Room, StoreSchema } from "../types/store";
import { User, UserStatus } from "../types/user";

export const addUser = (
  room: Room,
  userId: string,
  user: User
): { updatedRoom: Room; joinedUser: User } => {
  const joinedUser = { ...user, status: UserStatus.active };
  const updatedRoom = {
    ...room,
    users: { ...room.users, [userId]: joinedUser },
  };
  return { updatedRoom, joinedUser };
};

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

export const addDisconnectStatus = (
  store: StoreSchema,
  roomId: string,
  userId: string
): void => {
  if (store[roomId].users[userId].status === UserStatus.active) {
    store[roomId].users[userId].status = UserStatus.disconnected;
  }
};
