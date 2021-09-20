import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Route, RouteComponentProps, Switch, withRouter, 
} from 'react-router-dom';
import { createCommonNotificationAboutUser } from './helpers/commonNotifications';
import Context from './helpers/context';
import { useQuery } from './helpers/query';
import ErrorPage from './pages/ErrorPage';
import GamePage from './pages/GamePage';
import GoodbyePage from './pages/GoodbyePage';
import LobbyPage from './pages/LobbyPage';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/Settings';
import { setGameStatus, startRoundAction, stopRound } from './redux/actions/game';
import {
  addIssueAction,
  deleteIssueAction,
  setIssuesAction,
  updateIssueAction,
} from './redux/actions/issues';
import { setMessageOnResponse } from './redux/actions/messages';
import {
  setCommonNotification,
  setImportantNotification,
  setVotingNotification,
} from './redux/actions/notifications';
import { updateUser } from './redux/actions/user';
import { setFinalVoteAction, setUserVote, setVotingStatistics } from './redux/actions/voting';
import { AppDispatch } from './redux/store';
import {
  Events,
  GAME_STATUS_CHANGED,
  RECEIVE_MESSAGE,
  socket,
  USER_CONNECTED,
  USER_HAS_VOTED,
  USER_IS_DELETED,
  USER_IS_KICKED,
  USER_IS_NOT_DELETED,
  USER_LEFT,
  YOU_ARE_DELETED,
  YOU_ARE_KICKED,
  YOU_ARE_NOT_DELETED,
} from './services/constants';
import { redirectToGamePage, redirectToGoodbyePage } from './shared';
import { StartRoundData } from './types/game';
import { IssueData, Issues } from './types/issues';
import { Message } from './types/messages';
import {
  CommonNotification,
  CommonNotificationAction,
  ImportantNotifications,
  VotingData,
} from './types/notifications';
import { Pages } from './types/page';
import { GameStatus } from './types/room';
import { UserData } from './types/user';
import { FinalVoteData, StatisticsData, UserVotingData } from './types/voting';

interface AppProps extends RouteComponentProps {
  setUser: any;
  setMessage: any;
  updateUser: any;
  setVoting: any;
  setImportantNotification: any;
  setCommonNotification: any;
  updateGameStatusAction: any;
  setIssues: any;
  startRound: any;
  addIssue: any;
  deleteIssue: any;
  updateIssue: any;
  setUserVote: any;
  setFinalVote: any;
  stopRound: any;
  setVotingStatistics: any;
}

const App: FunctionComponent<AppProps> = ({
  setUser: setNewUser,
  setMessage: setNewMessage,
  updateUser: updateUserStatus,
  setVoting: setStartVoting,
  setImportantNotification: setNewImportantNotification,
  setCommonNotification: setNewCommonNotification,
  updateGameStatusAction: updateGameStatus,
  setIssues,
  startRound,
  addIssue,
  deleteIssue,
  updateIssue,
  setFinalVote,
  setUserVote: setNewUserVote,
  stopRound: stopGameRound,
  setVotingStatistics: setCommonVotingStatistics,
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
    socket.on(USER_LEFT, (data) => {
      updateUserStatus(data);
      const notificationData = createCommonNotificationAboutUser(
        data,
        CommonNotificationAction.left,
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
      if (data === GameStatus.active) {
        redirectToGamePage();
      }
    });

    socket.on(Events.roundIsStarted, ({ currentIssueId, issues, roundIsActive }) => {
      if (issues) {
        setIssues(issues);
        startRound({ currentIssueId, roundIsActive });
      }
    });

    socket.on(Events.issueHasBeenAdded, (issueData) => addIssue(issueData));
    socket.on(Events.issueHasBeenDeleted, (issueId) => deleteIssue(issueId));
    socket.on(Events.issueHasBeenUpdated, (issueData) => updateIssue(issueData));
    socket.on(Events.finalVote, (finalVote) => setFinalVote(finalVote));
    
    socket.on(Events.roundIsFinished, ({ roundIsActive, issueId, issue }) => {
      stopGameRound(roundIsActive);
      setCommonVotingStatistics({ issueId, statistics: issue.statistics });
    });

    socket.on(USER_HAS_VOTED, setNewUserVote);
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
    { path: '/*', component: <ErrorPage />, key: 'error' },
  ];

  return (
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
  setIssues: (issues: Issues) => dispatch(setIssuesAction(issues)),
  startRound: (roundData: StartRoundData) => dispatch(startRoundAction(roundData)),
  addIssue: (issue: IssueData) => dispatch(addIssueAction(issue)),
  deleteIssue: (issueId: string) => dispatch(deleteIssueAction(issueId)),
  updateIssue: (issue: IssueData) => dispatch(updateIssueAction(issue)),
  setUserVote: (votingData: UserVotingData) => dispatch(setUserVote(votingData)),
  setFinalVote: (finalVote: FinalVoteData) => dispatch(setFinalVoteAction(finalVote)),
  stopRound: (roundIsActive: boolean) => dispatch(stopRound(roundIsActive)),
  setVotingStatistics: (statisticsData: StatisticsData) => dispatch(setVotingStatistics(statisticsData)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));
