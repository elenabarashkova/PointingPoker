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
import { setMessage, setUser } from './redux/actions';
import { Message } from './types/messages';

interface AppProps extends RouteComponentProps {
  setUser: CallableFunction;
  setMessage: CallableFunction;
}

const App: FunctionComponent<AppProps> = ({ setUser: setNewUser, setMessage: setNewMessage }): ReactElement => {
  useEffect(() => {
    socket.on('USER_CONNECTED', (data) => {
      setNewUser(data);
    });
    socket.on('RECEIVE_MESSAGE', (data) => {
      setNewMessage(data);
    });
  }, [setNewUser, setNewMessage]);

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
});

export default connect(null, mapDispatchToProps)(withRouter(App));
