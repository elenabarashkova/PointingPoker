import { Dispatch } from 'redux';
import { kickUser } from 'src/services/user/kickUser';
import { KickUserdata } from 'src/types/user';
import { updateUser } from '../user';

export const kickUserByUserAction = (
  userId: string,
  roomId: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { kickedUserId, kickedUser } = await kickUser(userId, roomId) as KickUserdata;
    dispatch(updateUser({ userId: kickedUserId, user: kickedUser }));
    // todo: common-notification
  } catch (error) {
    // todo: common-notifications
    console.log('Блок catch:', error);
  }  
};
