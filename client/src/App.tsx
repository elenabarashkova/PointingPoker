import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useMemo,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import Context from './helpers/context';
import { useQuery } from './helpers/query';
import { setRoomData } from './helpers/setRoomData';
import ErrorPage from './pages/ErrorPage';
import GamePage from './pages/GamePage';
import GoodbyePage from './pages/GoodbyePage';
import LobbyPage from './pages/LobbyPage';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/Settings';
import TooLatePage from './pages/TooLatePage';
import {
  setAllGameSettings,
  setGameStatus,
  setTitle,
  startRoundAction,
  stopRound,
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
import { setCurrentUserAction, setUsersAction, updateUserAction } from './redux/actions/user';
import {
  initVoting,
  setFinalVoteAction,
  setUserVote,
  setVotingStatistics,
} from './redux/actions/voting';
import { AppDispatch } from './redux/store';
import {
  ACCESS_CONFIRMATION_RESPONSE,
  CONFIRM_ACCESS,
  Events,
  GAME_SETTINGS_CHANGED,
  GAME_STATUS_CHANGED,
  GAME_TITLE_CHANGED,
  MASTER_DISCONNECTED,
  RECEIVE_MESSAGE,
  socket,
  USER_CONNECTED,
  USER_DISCONNECTED,
  USER_HAS_VOTED,
  USER_IS_DELETED,
  USER_IS_KICKED,
  USER_IS_NOT_DELETED,
  USER_LEFT,
  YOU_ARE_DELETED,
  YOU_ARE_KICKED,
  YOU_ARE_NOT_DELETED,
} from './services/constants';
import {
  redirectToGamePage,
  redirectToGoodbyePage,
  redirectToTooLatePage,
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
import { GameSettings, GameStatus } from './types/room';
import { UserData, Users } from './types/user';
import { FinalVoteData, StatisticsData, UserVotingData } from './types/voting';
import GameStatusListener from './listeners/GameStatusListener';
import UserDeleteListener from './listeners/UserDeleteListener';
import RoundStatusListener from './listeners/RoundStatusListener';
import UserConnectionListener from './listeners/UserConnectionListener';
import UserKickListener from './listeners/UserKickListener';

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
  const dispatch = useDispatch();

  useMemo(() => {
    const shouldRedirectToMain = window.location.pathname !== '/';
    if (shouldRedirectToMain) {
      window.location.href = window.location.origin;
    }
  }, []);

  useEffect(() => {
    socket.on(RECEIVE_MESSAGE, setNewMessage);

    socket.on(Events.issueHasBeenAdded, (issueData) => addIssue(issueData));
    socket.on(Events.issueHasBeenDeleted, (issueId) => deleteIssue(issueId));
    socket.on(Events.issueHasBeenUpdated, (issueData) => updateIssue(issueData));
    socket.on(Events.finalVote, (finalVote) => setFinalVote(finalVote));

    socket.on(USER_HAS_VOTED, setNewUserVote);
    socket.on(CONFIRM_ACCESS, (data) => {
      setAdmitRejectUserNotification(data);
    });

    socket.on(ACCESS_CONFIRMATION_RESPONSE, (data) => {
      if (data.confirmation) {
        const { room, roomId, userId } = data;
        setRoomData(dispatch, room, roomId, userId);
        redirectToGamePage();
      } else {
        redirectToTooLatePage();
      }
    });

    socket.on(GAME_TITLE_CHANGED, setGameTitle);
    socket.on(GAME_SETTINGS_CHANGED, setGameSettings);
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
        <GameStatusListener />
        <RoundStatusListener />
      </>
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setUser: (userData: UserData) => dispatch(updateUserAction(userData)),
  setMessage: (message: Message) => dispatch(setMessageOnResponse(message)),
  updateUser: (userData: UserData) => dispatch(updateUserAction(userData)),
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
