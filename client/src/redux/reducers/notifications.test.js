import {notifications, initialState} from './notifications';
import { setCommonNotification, removeCommonNotification } from '../actions/notifications';
import { CommonNotificationType } from '../../types/notifications';

describe('commonNotifications', () => {
  const newNotification = {
    key: 'id',
    data: 'new common notification',
    type: CommonNotificationType.success,
  };

  it('should set common notification', () => {
    expect(notifications(initialState, setCommonNotification(newNotification)).common)
      .toEqual(expect.arrayContaining([newNotification]));
  });

  it('should remove common notification by notificationKey', () => {
    expect(notifications(initialState, removeCommonNotification('id')).common)
      .toEqual(expect.not.arrayContaining([newNotification]));
  });
});

