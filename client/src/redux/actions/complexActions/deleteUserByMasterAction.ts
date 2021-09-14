import { Dispatch } from 'redux';
import { ERROR_RESULT } from 'src/services/constants';
import { deleteUser, DeleteUserResultType } from 'src/services/user/deleteUser';
import { setUser } from '../user';

export const deleteUserByMasterAction = (
  roomId: string,
  userId: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const result: DeleteUserResultType = await deleteUser(roomId, userId);
    console.log(result);
    if (result === ERROR_RESULT) {
      // todo: Показать сообщение об ошибке
    } else {
      dispatch(setUser(result));
    } 
  } catch (error) {
    // todo: Показать сообщение об ошибке
  }  
};
