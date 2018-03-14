import { all, fork } from 'redux-saga/effects';
import watchRooms from './rooms/rooms.sagas';
import watchUserAuth from './userAuth/userAuth.sagas';
import watchUsers from './users/users.sagas';
import { watchNotifications } from './notifications/notifications.saga';


export default function* rootSaga() {
  yield all([
    fork(watchRooms),
    fork(watchUserAuth),
    fork(watchUsers),
    fork(watchNotifications),
  ]);
}
