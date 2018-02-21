import { takeLatest, put, select, fork } from 'redux-saga/effects';
import reportError from 'report-error';

import { roomsRef } from '../utils/refs';
import { createSaga } from '../utils/entityRegistry';
import { RoomsTypes, RoomsActions } from './rooms.redux';
import { selectActiveRoomId, selectRooms } from './rooms.selectors';

const registrySaga = createSaga({
  actions: RoomsActions,
  types: RoomsTypes,
  baseDbRef: roomsRef,
  registrySelector: selectRooms,
});
//
// function* fetch({ id }) {
//   try {
//     const { entities, result } = normalize(data, agentSchema);
//
//     yield put(CommonActions.updateEntities(entities));
//     yield put(AgentActions.fetchSuccess(result));
//   } catch (error) {
//     /* istanbul ignore next */
//     reportError(error);
//   }
// }

// function* fetchActiveRoom(id) {
//   try {
//     const activeRoom = yield select(selectActiveRoomId);
//     console.log(activeRoom)
//     if (activeRoom.isEmpty()) {
//       console.log(activeRoom);
//       // yield put(RoomsActions.fetch(id));
//       // while (true) {
//       //   const { id: fetchedId } = yield take(RoomsTypes.FETCH_SUCCESS);
//       //   if (fetchedId === id) {
//           return yield select(selectActiveRoomId);
//       //   }
//       // }
//     }
//
//     return activeRoom;
//   } catch (error) {
//     /* istanbul ignore next */
//     return reportError(error);
//   }
// }

export function* startListeningForState({ id }) {
  try {
    // const activeAgent = yield fetchActiveRoom(parseInt(id, 10));
    // console.log(activeAgent)
    const roomName = yield select(selectActiveRoomId);

    yield put(RoomsActions.startListening(`${roomName}/messages`, 'messages'));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

// export function* fetch() {
//   try {
//     const ref = roomsRef.child('main');
//     yield ref.once('value', function (snapshot) {
//       const value = snapshot.val();
//       const key = snapshot.key;
//       console.log(value)
//       return value;
//     });
//   } catch (error) {
//     /* istanbul ignore next */
//     return reportError(error);
//   }
// }


export default function* watchRooms() {
  try {
    yield fork(registrySaga);
    yield takeLatest(RoomsTypes.SET_ACTIVE_ROOM_ID, startListeningForState);
    // yield takeLatest(RoomsTypes.FETCH, fetch);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

