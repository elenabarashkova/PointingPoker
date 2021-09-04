import { StoreSchema } from "../types/store";
import { User, UserStatus } from "../types/user";

export const addUser = (
  store: StoreSchema,
  roomId: string,
  userId: string,
  user: User
): User => {
  const joinedUser = { ...user, status: UserStatus.active };
  store[roomId].users[userId] = joinedUser;
  return joinedUser;
};

export const changeUserStatus = (
  store: StoreSchema,
  roomId: string,
  userId: string,
  status: keyof typeof UserStatus
): void => {
  store[roomId].users[userId].status = status;
};
