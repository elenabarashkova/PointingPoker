import { Dispatch } from 'redux';
import { createCommonNotificationAboutReconnecting } from 'src/helpers/commonNotifications';
import { setRoomData } from 'src/helpers/setRoomData';
import { reconnect } from 'src/services/room/reconnect';
import { redirectToGamePage, redirectToLobby } from '../../../shared';
import { GameStatus } from '../../../types/room';
import { setCommonNotification, setImportantNotification } from '../notifications';

export const reconnectToRoom = (roomId: string, userId: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { newUserId, room } = await reconnect(roomId, userId);
    const { gameStatus } = room;

    setRoomData(dispatch, room, roomId, newUserId);

    if (gameStatus === GameStatus.active) {
      redirectToGamePage();
    } else {
      redirectToLobby();
    }

    const notification = createCommonNotificationAboutReconnecting();
    dispatch(setCommonNotification(notification));
  } catch (error) {
    dispatch(setImportantNotification('Something went wrong. Try again'));
  }
};
