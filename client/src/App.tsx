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
import TooLatePage from './pages/TooLatePage';
import {
  setAllGameSettings, setGameStatus, setTitle, startRoundAction, stopRound, 
} from './redux/actions/game';
import {
  addIssueAction,
  deleteIssueAction,
  setIssuesAction,
  updateIssueAction,
} from './redux/actions/issues';
import { setMessageOnResponse, setMessages } from './redux/actions/messages';
import {
  setAdmitRejectUser,
  setCommonNotification,
  setImportantNotification,
  setVotingNotification,
} from './redux/actions/notifications';
import { setRoomIdAction } from './redux/actions/room';
import { setCurrentUserAction, setUsersAction, updateUser } from './redux/actions/user';
import {
  initVoting, setFinalVoteAction, setUserVote, setVotingStatistics, 
} from './redux/actions/voting';
import { AppDispatch } from './redux/store';
import {
  ACCESS_CONFIRMATION_RESPONSE,
  CONFIRM_ACCESS,
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
  GAME_TITLE_CHANGED,
  GAME_SETTINGS_CHANGED,
} from './services/constants';
import {
  redirectToGamePage, redirectToGoodbyePage, redirectToSettings, redirectToTooLatePage, 
} from './shared';
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
import { GameSettings, GameStatus, Room } from './types/room';
import { User, UserData, Users } from './types/user';
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
  initVoting: any;
  setAdmitRejectNotification: any;
  /** */
  setUsersAction;
  setCurrentUserAction;
  setRoomIdAction;
  setAllGameSettingsAction;
  setMessagesAction;
  setTitleAction;
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
  initVoting: initRoundVoting,
  setAdmitRejectNotification: setAdmitRejectUserNotification,
  /** */
  setUsersAction: setUsers,
  setCurrentUserAction: setCurrentUser,
  setRoomIdAction: setRoomId,
  setAllGameSettingsAction: setGameSettings,
  setMessagesAction: setAllMessages,
  setTitleAction: setGameTitle,
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
        initRoundVoting(currentIssueId);
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
    socket.on(CONFIRM_ACCESS, (data) => {
      setAdmitRejectUserNotification(data);
    });
    socket.on(ACCESS_CONFIRMATION_RESPONSE, (data) => {
      if (data.confirmation) {
        const { room, roomId, userId } = data;
        const {
          users, messages, issues, gameStatus, gameSettings, gameTitle,
        } = room as Room;
       
        setUsers(users);
        setCurrentUser(userId);
        setRoomId(roomId);
        setGameSettings(gameSettings);
        setAllMessages(messages);
        setGameTitle(gameTitle);
        updateGameStatus(gameStatus);
        setIssues(issues);
        // данные о голосовании
        redirectToGamePage();
      } else {
        redirectToTooLatePage();
      }
    });
  }, []);
  socket.on(GAME_TITLE_CHANGED, setGameTitle);
  socket.on(GAME_SETTINGS_CHANGED, setGameSettings);
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
  initVoting: (issueId: string) => dispatch(initVoting(issueId)),
  setAdmitRejectNotification: (userData: UserData) => dispatch(setAdmitRejectUser(userData)),

  setUsersAction: (users: Users) => dispatch(setUsersAction(users)),
  setCurrentUserAction: (userId: string) => dispatch(setCurrentUserAction(userId)),
  setRoomIdAction: (roomId: string) => dispatch(setRoomIdAction(roomId)),
  setAllGameSettingsAction: (gameSettings: GameSettings) => dispatch(setAllGameSettings(gameSettings)),
  setMessagesAction: (messages: Message[]) => dispatch(setMessages(messages)),
  setTitleAction: (gameTitle: string) => dispatch(setTitle(gameTitle)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));
