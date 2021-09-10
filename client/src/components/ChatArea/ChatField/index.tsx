import React, { ReactElement, useState } from 'react';
import ChatBtn from 'components/shared/buttons/ChatBtn';
import { CSSTransition } from 'react-transition-group';
import Chat from 'components/ChatArea/Chat';
import styles from './style.module.scss';
import './transition.scss';

const ChatField: React.FC = (): ReactElement => {
  const [chatIsOpened, setChatIsOpened] = useState(false);

  const openCloseChat = () => {
    setChatIsOpened((prev) => !prev);
  }; 

  return (
    <div className={styles.chatField}>
      <ChatBtn openCloseChat={openCloseChat} />
      <CSSTransition 
        in={chatIsOpened}
        timeout={400}
        classNames={{
          enterActive: 'chat-show',
          enterDone: 'chat-active',
          exitActive: 'chat-exit',
        }}
        unmountOnExit
      >
        <Chat />
      </CSSTransition>
    </div>
  );
};

export default ChatField;
