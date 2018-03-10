import { pick } from 'ramda';
import { all, fork, put, takeLatest } from 'redux-saga/effects';
import reportError from 'report-error';

import { dbRef } from '../utils/refs';
import { createSaga } from '../utils/entityRegistry';
import { UsersTypes, UsersActions } from './users.redux';
import { selectDomain as selectUsers } from './users.selectors';


const registrySaga = createSaga({
  actions: UsersActions,
  types: UsersTypes,
  baseDbRef: dbRef,
  registrySelector: selectUsers,
});

export function* createUser({ user: { uid, ...user } }) {
  try {
    const usersRef = dbRef.child('users');

    yield usersRef.child(uid).update(pick(['email', 'displayName', 'profilePhoto'])(user));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export function* startListeningForState() {
  try {
    yield put(UsersActions.startListening('/users', 'items'));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export default function* watchUsers() {
  try {
    yield all([
      fork(registrySaga),
      takeLatest(UsersTypes.LISTEN_FOR_USERS, startListeningForState),
      takeLatest(UsersTypes.CREATE_USER, createUser),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
