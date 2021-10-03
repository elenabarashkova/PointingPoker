import { nanoid } from 'nanoid/non-secure';
import {
  CommonNotification,
  CommonNotificationAction,
  CommonNotificationType,
} from 'src/types/notifications';
import { User, UserData } from 'src/types/user';

export const createCommonNotificationAboutUser = (
  { user }: UserData,
  action: keyof typeof CommonNotificationAction,
): CommonNotification => {
  const { name, role } = user;
  let content: string;
  switch (action) {
    case CommonNotificationAction.connect:
      content = 'joined the game session';
      break;
    case CommonNotificationAction.disconnected:
      content = 'disconnected';
      break;
    case CommonNotificationAction.reconnected:
      content = 'reconnected';
      break;
    case CommonNotificationAction.deleted:
      content = 'was removed from the game session';
      break;
    case CommonNotificationAction.isNotDeleted:
      content = 'was not removed from the game session';
      break;
    case CommonNotificationAction.left:
      content = 'left the game session';
      break;
    default:
      break;
  }

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
  const content = type === CommonNotificationType.success
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
    data: `Your vote was ${type === CommonNotificationType.error ? 'not' : ''} counted`,
    type,
  };
};

export const createCommonNotificationAboutFinalVote = (
  type: keyof typeof CommonNotificationType,
): CommonNotification => {
  const id = nanoid();
  return {
    key: id,
    data: `Final vote was  ${type === CommonNotificationType.error ? 'not' : ''} accepted`,
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

export const createCommonNotificationAboutConfirmation = (message: string): CommonNotification => {
  const id = nanoid();
  return {
    key: id,
    data: message,
    type: CommonNotificationType.success,
  };
};

export const createCommonNotificationAboutIssue = (): CommonNotification => {
  const id = nanoid();
  return {
    key: id,
    data: 'Something went wrong. Try again.',
    type: CommonNotificationType.error,
  };
};

export const createCommonNotificationAboutReconnecting = (): CommonNotification => {
  const id = nanoid();
  return {
    key: id,
    data: 'You are reconnected',
    type: CommonNotificationType.success,
  };
};

export const IssueNotFoundNotification = (): CommonNotification => {
  const id = nanoid();
  return {
    key: id,
    data: 'Issue not found',
    type: CommonNotificationType.error,
  };
};

export const createCommonNotificationAboutUserKicking = (name: string): CommonNotification => {
  const id = nanoid();
  return {
    key: id,
    data: `Something went wrong with user ${name} kicking. User is not deleted.`,
    type: CommonNotificationType.error,
  };
};
