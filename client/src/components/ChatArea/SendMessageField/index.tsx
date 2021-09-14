import React, { ReactElement, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import SendMessageButton from 'components/shared/buttons/SendMessageButton';
import Textarea from 'components/Textarea';
import { ValidationMessages } from 'src/types/validationMessages';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { RootState } from 'src/redux/reducers';
import styles from './style.module.scss';
import { setNewMessageAction } from '../../../redux/actions/complexActions/setNewMessageAction';

interface SendMessageFieldProps {
  isLoading: boolean;
  serverError: boolean;
  setNewMessage: CallableFunction;
}

const SendMessageField: React.FC<SendMessageFieldProps> = ({
  isLoading, 
  serverError, 
  setNewMessage, 
}): ReactElement => {  
  const [messageInput, setMessageInput] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const roomId = useTypedSelector((state) => state.game.roomId);

  const handleTextArea = (textAreaValue: string) => {
    if (validationMessage) {
      setValidationMessage('');
    }
    if (!textAreaValue) {
      setValidationMessage(ValidationMessages.emptyField);
    }
    setMessageInput(textAreaValue); 
  };

  const handleSendMessage = () => {
    if (!messageInput) {
      setValidationMessage(ValidationMessages.emptyField);
    } else {
      setNewMessage({ onSuccess: () => setMessageInput('') }, roomId, messageInput);
    }
  };

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

const mapStateToProps = (state: RootState) => ({
  isLoading: state.messages.isLoading,
  serverError: state.messages.error,
});

export default connect(mapStateToProps, { setNewMessage: setNewMessageAction })(SendMessageField);
