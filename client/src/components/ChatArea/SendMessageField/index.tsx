import React, { ReactElement, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import SendMessageButton from 'components/shared/buttons/SendMessageButton';
import Textarea from 'components/Textarea';
import { ValidationMessages } from 'src/types/validationMessages';
import { setMessage, setMessageStatusIsLoading, setServerStatusError } from 'src/redux/actions';
import { connect } from 'react-redux';
import { sendMessage } from 'src/services/sendMessage';
import { Message, MessageData } from 'src/types/messages';
import styles from './style.module.scss';

interface SendMessageFieldProps {
  roomId: string;
  isLoading: boolean;
  serverError: boolean;
  setMessageStatusIsLoading;
  setServerStatusError;
  setMessage;
}

const SendMessageField: React.FC<SendMessageFieldProps> = ({
  roomId, isLoading, serverError, setMessageStatusIsLoading: setMessageStatus, setServerStatusError: setServerStatus, setMessage: setNewMessage, 
}): ReactElement => {  
  const [messageInput, setMessageInput] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleTextArea = (textAreaValue: string) => {
    if (validationMessage) {
      setValidationMessage('');
    }
    if (!textAreaValue) {
      setValidationMessage(ValidationMessages.emptyField);
    }
    setMessageInput(textAreaValue); 
  };

  const handleSendMessage = async () => {
    if (messageInput) {
      setMessageStatus(true);
      try {
        const message = await sendMessage(roomId, messageInput);

        if (message.messageId) {
          setMessageStatus(false);
          setNewMessage(message);
          setMessageInput('');
        }
      } catch (error) {
        setServerStatus(true);
        setMessageStatus(false);
      }  
    } else {
      setValidationMessage(ValidationMessages.emptyField);
    }
  };

  // todo: нажал отправить - меняем status
  // todo: пришел ответ - меняем status; мессeдж -> стор

  // messages должны приходить с id ?????

  return (
    <div className={styles.wrapper}>
      <div className={styles.sendMessageField}>
        <Textarea
          value={messageInput} 
          onChange={handleTextArea} 
          placeholder="Print your message here"
          errorMessage={serverError ? ValidationMessages.error : validationMessage}
        />
        <SendMessageButton onClick={handleSendMessage} />
      
      </div>
      { isLoading && <LinearProgress /> }
    </div>
    
  );
};

const mapStateToProps = (state) => ({
  roomId: state.game.roomId,
  isLoading: state.messages.isLoading,
  serverError: state.messages.error,
});
const mapDispatchToProps = (dispatch) => ({
  setMessageStatusIsLoading: (status: boolean) => dispatch(setMessageStatusIsLoading(status)),
  setServerStatusError: (status: boolean) => dispatch(setServerStatusError(status)),
  setMessage: (message: MessageData) => dispatch(setMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageField);
