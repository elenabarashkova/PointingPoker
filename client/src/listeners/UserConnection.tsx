import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { createCommonNotificationAboutUser } from '../helpers/commonNotifications';
import { setCommonNotification, setImportantNotification } from '../redux/actions/notifications';
import { setUsersAction, updateUserAction } from '../redux/actions/user';
import {
  MASTER_DISCONNECTED,
  socket,
  USER_CONNECTED,
  USER_DISCONNECTED,
  USER_LEFT,
} from '../services/constants';
import { redirectToGoodbyePage } from '../shared';
import { CommonNotificationAction, ImportantNotifications } from '../types/notifications';

interface UserConnectionProps {
  updateUserAction: CallableFunction;
  setImportantNotification: CallableFunction;
  setCommonNotification: CallableFunction;
}

const UserConnection: FunctionComponent<UserConnectionProps> = (
  {
    updateUserAction: updateUser,
    setImportantNotification: setNewImportantNotification,
    setCommonNotification: setNewCommonNotification,
  },
): ReactElement => {
  useEffect(() => {
    socket.on(USER_CONNECTED, (data) => {
      updateUser(data);
      const notificationData = createCommonNotificationAboutUser(
        data,
        CommonNotificationAction.connect,
      );
      setNewCommonNotification(notificationData);
    });

    socket.on(USER_LEFT, (data) => {
      updateUser(data);
      const notificationData = createCommonNotificationAboutUser(
        data,
        CommonNotificationAction.left,
      );
      setNewCommonNotification(notificationData);
    });

    socket.on(USER_DISCONNECTED, ({ disconnectedUserId, disconnectedUser }) => {
      const disconnectedUserData = { userId: disconnectedUserId, user: disconnectedUser };
      updateUser(disconnectedUserData);
      const notificationData = createCommonNotificationAboutUser(
        disconnectedUserData,
        CommonNotificationAction.disconnected,
      );
      setNewCommonNotification(notificationData);
    });

    socket.on(MASTER_DISCONNECTED, ({ disconnectedUserId, disconnectedUser }) => {
      const disconnectedUserData = { userId: disconnectedUserId, user: disconnectedUser };
      updateUser(disconnectedUserData);
      setNewImportantNotification(ImportantNotifications.masterDisconnected);
      setTimeout(() => {
        redirectToGoodbyePage();
      }, 5000);
    });
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, {
  updateUserAction,
  setImportantNotification,
  setCommonNotification,
})(UserConnection);
