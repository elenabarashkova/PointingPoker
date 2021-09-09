import React, { ReactElement } from 'react';
import ChatIco from './comments.svg';
import styles from './style.module.scss';

interface ChatBtnProps {
  openCloseChat: CallableFunction;
}

const ChatBtn: React.FC<ChatBtnProps> = ({ openCloseChat }): ReactElement => {
  const handleClick = () => {
    openCloseChat();
    console.log('открыть/закрыть чат');
    // todo: открывать/закрывать чат по нажатию
  }; 

  return (
    
    <button type="button" className={styles.chatBtn} onClick={handleClick}>
      <img src={ChatIco} alt="" className={styles.chatIco} />
    </button>
    
  );
};

export default ChatBtn;
