import { Dispatch } from 'redux';
import { 
  createCommonNotificationAboutConfirmation, 
  createCommonNotificationAboutError,
} from 'src/helpers/commonNotifications';
import { 
  AdmitConfirmationData, 
  sendAccessConfirmation,
} from 'src/services/access/sendAccessConfirmation';
import { User } from 'src/types/user';
import { setCommonNotification } from '../notifications';
import { updateUser } from '../user';

export const admitUserAction = (
  roomId: string,
  userId: string,
  user: User,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { 
      message, 
      userId: newUserId, 
      user: newUser,
    } = (await sendAccessConfirmation(roomId, userId, user, true)) as AdmitConfirmationData;

    dispatch(updateUser({ userId: newUserId, user: newUser }));
    // todo: голоса  
    const notification = createCommonNotificationAboutConfirmation(message);
    dispatch(setCommonNotification(notification));
  } catch (error) {
    dispatch(createCommonNotificationAboutError());
  }  
};
