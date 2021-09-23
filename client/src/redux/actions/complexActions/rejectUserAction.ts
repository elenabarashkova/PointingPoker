import { Dispatch } from 'redux';
import { 
  createCommonNotificationAboutConfirmation, 
  createCommonNotificationAboutError, 
} from 'src/helpers/commonNotifications';
import { 
  RejectConfirmationData, 
  sendAccessConfirmation,
} from 'src/services/access/sendAccessConfirmation';
import { User } from 'src/types/user';
import { setCommonNotification } from '../notifications';

export const rejectUserAction = (
  roomId: string,
  userId: string,
  user: User,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { message } = (await sendAccessConfirmation(roomId, userId, user, false)) as RejectConfirmationData;

    const notification = createCommonNotificationAboutConfirmation(message);
    dispatch(setCommonNotification(notification));  
  } catch (error) {
    dispatch(createCommonNotificationAboutError());
  }  
};
