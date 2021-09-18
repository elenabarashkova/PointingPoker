import { Dispatch } from 'redux';
import { createCommonNotificationAboutError } from 'src/helpers/commonNotifications';
import { changeGameStatus } from 'src/services/game/changeGameStatus';
import { GameStatus } from 'src/types/room';
import { redirectToGamePage } from 'src/shared';
import { ImportantNotifications } from 'src/types/notifications';
import { setGameStatus } from '../game';
import { setCommonNotification, setImportantNotification } from '../notifications';

export const updateGameStatusAction = (
  currentRoomId: string,
  newGameStatus: keyof typeof GameStatus,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const gameStatus = await changeGameStatus(currentRoomId, newGameStatus) as GameStatus;
  
    dispatch(setGameStatus(gameStatus));
    
    if (gameStatus === GameStatus.canceled) {
      dispatch(setImportantNotification(ImportantNotifications.gameCanceled));
    }
    if (gameStatus === GameStatus.active) {
      redirectToGamePage();
    }
  } catch (error) {
    const notification = createCommonNotificationAboutError(); 
    dispatch(setCommonNotification(notification));
  }  
};
