import { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { createCommonNotificationAboutUserKicking } from 'src/helpers/commonNotifications';
import {
  setCommonNotification,
  setImportantNotification,
  setVotingNotification,
} from '../redux/actions/notifications';
import { updateUserAction } from '../redux/actions/user';
import {
  KICK_VOTING_ERROR, socket, USER_IS_KICKED, YOU_ARE_KICKED,
} from '../services/constants';
import { ImportantNotifications } from '../types/notifications';

interface UserKickProps {
  updateUserAction: CallableFunction;
  setVotingNotification: CallableFunction;
  setImportantNotification: CallableFunction;
  setCommonNotification: CallableFunction;
}

const UserKickListener: FunctionComponent<UserKickProps> = ({
  updateUserAction: updateUser,
  setVotingNotification: setStartVoting,
  setImportantNotification: setNewImportantNotification,
  setCommonNotification: setNotification,
}): ReactElement => {
  useEffect(() => {
    socket.on(USER_IS_KICKED, ({ kickInitiator, kickedUserId, kickedUser }) => {
      updateUser({ userId: kickedUserId, user: kickedUser });
      setStartVoting({ kickInitiator, kickedUserId });
    });

    socket.on(YOU_ARE_KICKED, ({ kickedUserId, kickedUser }) => {
      updateUser({ userId: kickedUserId, user: kickedUser });
      setNewImportantNotification(ImportantNotifications.kick);
    });

    socket.on(KICK_VOTING_ERROR, ({ userId, user }) => {
      updateUser({ userId, user });
      const notification = createCommonNotificationAboutUserKicking(user.name);
      setNotification(notification);
    });

    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, {
  updateUserAction,
  setVotingNotification,
  setImportantNotification,
  setCommonNotification,
})(UserKickListener);
