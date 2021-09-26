import React, { FunctionComponent, ReactElement, useMemo } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Context from './helpers/context';
import { useQuery } from './helpers/query';
import ErrorPage from './pages/ErrorPage';
import GamePage from './pages/GamePage';
import GoodbyePage from './pages/GoodbyePage';
import LobbyPage from './pages/LobbyPage';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/Settings';
import TooLatePage from './pages/TooLatePage';
import { Pages } from './types/page';
import GameListener from './listeners/GameListener';
import UserDeleteListener from './listeners/UserDeleteListener';
import RoundStatusListener from './listeners/RoundStatusListener';
import UserConnectionListener from './listeners/UserConnectionListener';
import UserKickListener from './listeners/UserKickListener';
import IssuesListener from './listeners/IssuesListener';
import NewUserAccessListener from './listeners/NewUserAccessListener';
import VotingListener from './listeners/VotingListener';

const App: FunctionComponent = (): ReactElement => {
  useMemo(() => {
    const shouldRedirectToMain = window.location.pathname !== '/';
    if (shouldRedirectToMain) {
      window.location.href = window.location.origin;
    }
  }, []);

  const roomId = useQuery();

  const routes = [
    {
      path: '/',
      component: (
        <Context.Provider value={roomId}>
          <MainPage />
        </Context.Provider>
      ),
      key: 'main',
    },
    { path: `/${Pages.game}`, component: <GamePage />, key: 'game' },
    { path: `/${Pages.settings}`, component: <SettingsPage />, key: 'settings' },
    { path: `/${Pages.lobby}`, component: <LobbyPage />, key: 'lobby' },
    { path: `/${Pages.goodbye}`, component: <GoodbyePage />, key: 'goodbye' },
    { path: `/${Pages.tooLate}`, component: <TooLatePage />, key: 'tooLate' },
    { path: '/*', component: <ErrorPage />, key: 'error' },
  ];

  return (
    <>
      <Switch>
        {routes.map(({ path, component, key }) => (
          <Route
            exact={key === 'main'}
            path={key === 'main' ? path || '/?roomId=roomId' : path}
            key={key}
          >
            {component}
          </Route>
        ))}
      </Switch>
      <>
        <UserConnectionListener />
        <UserKickListener />
        <UserDeleteListener />
        <GameListener />
        <RoundStatusListener />
        <IssuesListener />
        <NewUserAccessListener />
        <VotingListener />
      </>
    </>
  );
};

export default (withRouter(App));
