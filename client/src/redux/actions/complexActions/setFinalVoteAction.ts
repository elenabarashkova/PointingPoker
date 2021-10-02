import { SetStateAction } from 'react';
import { Dispatch } from 'redux';
import {
  createCommonNotificationAboutError,
  createCommonNotificationAboutFinalVote,
} from 'src/helpers/commonNotifications';
import { setFinalVote } from 'src/services/voting/setFinalVote';
import { CommonNotificationType } from 'src/types/notifications';
import { setCommonNotification } from '../notifications';
import { setFinalVoteAction } from '../voting';

export const setFinalVoteRequest = (
  roomId: string,
  issueId: string,
  finalVote: string,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    setIsLoading(true);
    const votingData = await setFinalVote(roomId, issueId, finalVote);
    const notification = createCommonNotificationAboutFinalVote(CommonNotificationType.success);
    dispatch(setFinalVoteAction(votingData));
    dispatch(setCommonNotification(notification));
  } catch (error) {
    dispatch(createCommonNotificationAboutError());
  } finally {
    setIsLoading(false);
  }
};
