import { Dispatch } from 'redux';
import { createCommonNotificationAboutError } from 'src/helpers/commonNotifications';
import { changeGameStatus } from 'src/services/game/changeGameStatus';
import { redirectToGamePage } from 'src/shared';
import { ImportantNotifications } from 'src/types/notifications';
import { GameStatus } from 'src/types/room';
import { setGameStatus } from '../game';
import { setCommonNotification, setImportantNotification } from '../notifications';

export const updateGameStatusAction = (currentRoomId: string, newGameStatus: keyof typeof GameStatus) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const gameStatus = (await changeGameStatus(currentRoomId, newGameStatus)) as GameStatus;
    console.log(gameStatus, 'gameStatus');
    dispatch(setGameStatus(gameStatus));
    if (gameStatus === GameStatus.active) {
      redirectToGamePage();
    }
    if (gameStatus === GameStatus.canceled) {
      dispatch(setImportantNotification(ImportantNotifications.gameCanceled));
    }
  } catch (error) {
    const notification = createCommonNotificationAboutError();
    dispatch(setCommonNotification(notification));
  }
};
