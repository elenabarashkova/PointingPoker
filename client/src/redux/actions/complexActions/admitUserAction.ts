import { Dispatch } from 'redux';
import {
  createCommonNotificationAboutConfirmation,
  createCommonNotificationAboutError,
} from 'src/helpers/commonNotifications';
import store from 'src/redux/store';
import {
  AdmitConfirmationData,
  sendAccessConfirmation,
} from 'src/services/access/sendAccessConfirmation';
import { User } from 'src/types/user';
import { setCommonNotification } from '../notifications';
import { updateUserAction } from '../user';

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
    const { game } = store.getState();
    const canParticipate = !game.roundIsActive;
    dispatch(updateUserAction({ userId: newUserId, user: { ...newUser, canParticipate } }));
    const notification = createCommonNotificationAboutConfirmation(message);
    dispatch(setCommonNotification(notification));
  } catch (error) {
    dispatch(createCommonNotificationAboutError());
  }
};
