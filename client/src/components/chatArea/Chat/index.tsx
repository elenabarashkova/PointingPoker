import React, { ReactElement } from 'react';
import styles from './style.module.scss';
import MessagesField from '../MessagesField';
import SendMessageField from '../SendMessageField';

const Chat: React.FC = (): ReactElement => (
  <div className={styles.chat}>
    <MessagesField />
    <SendMessageField />
  </div>
);

export default Chat;
