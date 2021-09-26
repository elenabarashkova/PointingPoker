import { batch } from 'react-redux';
import { Dispatch } from 'redux';
import { setRoomData } from 'src/helpers/setRoomData';
import { setRoomIdAction } from 'src/redux/actions/room';
import { setCurrentUserAction, setUsersAction } from 'src/redux/actions/user';
import { joinRoom } from 'src/services/room/joinRoom';
import { createRoom } from '../../../services/room/createRoom';
import { redirectToGamePage, redirectToLobby, redirectToSettings } from '../../../shared/redirect';
import { GameStatus, Room, RoomData } from '../../../types/room';
import { User } from '../../../types/user';
import { setImportantNotification } from '../notifications';
import { setTitle } from '../game';

export const setNewMaster = (newUser: User) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { roomId, room } = (await createRoom(newUser)) as RoomData;
    const { users } = room;

    batch(() => {
      dispatch(setUsersAction(users));
      dispatch(setCurrentUserAction(Object.keys(users)[0]));
      dispatch(setRoomIdAction(roomId));
      dispatch(setTitle(room.gameTitle));
    });

    redirectToSettings();
  } catch (error) {
    dispatch(setImportantNotification('Something went wrong. Try again'));
  }
};

export const setNewUser = (newUser: User, gameIdInput: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const result = await joinRoom(gameIdInput, newUser);
    if (
      result === 'Your request to join the room has been accepted'
        || result === 'Room not found'
    ) {
      dispatch(setImportantNotification(result));
    } else {
      const { room, roomId, userId } = result as RoomData;
      const { gameStatus } = room as Room;
      setRoomData(dispatch, room, roomId, userId);

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
