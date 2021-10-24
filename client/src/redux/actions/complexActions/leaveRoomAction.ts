import { Dispatch } from 'redux';
import { createCommonNotificationAboutError } from 'src/helpers/commonNotifications';
import { leaveRoom } from 'src/services/room/leaveRoom';
import { redirectToMainPage } from 'src/shared/redirect';
import { ImportantNotifications } from 'src/types/notifications';
import { UserData } from 'src/types/user';
import { resetNotifications, setCommonNotification, setImportantNotification } from '../notifications';
import { updateUserAction } from '../user';

export const leaveRoomAction = (
  roomId: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const userData = await leaveRoom(roomId) as UserData;
   
    redirectToMainPage();
    dispatch(resetNotifications());
    dispatch(updateUserAction(userData));
    dispatch(setImportantNotification(ImportantNotifications.userExitGame));
  } catch (error) {
    const notification = createCommonNotificationAboutError();
    dispatch(setCommonNotification(notification));
  }  
};
