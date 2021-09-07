import { Room } from "../../types/store";
import { User, UserStatus } from "../../types/user";

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
