import React, { FunctionComponent, ReactElement } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/Settings';

const App: FunctionComponent = (): ReactElement => (
  
  <Switch>
    <Route path="/game">
      <GamePage />
    </Route>
    <Route path="/settings">
      <SettingsPage />
    </Route>
    <Route path="/lobby">
      <LobbyPage />
    </Route>
    <Route path="/">
      <MainPage />
    </Route>
  </Switch>
   
);

export default withRouter(App);
