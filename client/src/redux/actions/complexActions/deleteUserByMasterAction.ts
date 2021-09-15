import { Dispatch } from 'redux';
import { ERROR_RESULT } from 'src/services/constants';
import { deleteUser, DeleteUserResultType } from 'src/services/user/deleteUser';
import { updateUser } from '../user';

export const deleteUserByMasterAction = (
  roomId: string,
  userId: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    console.log('roomId:', roomId, 'userId:', userId);
    const result: DeleteUserResultType = await deleteUser(userId, roomId);
    console.log(result);
    if (result === ERROR_RESULT) {
      // todo: Показать сообщение об ошибке
    } else {
      dispatch(updateUser(result));
      // todo: показать уведомление об успехе
    } 
  } catch (error) {
    // todo: Показать сообщение об ошибке
  }  
};
