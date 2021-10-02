import { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { createCommonNotificationAboutUser } from '../helpers/commonNotifications';
import { setCommonNotification, setImportantNotification } from '../redux/actions/notifications';
import { updateUserAction } from '../redux/actions/user';
import {
  socket,
  USER_IS_DELETED,
  USER_IS_NOT_DELETED,
  YOU_ARE_DELETED,
  YOU_ARE_NOT_DELETED,
} from '../services/constants';
import { redirectToGoodbyePage } from '../shared/redirect';
import { CommonNotificationAction, ImportantNotifications } from '../types/notifications';

interface UserDeleteProps {
  updateUserAction: CallableFunction;
  setImportantNotification: CallableFunction;
  setCommonNotification: CallableFunction;
}

const UserDeleteListener: FunctionComponent<UserDeleteProps> = (
  {
    updateUserAction: updateUser,
    setImportantNotification: setNewImportantNotification,
    setCommonNotification: setNewCommonNotification,
  },
): ReactElement => {
  useEffect(() => {
    socket.on(USER_IS_DELETED, (data) => {
      updateUser(data);
      const notificationData = createCommonNotificationAboutUser(
        data,
        CommonNotificationAction.deleted,
      );
      setNewCommonNotification(notificationData);
    });

    socket.on(USER_IS_NOT_DELETED, (data) => {
      updateUser(data);
      const notificationData = createCommonNotificationAboutUser(
        data,
        CommonNotificationAction.isNotDeleted,
      );
      setNewCommonNotification(notificationData);
    });

    socket.on(YOU_ARE_DELETED, () => {
      redirectToGoodbyePage();
    });

    socket.on(YOU_ARE_NOT_DELETED, (data) => {
      setNewImportantNotification(ImportantNotifications.notDeleted);
      updateUser(data);
    });
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, {
  updateUserAction,
  setImportantNotification,
  setCommonNotification,
})(UserDeleteListener);
