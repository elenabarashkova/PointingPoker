import { Dispatch } from 'redux';
import { kickingVoteUser } from 'src/services/user/kickingVoteUser';

export const kickingVoteUserAction = (
  confirm: boolean, 
  roomId: string, 
  kickedUserId: string,
) => (dispatch: Dispatch) => {
  try {
    // todo: венуть await  
    kickingVoteUser(confirm, roomId, kickedUserId);
    // todo: common-notifications
  } catch (error) {
    // todo: Показать сообщение об ошибке
    console.log('Блок catch:', error);
  }  
};
