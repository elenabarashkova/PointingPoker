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
  RECEIVE_MESSAGE, socket, USER_CONNECTED, USER_IS_DELETED, YOU_ARE_DELETED, 
} from './services/constants';
import { AppDispatch } from './redux/store';
import { UserData } from './types/user';
import { Message } from './types/messages';
import { setUser } from './redux/actions/user';
import { setMessageOnResponse } from './redux/actions/messages';

interface AppProps extends RouteComponentProps {
  setUser: any;
  setMessage: any;
  setUserDeleted: any;
}

const App: FunctionComponent<AppProps> = ({ 
  setUser: setNewUser, 
  setMessage: setNewMessage, 
  setUserDeleted: setUserDeletedStatus, 
}): ReactElement => {
  useEffect(() => {
    socket.on(USER_CONNECTED, setNewUser);
    socket.on(RECEIVE_MESSAGE, setNewMessage);
    socket.on(USER_IS_DELETED, setUserDeletedStatus);
    socket.on(YOU_ARE_DELETED, (data) => {
      // setUserDeletedStatus(data);
      // todo: перенаправить на другую страницу?
    });
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
  setUser: (userData: UserData) => dispatch(setUser(userData)),
  setMessage: (message: Message) => dispatch(setMessageOnResponse(message)),
  setUserDeleted: (userData: UserData) => dispatch(setUser(userData)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));
