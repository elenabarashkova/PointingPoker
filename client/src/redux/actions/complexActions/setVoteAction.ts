import { Dispatch } from 'redux';
import { createCommonNotificationAboutVouting } from 'src/helpers/commonNotifications';
import { sendVote } from 'src/services/voting/setVote';
import { CommonNotificationType } from 'src/types/notifications';
import { setCommonNotification } from '../notifications';
import { setUserVote } from '../voting';

export const setVoteAction = (
  roomId: string, 
  issueId : string, 
  vote: string,
) => async (dispatch: Dispatch): Promise<void> => {
  try {
    const votingData = await sendVote(roomId, issueId, vote);
    dispatch(setUserVote(votingData)); 
  
    const notification = createCommonNotificationAboutVouting(CommonNotificationType.success);
    dispatch(setCommonNotification(notification));
  } catch (error) {
    const notification = createCommonNotificationAboutVouting(CommonNotificationType.error);
    dispatch(setCommonNotification(notification));
  }  
};
