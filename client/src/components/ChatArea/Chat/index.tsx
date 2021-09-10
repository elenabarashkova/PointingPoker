import React, { ReactElement, useEffect, useState } from 'react';
import styles from './style.module.scss';
import MessagesField from '../MessagesField';
import SendMessageField from '../SendMessageField';

const Chat: React.FC = (): ReactElement => {
  const [userMessage, setUserMessage] = useState('');

  const handleSendMessageField = (value: string) => {
    setUserMessage(value); 
    // console.log(value);
  };

  useEffect(
    () => {
      console.log('userMessage:', userMessage);
    }, [userMessage],
  );

  // todo: нажал отправить - меняем status
  // todo: пришел ответ - меняем status; мессeдж -> стор
  // messages должны приходить с id ?????

  return (
    <div className={styles.chat}>
      <MessagesField />
      <SendMessageField value={userMessage} handleMessage={handleSendMessageField} />
    </div>
  );
};

export default Chat;
