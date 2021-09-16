import React, { ReactElement } from 'react';
import ChatIco from './comments.svg';
import styles from './style.module.scss';

interface ChatBtnProps {
  openCloseChat: CallableFunction;
  notShownMessages: boolean;
}

const ChatBtn: React.FC<ChatBtnProps> = ({ openCloseChat, notShownMessages }): ReactElement => {
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

export default ChatBtn;
