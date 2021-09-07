import { PayloadAction } from "@reduxjs/toolkit";
import { CREATE_ROOM } from "../../services/constants";
import { Room } from "../../types/room";

export const initialState = {};

export const addNewRoom = (
  state = initialState,
  { type, payload }: PayloadAction<Room>
): Room | any => {
  if (type === CREATE_ROOM) {
    return payload;
  }

  return state;
};

// Стор у нас примерно такой
//
// const store = {
//   users: {},
//   messages: [],
//   issues: [],
//   gameStatus: GameStatus.pending,
//   gameSettings: initialGameSettings,
// };
// Предлагаю разбить на редюсеры:
// 1. User - My state - сюда пойдyт ID комнаты, id самого себя, роль и все про себя, roomIdIsValid: undefined/true/false
// 3. Messages
// 4. Users
// 5. gameStatus + gameSettings можно объединить в Game

// У 1,2,3 будут свои isLoading и error
