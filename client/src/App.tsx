import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import {
  Switch, Route, withRouter, RouteComponentProps, useLocation, 
} from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
import MainPage from './pages/MainPage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/Settings';
import ErrorPage from './pages/ErrorPage';
import {
  GAME_STATUS_CHANGED,
  RECEIVE_MESSAGE, 
  socket, 
  USER_CONNECTED, 
  USER_IS_DELETED, 
  USER_IS_KICKED, 
  USER_IS_NOT_DELETED, 
  YOU_ARE_DELETED, 
  YOU_ARE_KICKED, 
  YOU_ARE_NOT_DELETED, 
} from './services/constants';
import { AppDispatch } from './redux/store';
import { UserData } from './types/user';
import { Message } from './types/messages';
import { updateUser } from './redux/actions/user';
import { setMessageOnResponse } from './redux/actions/messages';
import { setCommonNotification, setImportantNotification, setVotingNotification } from './redux/actions/notifications';
import {
  CommonNotification, CommonNotificationAction, ImportantNotifications, VotingData, 
} from './types/notifications';
import GoodbyePage from './pages/GoodbyePage';
import { Pages } from './types/page';
import { createCommonNotificationAboutUser } from './helpers/commonNotifications';
import { redirectToGamePage, redirectToGoodbyePage, redirectToMainPage } from './shared';
import { GameStatus } from './types/room';
import { setGameStatus } from './redux/actions/game';
import { useQuery } from './helpers/query';
import Context from './helpers/context';

interface AppProps extends RouteComponentProps {
  setUser: any;
  setMessage: any;
  updateUser: any;
  setVoting: any;
  setImportantNotification: any;
  history: History;
  setCommonNotification: any;
  updateGameStatusAction: any;
}

const App: FunctionComponent<AppProps> = ({ 
  setUser: setNewUser, 
  setMessage: setNewMessage, 
  updateUser: updateUserStatus, 
  setVoting: setStartVoting,
  setImportantNotification: setNewImportantNotification,
  setCommonNotification: setNewCommonNotification,
  updateGameStatusAction: updateGameStatus,
  history,
}): ReactElement => {
  useEffect(() => {
    socket.on(USER_CONNECTED, (data) => {
      setNewUser(data);
      const notificationData = createCommonNotificationAboutUser(
        data, 
        CommonNotificationAction.connect,
      );
      setNewCommonNotification(notificationData);
    });
    socket.on(RECEIVE_MESSAGE, setNewMessage);
    socket.on(USER_IS_KICKED, ({ kickInitiator, kickedUserId, kickedUser }) => {
      updateUserStatus({ userId: kickedUserId, user: kickedUser });
      setStartVoting({ kickInitiator, kickedUserId });
    });
    socket.on(YOU_ARE_KICKED, ({ kickInitiator, kickedUserId, kickedUser }) => {
      updateUserStatus({ userId: kickedUserId, user: kickedUser });
      setNewImportantNotification(ImportantNotifications.kick);
    });
    socket.on(USER_IS_DELETED, (data) => {
      updateUserStatus(data);
      const notificationData = createCommonNotificationAboutUser(
        data, 
        CommonNotificationAction.deleted,
      );
      setNewCommonNotification(notificationData);
    });
    socket.on(USER_IS_NOT_DELETED, (data) => {
      updateUserStatus(data);
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
      updateUserStatus(data);
    });
    socket.on(GAME_STATUS_CHANGED, (data) => {
      updateGameStatus(data);
      if (data === GameStatus.canceled) {
        setNewImportantNotification(ImportantNotifications.gameCanceled);
      }
      if (data === GameStatus.inProgress) {
        redirectToGamePage();
      }
    });
  }, []);

  const roomId = useQuery();

  const routes = [
    {
      path: '/',
      component: 
  <Context.Provider value={roomId}>
    <MainPage />
  </Context.Provider>, 
      key: 'main', 
    },
    { path: `/${Pages.game}`, component: <GamePage />, key: 'game' },
    { path: `/${Pages.settings}`, component: <SettingsPage />, key: 'settings' },
    { path: `/${Pages.lobby}`, component: <LobbyPage />, key: 'lobby' },
    { path: `/${Pages.goodbye}`, component: <GoodbyePage />, key: 'goodbye' },
    { path: '/*', component: <ErrorPage />, key: 'error' },
  ];

  return (
    <Switch>
      {routes.map(({ path, component, key }) => (
        <Route exact={key === 'main'} path={(key === 'main') ? (path || '/?roomId=roomId') : path} key={key}>
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
  setImportantNotification: (content: string) => dispatch(setImportantNotification(content)),
  setCommonNotification: (notification: CommonNotification) => dispatch(setCommonNotification(notification)),
  updateGameStatusAction: (status: keyof typeof GameStatus) => dispatch(setGameStatus(status)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));
