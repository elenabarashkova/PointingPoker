import React, { ReactElement } from 'react';
import { ElementSize } from 'src/types/additional';
import UserCard from 'components/shared/UserCard';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { RootState } from 'src/redux/reducers';
import { Message } from 'src/types/messages';
import styles from './style.module.scss';

interface MessagesFieldProps {
  messages: Message[];
}

const MessagesField: React.FC<MessagesFieldProps> = ({ messages }): ReactElement => {
  const currentUserId = useTypedSelector((state) => state.currentUserId);
  const users = useTypedSelector((state) => state.users);
  return (
    <div className={styles.messagesField}>
      {!messages.length 
        ? <p>No messages</p> 
        : messages.map(({ userId, text, messageId }) => (
          <div className={`${styles.messageField} ${currentUserId === userId && styles.currentUser}`} key={messageId}>
            <p className={styles.message}>{text}</p>
            <UserCard
              user={users[userId]}
              id={userId}
              currentUserId={currentUserId}
              size={ElementSize.small}
            />
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  messages: state.messages.messages,
});

export default connect(mapStateToProps)(MessagesField);
