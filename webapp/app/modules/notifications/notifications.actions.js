import { createActions } from 'reduxsauce';

export const { Types: NotificationsTypes, Creators: NotificationsActions } = createActions({
  saveToken: ['token'],
}, { prefix: 'NOTIFICATIONS_' });

