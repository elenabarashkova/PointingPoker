import { nanoid } from 'nanoid/non-secure';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { CommonNotificationAction, CommonNotificationType } from 'src/types/notifications';
import { UserData } from 'src/types/user';

export const createCommonNotificationAboutUser = ({ userId }: UserData, action: keyof typeof CommonNotificationAction) => {
  const roomUsers = useTypedSelector(({ users }) => users);
  const { name, role } = roomUsers[userId];
  const content = (action === CommonNotificationAction.connect) 
    ? 'joined the game session'
    : (action === CommonNotificationAction.deleted) 
      ? 'was removed from the game session'
      : 'was not removed from the game session';
  const id = nanoid(); 

  return {
    key: id,
    data: `${role} ${name} ${content}`,
    type: CommonNotificationType.success,
  };
};
