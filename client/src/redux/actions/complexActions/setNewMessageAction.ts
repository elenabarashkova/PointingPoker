import { Dispatch } from 'redux';
import { setMessageOnRequest, setMessageOnResponse, setMessageOnResponseFail } from 'src/redux/actions/messages';
import { ERROR_RESULT } from 'src/services/constants';
import { sendMessage } from 'src/services/messages/sendMessage';
import { SendMessageResultType } from '../../../services/messages/sendMessage';

export const setNewMessageAction = (
  { onSuccess }: Record<string, CallableFunction>, 
  roomId: string,
  messageInput: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(setMessageOnRequest());
    const result: SendMessageResultType = await sendMessage(roomId, messageInput);
    if (result === ERROR_RESULT) {
      dispatch(setMessageOnResponseFail());
    } else {
      dispatch(setMessageOnResponse(result));
      onSuccess();
    } 
  } catch (error) {
    dispatch(setMessageOnResponseFail());
  }  
};
