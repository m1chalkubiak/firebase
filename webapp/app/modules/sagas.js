import { all, fork } from 'redux-saga/effects';
import watchRooms from './rooms/rooms.sagas';


export default function* rootSaga() {
  yield all([
    fork(watchRooms),
  ]);
}
