import { createActions } from 'reduxsauce';

export const { Types: NotificationsTypes, Creators: NotificationsActions } = createActions({
  initWebWorker: [],
}, { prefix: 'NOTIFICATIONS_' });

