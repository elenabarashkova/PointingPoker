import React, { ReactElement } from 'react';
import { ElementSize } from 'src/types/additional';
import UserCard from 'components/shared/UserCard';
import { UserRole } from 'src/types/user';
import styles from './style.module.scss';

const MessagesField: React.FC = (): ReactElement => {
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
    
  );
};

export default MessagesField;
