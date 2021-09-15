import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import {
  Switch, Route, withRouter, RouteComponentProps, 
} from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from './pages/MainPage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/Settings';
import ErrorPage from './pages/ErrorPage';
import {
  RECEIVE_MESSAGE, socket, USER_CONNECTED, USER_IS_DELETED, USER_IS_KICKED, USER_IS_NOT_DELETED, YOU_ARE_DELETED, YOU_ARE_KICKED, YOU_ARE_NOT_DELETED, 
} from './services/constants';
import { AppDispatch } from './redux/store';
import { UserData } from './types/user';
import { Message } from './types/messages';
import { updateUser } from './redux/actions/user';
import { setMessageOnResponse } from './redux/actions/messages';
import { setVotingNotification } from './redux/actions/notifications';
import { VotingData } from './types/notifications';

interface AppProps extends RouteComponentProps {
  setUser: any;
  setMessage: any;
  updateUser: any;
  setVoting: any;
}

const App: FunctionComponent<AppProps> = ({ 
  setUser: setNewUser, 
  setMessage: setNewMessage, 
  updateUser: updateUserStatus, 
  setVoting: setStartVoting,
}): ReactElement => {
  useEffect(() => {
    socket.on(USER_CONNECTED, setNewUser);
    // todo: common_notification
    socket.on(RECEIVE_MESSAGE, setNewMessage);
    socket.on(USER_IS_KICKED, ({ kickInitiator, kickedUserId, kickedUser }) => {
      updateUserStatus({ userId: kickedUserId, user: kickedUser });
      setStartVoting({ kickInitiator, kickedUserId });
    });
    socket.on(YOU_ARE_KICKED, ({ kickInitiator, kickedUserId, kickedUser }) => {
      updateUserStatus({ userId: kickedUserId, user: kickedUser });
      // todo: important-notification
    });
    socket.on(USER_IS_DELETED, (data) => {
      console.log('USER_IS_DELETED data', data);
      updateUserStatus(data);
    });
    // todo: common_notification
    socket.on(USER_IS_NOT_DELETED, (data) => {
      console.log('USER_IS_NOT_DELETED data', data);
      updateUserStatus(data);
    });
    // todo: common_notif
    socket.on(YOU_ARE_DELETED, (data) => {
      // setUserDeletedStatus(data);
      // todo: перенаправить на другую страницу?
      // todo: important_notification
    });
    socket.on(YOU_ARE_NOT_DELETED, updateUserStatus);
    // todo: important_notif
  }, []);

  const routes = [
    { path: '/', component: <MainPage />, key: 'main' },
    { path: '/game', component: <GamePage />, key: 'game' },
    { path: '/settings', component: <SettingsPage />, key: 'settings' },
    { path: '/lobby', component: <LobbyPage />, key: 'lobby' },
    { path: '/*', component: <ErrorPage />, key: 'error' },
  ];

  return (
    <Switch>
      {routes.map(({ path, component, key }) => (
        <Route path={path} exact={key === 'main'} key={key}>
          {component}
        </Route>
      ))}
    </Switch>
   
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setUser: (userData: UserData) => dispatch(updateUser(userData)),
  setMessage: (message: Message) => dispatch(setMessageOnResponse(message)),
  updateUser: (userData: UserData) => dispatch(updateUser(userData)),
  setVoting: (data: VotingData) => dispatch(setVotingNotification(data)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));
