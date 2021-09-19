import { Dispatch } from 'redux';
import { createCommonNotificationAboutError } from 'src/helpers/commonNotifications';
import { changeGameSettings } from 'src/services/game/changeGameSettings';
import { GameSettings } from 'src/types/room';
import { setAllGameSettings } from '../game';
import { setCommonNotification } from '../notifications';

export const changeGameSettingsAction = (
  currentRoomId: string,
  gameSettings: GameSettings,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    console.log('!!');
    const settings = await changeGameSettings(currentRoomId, gameSettings);
    console.log(settings);
    dispatch(setAllGameSettings(settings));
  } catch (error) {
    const notification = createCommonNotificationAboutError();
    dispatch(setCommonNotification(notification));
  }
};
