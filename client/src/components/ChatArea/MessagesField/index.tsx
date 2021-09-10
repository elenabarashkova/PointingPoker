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

  const messagesKeys = Object.keys(messages);
  return (
    <div className={styles.messagesField}>
      {!messagesKeys.length 
        ? <p>No messages</p> 
        : messagesKeys.map((messageKey) => {
          const { userId, text } = messages[messageKey];

          return (
            <div className={styles.messageField} key={messageKey}>
              <p className={styles.message}>{text}</p>
              <UserCard
                user={users[userId]}
                id={userId}
                currentUserId={currentUserId}
                size={ElementSize.small}
              />
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.messages.isLoading,
  serverError: state.messages.error,
  messages: state.messages.messages,
  users: state.users,
  currentUserId: state.currentUser,
});

export default connect(mapStateToProps)(MessagesField);
