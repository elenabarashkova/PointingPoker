import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { startRound } from 'src/services/game/startRound';
import { sendGameRequest, setGameError, startRoundAction } from '../game';
import { setIssuesAction } from '../issues';
import { initVoting } from '../voting';

export const startRoundRequest = (
  roomId: string, 
  issueId: string,
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    dispatch(sendGameRequest());
    const { currentIssueId, issues, roundIsActive } = await startRound(roomId, issueId);
    dispatch(startRoundAction({ currentIssueId, roundIsActive }));
    dispatch(setIssuesAction(issues));
    dispatch(initVoting(currentIssueId));
  } catch (error) {
    dispatch(setGameError());
  }
};
