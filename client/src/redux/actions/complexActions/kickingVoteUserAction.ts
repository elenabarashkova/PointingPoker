import { Dispatch } from 'redux';
import { kickingVoteUser } from 'src/services/user/kickingVoteUser';

export const kickingVoteUserAction = (
  confirm: boolean, 
  roomId: string, 
  kickedUserId: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const responceData = await kickingVoteUser(confirm, roomId, kickedUserId);
    // todo: common-notifications (responceData)
  } catch (error) {
    // todo: Показать сообщение об ошибке
  }  
};
