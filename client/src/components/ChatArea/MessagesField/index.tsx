import React, { ReactElement } from 'react';
import { ElementSize } from 'src/types/additional';
import UserCard from 'components/shared/UserCard';
import { User, UserRole, Users } from 'src/types/user';
import { connect } from 'react-redux';
import styles from './style.module.scss';

interface MessagesFieldProps {
  isLoading: boolean;
  serverError: boolean;
  messages: any;
  users: Users;
  currentUserId: string;
}

// export interface User {
//   name: string;
//   role: keyof typeof UserRole;
//   jobPosition: string;
//   image: string;
//   status?: keyof typeof UserStatus;
// }

const MessagesField: React.FC<MessagesFieldProps> = ({
  isLoading, serverError, messages, users, currentUserId, 
}): ReactElement => {
  console.log('messages:', messages);
  console.log('messFiels', currentUserId);
  
  return (
    <div className={styles.messagesField}>
      {!messages.length 
        ? <p>No messages</p> 
        : messages.map(({ userId, text, messageId }) => (
          <div className={styles.messageField} key={messageId}>
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

const mapStateToProps = (state) => ({
  isLoading: state.messages.isLoading,
  serverError: state.messages.error,
  messages: state.messages.messages,
  users: state.users,
  currentUserId: state.currentUserId,
});

export default connect(mapStateToProps)(MessagesField);
