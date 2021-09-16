import { Dispatch } from 'redux';
import { createCommonNotificationAboutError } from 'src/helpers/commonNotifications';
import { deleteUser } from 'src/services/user/deleteUser';
import { UserData } from 'src/types/user';
import { setCommonNotification } from '../notifications';
import { updateUser } from '../user';

export const deleteUserByMasterAction = (
  roomId: string,
  userId: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const result = await deleteUser(userId, roomId) as UserData;
    dispatch(updateUser(result));    
  } catch (error) {
    const notification = createCommonNotificationAboutError();
    dispatch(setCommonNotification(notification));
  }  
};
