import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ChatButton from 'components/shared/buttons/ChatButton';
import { CSSTransition } from 'react-transition-group';
import Chat from 'components/ChatArea/Chat';
import { RootState } from 'src/redux/reducers';
import { Message } from 'src/types/messages';
import useTypedSelector from 'src/hooks/useTypedSelector';
import styles from './style.module.scss';
import './transition.scss';

interface ChatFieldProps {
  messages: Message[];
}

const ChatField: React.FC<ChatFieldProps> = ({ messages }): ReactElement => {
  const [chatIsOpened, setChatIsOpened] = useState(false);
  const [notShownMessages, setNotShownMessages] = useState(false);

  const currentUserId = useTypedSelector((state) => state.currentUserId);

  useEffect(() => {
    if (!messages.length) {
      return;
    }

    const lastMessage = messages[messages.length - 1];
    const currentUserIsNotAuthor = lastMessage.userId !== currentUserId;

    if (!chatIsOpened && currentUserIsNotAuthor) {
      setNotShownMessages(true);
    }
    // eslint-disable-next-line
  }, [messages]);

  const openCloseChat = () => {
    if (!chatIsOpened && notShownMessages) {
      setNotShownMessages(false);
    }
    setChatIsOpened((prev) => !prev);
  }; 

  const addChatClass = (chatIsOpened) ? 'chatIsOpened' : ''; 

  return (
    <div
      className={`${styles.chatField} ${styles[addChatClass]}`} 
      onClick={() => { if (chatIsOpened) { setChatIsOpened(false); } }} 
      aria-hidden="true"
    >
      <ChatButton openCloseChat={openCloseChat} notShownMessages={notShownMessages} />
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

const mapStateToProps = (state: RootState) => ({
  messages: state.messages.messages,
});

export default connect(mapStateToProps)(ChatField);
