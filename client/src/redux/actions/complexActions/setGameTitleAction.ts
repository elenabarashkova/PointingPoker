import { Dispatch } from 'redux';
import { createCommonNotificationAboutError } from '../../../helpers/commonNotifications';
import { setCommonNotification } from '../notifications';
import { setGameTitle } from '../../../services/game/setGameTitle';
import { setTitle } from '../game';

export const setGameTitleAction = (
  currentRoomId: string,
  gameTitle: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const title = await setGameTitle(currentRoomId, gameTitle);
    dispatch(setTitle(title));
  } catch (error) {
    const notification = createCommonNotificationAboutError();
    dispatch(setCommonNotification(notification));
  }
};
