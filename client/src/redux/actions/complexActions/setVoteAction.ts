import { Dispatch } from 'redux';
import { createCommonNotificationAboutVouting } from 'src/helpers/commonNotifications';
import { sendVote } from 'src/services/voting/sendVote';
import { CommonNotificationType } from 'src/types/notifications';
import { UserVotingData } from 'src/types/voting';
import { setCommonNotification } from '../notifications';
import { setUserVote } from '../voting';

export const setVoteAction = (
  roomId: string, 
  issueId: string, 
  vote: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const votingData = await sendVote(roomId, issueId, vote) as UserVotingData;
    dispatch(setUserVote(votingData));

    const notification = createCommonNotificationAboutVouting(CommonNotificationType.success);
    dispatch(setCommonNotification(notification));
  } catch (error) {
    console.log('error catch:', error);
    const notification = createCommonNotificationAboutVouting(CommonNotificationType.error);
    dispatch(setCommonNotification(notification));
  }
};
