import React, { ReactElement, useState } from 'react';
import { ElementSize } from 'src/types/additional';
import UserCard from 'components/shared/UserCard';
import { UserRole } from 'src/types/user';
import ChatBtn from 'components/shared/buttons/ChatBtn';
import SendMessageButton from 'components/shared/buttons/SendMessageButton';
import Textarea from 'components/Textarea';
import { CSSTransition } from 'react-transition-group';
import styles from './style.module.scss';
import './transition.scss';

const ChatField: React.FC = (): ReactElement => {
  const [messageInput, setMessageInput] = useState('');
  const [chatIsOpened, setChatIsOpened] = useState(false);

  const handleTextArea = (value: string) => {
    setMessageInput(value); 
    console.log(value);
  };

  const openCloseChat = () => {
    setChatIsOpened((prev) => !prev);
  }; 

  const handleSendMessage = () => {
    console.log('отправить сообщение');
  };

  // todo: нажал отправить - меняем status
  // todo: пришел ответ - меняем status; мессeдж -> стор

  // todo: ошибку отображать возле input ?

  // messages должны приходить с id ?????

  // todo: валидация инпута

  const messages = [{
    text: 'string',
    userId: 'string', 
  }, {
    text: 'string',
    userId: 'string', 
  }, {
    text: 'string',
    userId: 'string', 
  }];

  const id = [1, 2, 3];

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
        <div className={styles.chat}>
          <div className={styles.messagesField}>
            {messages.map(({ text, userId }, index) => (
              <div className={styles.messageField} key={id[index]}>
                <p className={styles.message}>{text}</p>
                <UserCard
                  user={{
                    name: 'string string',
                    role: UserRole.player,
                    jobPosition: 'string string',
                    image: '', 
                  }}
                  id={userId}
                  currentUserId="1"
                  size={ElementSize.small}
                />
              </div>
            ))}
          </div>
          <div className={styles.sendMessageField}>
            <Textarea
              value={messageInput} 
              onChange={handleTextArea} 
              placeholder="Print your message here"
            />
            <SendMessageButton onClick={handleSendMessage} />
          </div>
        </div>
      </CSSTransition>
      
    </div>
    
  );
};

export default ChatField;
