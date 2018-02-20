import { all, fork } from 'redux-saga/effects';
import maintainersSaga from './maintainers/maintainers.sagas';
import watchRooms from './rooms/rooms.sagas';


export default function* rootSaga() {
  yield all([
    fork(maintainersSaga),
    fork(watchRooms),
  ]);
}
