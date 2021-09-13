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
import { socket } from './services/constants';
import { AppDispatch } from './redux/store';
import { UserData } from './types/user';
import { Message } from './types/messages';
import { setUser } from './redux/actions/user';
import { setMessage } from './redux/actions/messages';

interface AppProps extends RouteComponentProps {
  setUser: CallableFunction;
  setMessage: CallableFunction;
  setUserDeleted: CallableFunction;
}

const App: FunctionComponent<AppProps> = ({ setUser: setNewUser, setMessage: setNewMessage, setUserDeleted: setUserDeletedStatus }): ReactElement => {
  useEffect(() => {
    socket.on('USER_CONNECTED', (data) => {
      setNewUser(data);
    });
    socket.on('RECEIVE_MESSAGE', (data) => {
      setNewMessage(data);
    });
    socket.on('USER_IS_DELETED', (data) => {
      setUserDeletedStatus(data);
    });
    socket.on('YOU_ARE_DELETED', (data) => {
      // setUserDeletedStatus(data);
      // todo: перенаправить на другую страницу?
    });
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route path="/game">
        <GamePage />
      </Route>
      <Route path="/settings">
        <SettingsPage />
      </Route>
      <Route path="/lobby">
        <LobbyPage />
      </Route>
      <Route path={'/*'}>
        <ErrorPage />
      </Route>
    </Switch>
   
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setUser: (userData: UserData) => dispatch(setUser(userData)),
  setMessage: (message: Message) => dispatch(setMessage(message)),
  setUserDeleted: (userData: UserData) => dispatch(setUser(userData)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));
