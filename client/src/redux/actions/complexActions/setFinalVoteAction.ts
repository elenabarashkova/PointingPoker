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
    setTimeout(() => {
      dispatch(setFinalVoteAction(votingData));

      const notification = createCommonNotificationAboutFinalVote(CommonNotificationType.success);
      dispatch(setCommonNotification(notification));
      setIsLoading(false);
    }, 2000);
  } catch (error) {
    setIsLoading(false);
    dispatch(createCommonNotificationAboutError());
  }
};
