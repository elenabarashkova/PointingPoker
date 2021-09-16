import { Dispatch } from 'redux';
import { createCommonNotificationAboutVouting } from 'src/helpers/commonNotifications';
import { kickingVoteUser } from 'src/services/user/kickingVoteUser';
import { CommonNotificationType } from 'src/types/notifications';
import { setCommonNotification } from '../notifications';

export const kickingVoteUserAction = (
  confirm: boolean, 
  roomId: string, 
  kickedUserId: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    await kickingVoteUser(confirm, roomId, kickedUserId);
    
    const notification = createCommonNotificationAboutVouting(CommonNotificationType.success);
    dispatch(setCommonNotification(notification));
  } catch (error) {
    const notification = createCommonNotificationAboutVouting(CommonNotificationType.error);
    dispatch(setCommonNotification(notification));
  }  
};
