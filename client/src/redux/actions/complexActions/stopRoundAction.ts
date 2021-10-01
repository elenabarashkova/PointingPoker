import { Dispatch } from 'redux';
import { createCommonNotificationAboutError } from 'src/helpers/commonNotifications';
import store from 'src/redux/store';
import { sendStopRound } from 'src/services/game/sendStopRound';
import { stopRound } from '../game';
import { setCommonNotification } from '../notifications';
import { allowParticipation } from '../user';
import { setVotingStatistics } from '../voting';

export const stopRoundAction = (roomId: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const { roundIsActive, issueId, issue } = await sendStopRound(roomId);
    dispatch(stopRound(roundIsActive));
    dispatch(setVotingStatistics({ issueId, statistics: issue.statistics }));
    const { users } = store.getState();
    Object.entries(users)
      .filter(([, { canParticipate }]) => !canParticipate)
      .forEach(([id]) => dispatch(allowParticipation(id)));
  } catch (error) {
    const notification = createCommonNotificationAboutError();
    dispatch(setCommonNotification(notification));
  }
};
