import { Dispatch } from 'redux';
import { createCommonNotificationAboutError } from 'src/helpers/commonNotifications';
import { changeGameStatus } from 'src/services/game/changeGameStatus';
import { redirectToGamePage, redirectToResultPage } from 'src/shared/redirect';
import { ImportantNotifications } from 'src/types/notifications';
import { GameStatus } from 'src/types/room';
import { setGameStatus } from '../game';
import { resetNotifications, setCommonNotification, setImportantNotification } from '../notifications';

export const updateGameStatusAction = (
  currentRoomId: string, 
  newGameStatus: keyof typeof GameStatus,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const gameStatus = (await changeGameStatus(currentRoomId, newGameStatus)) as GameStatus;
    dispatch(setGameStatus(gameStatus));
    if (gameStatus === GameStatus.active) {
      redirectToGamePage();
    }
    if (gameStatus === GameStatus.canceled) {
      dispatch(resetNotifications());
      dispatch(setImportantNotification(ImportantNotifications.gameCanceled));
    }
    if (gameStatus === GameStatus.finished) {
      redirectToResultPage();
    }
  } catch (error) {
    const notification = createCommonNotificationAboutError();
    dispatch(setCommonNotification(notification));
  }
};
