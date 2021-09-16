import { Dispatch } from 'redux';
import { setMessageOnRequest, setMessageOnResponse, setMessageOnResponseFail } from 'src/redux/actions/messages';
import { sendMessage } from 'src/services/messages/sendMessage';
import { Message } from 'src/types/messages';

export const setNewMessageAction = (
  { onSuccess }: Record<string, CallableFunction>, 
  roomId: string,
  messageInput: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(setMessageOnRequest());
    const message = await sendMessage(roomId, messageInput) as Message;
    dispatch(setMessageOnResponse(message));
    onSuccess();
  } catch (error) {
    dispatch(setMessageOnResponseFail());
  }  
};
