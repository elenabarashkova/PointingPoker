import React, { FunctionComponent, ReactElement } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/Settings';
import ErrorPage from './pages/ErrorPage';

const App: FunctionComponent = (): ReactElement => (
  
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

export default withRouter(App);
