import { always, applySpec, converge, defaultTo, identity, merge, pipe } from 'ramda';
import { all, takeLatest } from 'redux-saga/effects';
import reportError from 'report-error';

import { dbRef } from '../utils/refs';
import { UsersTypes } from './users.redux';


export function* createUser({ user }) {
  try {
    const usersRef = dbRef.child('users');

    yield usersRef.transaction(pipe(
      defaultTo({}),
      converge(merge, [identity, applySpec({
        [user.uid]: {
          email: always(user.email),
          displayName: always(user.displayName),
          profilePhoto: always(user.profilePhoto),
        },
      })])
    ));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export default function* watchUsers() {
  try {
    yield all([
      takeLatest(UsersTypes.CREATE_USER, createUser),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
