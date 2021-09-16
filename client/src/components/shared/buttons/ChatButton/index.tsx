import React, { ReactElement } from 'react';
import ChatIco from './comments.svg';
import styles from './style.module.scss';

interface ChatButtonProps {
  openCloseChat: CallableFunction;
  notShownMessages: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ openCloseChat, notShownMessages }): ReactElement => {
  const handleClick = () => {
    openCloseChat();
  }; 

  return (
    <button type="button" className={styles.chatBtn} onClick={handleClick}>
      {notShownMessages && <div className={styles.newMessagesIndicator} />}
      <img src={ChatIco} alt="" className={styles.chatIco} />
    </button>
    
  );
};

export default ChatButton;
