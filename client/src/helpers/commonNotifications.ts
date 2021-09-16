import { nanoid } from 'nanoid/non-secure';
import { CommonNotification, CommonNotificationAction, CommonNotificationType } from 'src/types/notifications';
import { User, UserData } from 'src/types/user';

export const createCommonNotificationAboutUser = (
  { user }: UserData, 
  action: keyof typeof CommonNotificationAction,
): CommonNotification => {
  const { name, role } = user;
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

export const createCommonNotificationAboutKicking = (
  type: keyof typeof CommonNotificationType,
  kickedUser?: User, 
): CommonNotification => {
  const { name, role } = kickedUser;
  const content = (type === CommonNotificationType.success) 
    ? `You nominated ${role} ${name} for removal` 
    : 'Your nomination failed. try again'; 
  const id = nanoid();
  return {
    key: id,
    data: content,
    type,
  };
};

export const createCommonNotificationAboutVouting = (
  type: keyof typeof CommonNotificationType,
): CommonNotification => {
  const id = nanoid();
  return {
    key: id,
    data: `Your vote was ${type === CommonNotificationType.error && 'not'} counted`,
    type,
  };
};

export const createCommonNotificationAboutError = (): CommonNotification => {
  const id = nanoid();
  return {
    key: id,
    data: 'Something went wrong. Try again.',
    type: CommonNotificationType.error,
  };
};
