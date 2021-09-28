import { batch } from 'react-redux';
import { Dispatch } from 'redux';
import {
  seCurrentIssueId,
  setAllGameSettings,
  setCanParticipate,
  setGameStatus,
  setRoundIsActive,
  setTitle,
} from 'src/redux/actions/game';
import { setIssuesAction } from 'src/redux/actions/issues';
import { setMessages } from 'src/redux/actions/messages';
import { setImportantNotification } from 'src/redux/actions/notifications';
import { setRoomIdAction } from 'src/redux/actions/room';
import { setCurrentUserAction, setUsersAction } from 'src/redux/actions/user';
import { setFinalVoteAction, setUsersVote, setVotingStatistics } from 'src/redux/actions/voting';
import { ImportantNotifications } from 'src/types/notifications';
import { Room } from 'src/types/room';

export const setRoomData = (
  dispatch: Dispatch,
  room: Room,
  roomId: string,
  userId: string,
): void => {
  const {
    users,
    messages,
    issues,
    gameStatus,
    gameSettings,
    gameTitle,
    currentIssueId,
    roundIsActive,
  } = room as Room;

  batch(() => {
    dispatch(setUsersAction(users));
    dispatch(setCurrentUserAction(userId));
    dispatch(setRoomIdAction(roomId));
    dispatch(setGameStatus(gameStatus));
    dispatch(setAllGameSettings(gameSettings));
    dispatch(setMessages(messages));
    dispatch(setIssuesAction(issues));
    dispatch(setTitle(gameTitle));
    dispatch(seCurrentIssueId(currentIssueId));
    dispatch(setRoundIsActive(roundIsActive));

    if (roundIsActive) {
      dispatch(setCanParticipate(false));
      dispatch(setImportantNotification(ImportantNotifications.roundIsActive));
    }

    Object.entries(issues).forEach(([issueId, { votes, finalVote, statistics }]) => {
      if (votes) {
        dispatch(setUsersVote({ issueId, votes }));
      }
      if (finalVote) {
        dispatch(setFinalVoteAction({ issueId, finalVote }));
      }
      if (statistics) {
        dispatch(setVotingStatistics({ issueId, statistics }));
      }
    });
  });
};
