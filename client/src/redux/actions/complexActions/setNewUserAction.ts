import { batch } from 'react-redux';
import { Dispatch } from 'redux';
import { setAllGameSettings, setGameStatus, setTitle } from 'src/redux/actions/game';
import { setIssuesAction } from 'src/redux/actions/issues';
import { setMessages } from 'src/redux/actions/messages';
import { setRoomIdAction } from 'src/redux/actions/room';
import { setCurrentUserAction, setUsersAction } from 'src/redux/actions/user';
import { joinRoom } from 'src/services/room/joinRoom';
import { createRoom } from '../../../services/room/createRoom';
import { redirectToGamePage, redirectToLobby, redirectToSettings } from '../../../shared';
import { GameStatus, Room, RoomData } from '../../../types/room';
import { User } from '../../../types/user';
import { setImportantNotification } from '../notifications';

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
    dispatch(setImportantNotification('Something went wrong. Try again'));
  }
};

export const setNewUser = (newUser: User, gameIdInput: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const result = await joinRoom(gameIdInput, newUser);
    if (result === 'Your request to join the room has been accepted'
    || result === 'Room not found') {
      dispatch(setImportantNotification(result));
    } else {
      const { room, roomId, userId } = result as RoomData;
      const {
        users, messages, issues, gameStatus, gameSettings, gameTitle,
      } = room as Room;
      // todo: данные о голосовании
  
      batch(() => {
        dispatch(setUsersAction(users));
        dispatch(setCurrentUserAction(userId));
        dispatch(setRoomIdAction(roomId));
        dispatch(setGameStatus(gameStatus));
        dispatch(setAllGameSettings(gameSettings));
        dispatch(setMessages(messages));
        dispatch(setIssuesAction(issues));
        dispatch(setTitle(gameTitle));
      });
      if (gameStatus === GameStatus.active) {
        redirectToGamePage();
      } else {
        redirectToLobby();
      }
    }
  } catch (error) {
    dispatch(setImportantNotification('Something went wrong. Try again'));
  }
};
