import React, { ReactElement } from 'react';
import styles from './style.module.scss';
import ChatIco from './comments.svg';

const ChatButton: React.FC = (): ReactElement => {
  const handleClick = () => {
    console.log('открыть чат');
    // todo: открывать/закрывать чат по нажатию
  }; 

  return (
    <button type="button" className={styles.chatBtn} onClick={handleClick}>
      <img src={ChatIco} alt="" className={styles.chatIco} />
    </button>
  );
};

export default ChatButton;
