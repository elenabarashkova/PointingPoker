import { Dispatch } from 'redux';
import { setMessage, setMessageStatusIsLoading, setServerStatusError } from 'src/redux/actions/messages';
import { ERROR_RESULT } from 'src/services/constants';
import { sendMessage } from 'src/services/messages/sendMessage';
import { SendMessageResultType } from '../../../services/messages/sendMessage';

export const setNewMessageAction = (
  cleanUpMessageInput: CallableFunction, 
  roomId: string,
  messageInput: string,
) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(setMessageStatusIsLoading(true));
  try {
    const result: SendMessageResultType = await sendMessage(roomId, messageInput);
    if (result === ERROR_RESULT) {
      dispatch(setServerStatusError(true));
    } else {
      dispatch(setServerStatusError(false));
      dispatch(setMessage(result));
      cleanUpMessageInput();
    } 
  } catch (error) {
    dispatch(setServerStatusError(true));
  }  
  dispatch(setMessageStatusIsLoading(false));
};
