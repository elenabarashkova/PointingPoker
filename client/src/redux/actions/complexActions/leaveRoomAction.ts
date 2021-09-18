import { Dispatch } from 'redux';
import { createCommonNotificationAboutError } from 'src/helpers/commonNotifications';
import { leaveRoom } from 'src/services/room/leaveRoom';
import {  ImportantNotifications } from 'src/types/notifications';
import { UserData } from 'src/types/user';
import { setCommonNotification, setImportantNotification } from '../notifications';
import { updateUser } from '../user';

export const leaveRoomAction = (
  roomId: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const userData = await leaveRoom(roomId) as UserData;
  
    dispatch(updateUser(userData));
    dispatch(setImportantNotification(ImportantNotifications.userExitGame));
  } catch (error) {
    const notification = createCommonNotificationAboutError();
    dispatch(setCommonNotification(notification));
  }  
};
