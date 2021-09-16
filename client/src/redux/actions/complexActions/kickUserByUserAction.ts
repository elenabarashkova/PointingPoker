import { Dispatch } from 'redux';
import { createCommonNotificationAboutKicking } from 'src/helpers/commonNotifications';
import { kickUser } from 'src/services/user/kickUser';
import { CommonNotificationType } from 'src/types/notifications';
import { KickUserdata } from 'src/types/user';
import { setCommonNotification } from '../notifications';
import { updateUser } from '../user';

export const kickUserByUserAction = (
  userId: string,
  roomId: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { kickedUserId, kickedUser } = await kickUser(userId, roomId) as KickUserdata;

    dispatch(updateUser({ userId: kickedUserId, user: kickedUser }));

    const notification = createCommonNotificationAboutKicking(CommonNotificationType.success, kickedUser);
    dispatch(setCommonNotification(notification));
  } catch (error) {
    const notification = createCommonNotificationAboutKicking(CommonNotificationType.error);
    dispatch(setCommonNotification(notification));
  }  
};
