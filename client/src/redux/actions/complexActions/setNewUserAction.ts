import { batch } from 'react-redux';
import { Dispatch } from 'redux';
import { setAllGameSettings, setGameStatus } from 'src/redux/actions/game';
import { setIssuesAction } from 'src/redux/actions/issues';
import { setMessages } from 'src/redux/actions/messages';
import { setRoomIdAction } from 'src/redux/actions/room';
import { setCurrentUserAction, setUsersAction } from 'src/redux/actions/user';
import { joinRoom } from 'src/services/room/joinRoom';
import { createRoom } from '../../../services/room/createRoom';
import { Room, RoomData } from '../../../types/room';
import { User } from '../../../types/user';
import { redirectToLobby, redirectToSettings } from '../../../shared';

export const setNewMaster = (newUser: User) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { roomId, room } = await createRoom(newUser) as RoomData;
    const { users } = room;

    batch(() => {
      dispatch(setUsersAction(users));
      dispatch(setCurrentUserAction(Object.keys(users)[0]));
      dispatch(setRoomIdAction(roomId));
    });

    redirectToSettings();
  } catch (error) {
    // todo: common-cotifications Катя
  }
};

export const setNewUser = (newUser: User, gameIdInput: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { room, roomId, userId } = (await joinRoom(gameIdInput, newUser)) as RoomData;
    const {
      users, messages, issues, gameStatus, gameSettings,
    } = room as Room;

    batch(() => {
      dispatch(setUsersAction(users));
      dispatch(setCurrentUserAction(userId));
      dispatch(setRoomIdAction(roomId));
      dispatch(setGameStatus(gameStatus));
      dispatch(setAllGameSettings(gameSettings));
      dispatch(setMessages(messages));
      dispatch(setIssuesAction(issues));
    });

    redirectToLobby();
  } catch (error) {
    // todo: common-cotifications Катя
  }
};
