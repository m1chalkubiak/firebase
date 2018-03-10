import { takeLatest, put, select, fork } from 'redux-saga/effects';
import reportError from 'report-error';
import firebase from 'firebase';
import { reset } from 'redux-form';
import { pipe, defaultTo, converge, merge, identity, applySpec, always } from 'ramda';

import { dbRef } from '../utils/refs';
import { createSaga } from '../utils/entityRegistry';
import { RoomsTypes, RoomsActions, CREATE_ROOM_FORM, MESSAGE_FORM } from './rooms.redux';
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
    yield put(reset(MESSAGE_FORM));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export function* createRoom({ name }) {
  try {
    const roomsRef = dbRef.child('rooms');
    const { key } = roomsRef.push();

    yield roomsRef.transaction(pipe(
      defaultTo({}),
      converge(merge, [identity, applySpec({
        [key]: {
          name: always(name),
        },
      })])
    ));
    yield put(RoomsActions.closeCreateRoomDialog());
    yield put(reset(CREATE_ROOM_FORM));
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
    yield takeLatest(RoomsTypes.CREATE_ROOM, createRoom);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
