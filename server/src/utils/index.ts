import { initGameSettings } from "../store";
import { GameStatus } from "../types/game";
import { Message } from "../types/message";
import { StoreSchema } from "../types/store";
import { User, UserRole, UserStatus } from "../types/user";

export const createRoom = (
  store: StoreSchema,
  roomId: string,
  userId: string,
  user: User
): void => {
  store[roomId] = {
    users: {},
    messages: [],
    issues: [],
    gameStatus: GameStatus.pending,
    gameSettings: initGameSettings,
  };

  store[roomId].users[userId] = {
    ...user,
    role: UserRole.master,
    status: UserStatus.active,
  };
};

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

export const addMessage = (
  store: StoreSchema,
  roomId: string,
  userId: string,
  text: string
): Message => {
  const message = { userId: userId, text };
  store[roomId].messages = [...store[roomId].messages, message];
  return message;
};

export const changeUserStatus = (
  store: StoreSchema,
  roomId: string,
  userId: string,
  status: keyof typeof UserStatus
): void => {
  store[roomId].users[userId].status = status;
};
