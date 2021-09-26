import { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { setImportantNotification, setVotingNotification } from '../redux/actions/notifications';
import { updateUserAction } from '../redux/actions/user';
import { socket, USER_IS_KICKED, YOU_ARE_KICKED } from '../services/constants';
import { ImportantNotifications } from '../types/notifications';

interface UserKickProps {
  updateUserAction: CallableFunction;
  setVotingNotification: CallableFunction;
  setImportantNotification: CallableFunction;
}

const UserKick: FunctionComponent<UserKickProps> = (
  {
    updateUserAction: updateUser,
    setVotingNotification: setStartVoting,
    setImportantNotification: setNewImportantNotification,
  },
): ReactElement => {
  useEffect(() => {
    socket.on(USER_IS_KICKED, ({ kickInitiator, kickedUserId, kickedUser }) => {
      updateUser({ userId: kickedUserId, user: kickedUser });
      setStartVoting({ kickInitiator, kickedUserId });
    });

    socket.on(YOU_ARE_KICKED, ({ kickInitiator, kickedUserId, kickedUser }) => {
      updateUser({ userId: kickedUserId, user: kickedUser });
      setNewImportantNotification(ImportantNotifications.kick);
    });
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, {
  updateUserAction,
  setVotingNotification,
  setImportantNotification,
})(UserKick);
