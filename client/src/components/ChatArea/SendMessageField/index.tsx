import React, { ReactElement, useState } from 'react';
import SendMessageButton from 'components/shared/buttons/SendMessageButton';
import Textarea from 'components/Textarea';
import { ValidationMessages } from 'src/types/validationMessages';
import styles from './style.module.scss';

interface SendMessageFieldProps {
  value: string;
  handleMessage: CallableFunction;
}

const SendMessageField: React.FC<SendMessageFieldProps> = ({ value, handleMessage }): ReactElement => {
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

  const handleServerError = () => {
    setValidationMessage(ValidationMessages.error);
    setMessageInput(value);
  };

  // todo: если validationMessage === error -> 
  // показать сообщение об ошибке отправки и отобразить в textarea value -> setMessageInput(value))

  const handleSendMessage = () => {
    if (messageInput) {
      handleMessage(messageInput);
      setMessageInput('');
    } else {
      setValidationMessage(ValidationMessages.emptyField);
    }
  };

  // todo: нажал отправить - меняем status
  // todo: пришел ответ - меняем status; мессeдж -> стор

  // todo: ошибку отображать возле input ?

  // messages должны приходить с id ?????

  // todo: валидация инпута

  return (
    
    <div className={styles.sendMessageField}>
      <Textarea
        value={messageInput} 
        onChange={handleTextArea} 
        placeholder="Print your message here"
        errorMessage={validationMessage}
      />
      <SendMessageButton onClick={handleSendMessage} />
    </div>
    
  );
};

export default SendMessageField;
