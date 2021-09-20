import { Dispatch } from 'redux';
import { createCommonNotificationAboutError } from 'src/helpers/commonNotifications';
import { sendStopRound } from 'src/services/game/sendStopRound';
import { stopRound } from '../game';
import { setCommonNotification } from '../notifications';
import { setVotingStatistics } from '../voting';

export const stopRoundAction = (
  roomId: string, 
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { roundIsActive, issueId, issue } = await sendStopRound(roomId);
    dispatch(stopRound(roundIsActive));
    dispatch(setVotingStatistics({ issueId, statistics: issue.statistics }));
  } catch (error) {
    const notification = createCommonNotificationAboutError();
    dispatch(setCommonNotification(notification));
  }  
};
