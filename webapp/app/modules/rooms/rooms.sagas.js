import { takeLatest, put, select, fork } from 'redux-saga/effects';
import reportError from 'report-error';
import firebase from 'firebase';
import { pipe, defaultTo, converge, merge, identity, applySpec, always } from 'ramda';

import { dbRef } from '../utils/refs';
import { createSaga } from '../utils/entityRegistry';
import { RoomsTypes, RoomsActions } from './rooms.redux';
import { selectActiveRoomId, selectRooms } from './rooms.selectors';


const registrySaga = createSaga({
  actions: RoomsActions,
  types: RoomsTypes,
  baseDbRef: dbRef,
  registrySelector: selectRooms,
});

function* getActiveRoomRef() {
  try {
    const roomName = yield select(selectActiveRoomId);
    return dbRef.child('messages').child(roomName);
  } catch (error) {
    /* istanbul ignore next */
    return reportError(error);
  }
}

export function* createMessage({ author, content }) {
  try {
    const activeRoomRef = yield getActiveRoomRef();
    const { key } = activeRoomRef.push();

    yield activeRoomRef.transaction(pipe(
      defaultTo({}),
      converge(merge, [identity, applySpec({
        [key]: {
          author: always(author),
          content: always(content),
          publicationTime: always(firebase.database.ServerValue.TIMESTAMP),
        },
      })])
    ));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export function* startListeningForState() {
  try {
    const roomName = yield select(selectActiveRoomId);

    yield put(RoomsActions.startListening(`/messages/${roomName}`, 'messages'));
    yield put(RoomsActions.startListening('/rooms', 'roomsList'));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export default function* watchRooms() {
  try {
    yield fork(registrySaga);
    yield takeLatest(RoomsTypes.SET_ACTIVE_ROOM_ID, startListeningForState);
    yield takeLatest(RoomsTypes.CREATE_MESSAGE, createMessage);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
