import { SetStateAction } from 'react';
import { Dispatch } from 'redux';
import {
  createCommonNotificationAboutError,
  createCommonNotificationAboutFinalVote
} from 'src/helpers/commonNotifications';
import { setFinalVote } from 'src/services/voting/setFinalVote';
import { CommonNotificationType } from 'src/types/notifications';
import { setCommonNotification } from '../notifications';
import { setFinalVoteAction } from '../voting';

export const setFinalVoteRequest =
  (
    roomId: string,
    issueId: string,
    finalVote: string,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      setIsLoading(true);
      const votingData = await setFinalVote(roomId, issueId, finalVote);
      dispatch(setFinalVoteAction(votingData));

      const notification = createCommonNotificationAboutFinalVote(CommonNotificationType.success);
      dispatch(setCommonNotification(notification));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(createCommonNotificationAboutError());
    }
  };
