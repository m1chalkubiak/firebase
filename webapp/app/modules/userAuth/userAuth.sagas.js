import { takeLatest, put, select, all, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { replace } from 'react-router-redux';
import reportError from 'report-error';
import firebase from 'firebase';

import { UserAuthTypes, UserAuthActions } from './userAuth.redux';
import { selectLoggedUser } from '../users/users.selectors';
import { RoomsActions } from '../rooms/rooms.redux';
import { selectUser } from './userAuth.selectors';
import { OFFLINE_STATUS, ONLINE_STATUS, UsersActions } from '../users/users.redux';
import { selectLocationState } from '../router/router.selectors';


const facebookProvider = new firebase.auth.FacebookAuthProvider();

function* signInAnonymously() {
  try {
    yield firebase.auth().signInAnonymouslyAndRetrieveData();
  } catch (error) {
    reportError(error);
  }
}

function* signInViaFacebook() {
  try {
    const { user: { uid, email, displayName, photoURL: profilePhoto, isAnonymous } } =
      yield firebase.auth().signInWithPopup(facebookProvider);
    yield put(UserAuthActions.setUserData(uid, isAnonymous));
    yield put(UserAuthActions.checkIfUserAccountExists({ uid, email, displayName, profilePhoto }));
  } catch (error) {
    reportError(error);
  }
}

function* checkIfUserAccountExists({ user }) {
  try {
    const loggedUser = yield select(selectLoggedUser);

    if (loggedUser.size > 1) {
      yield put(UsersActions.changeUserStatus(loggedUser.get('uid'), ONLINE_STATUS));
    }

    yield put(UsersActions.createUser(user));
  } catch (error) {
    reportError(error);
  }
}

function* signOutFromFirebase() {
  try {
    const loggedUser = yield select(selectLoggedUser);

    yield put(UsersActions.changeUserStatus(loggedUser.get('uid'), OFFLINE_STATUS));
    yield put(UserAuthActions.clearUserData());
    yield firebase.auth().signOut();
    yield put(UserAuthActions.signInAnonymously());
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

const listenForAuth = () => eventChannel((emitter) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    setTimeout(() => {
      if (user) {
        emitter({ user, authenticated: true });
      } else {
        emitter({ authenticated: false });
      }
    });
  });

  return () => unsubscribe();
});


function* listenForFirebaseAuth() {
  try {
    const listenForAuthChan = yield listenForAuth();

    while (true) { // eslint-disable-line
      const { authenticated, user } = yield take(listenForAuthChan);

      if (!authenticated) {
        yield put(UserAuthActions.signInAnonymously());
      } else {
        yield put(UserAuthActions.setUserData(user.uid, user.isAnonymous));
        yield put(UsersActions.listenForUsers());

        const currentUserData = yield select(selectUser);
        const { locationBeforeTransitions: { pathname } } = yield select(selectLocationState());

        if (pathname !== '/login' && currentUserData.get('isAnonymous')) {
          yield put(replace('/login'));
        }

        if (pathname === '/login' && !currentUserData.get('isAnonymous')) {
          yield put(replace('/room'));
        }
      }
    }
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function* setUserData() {
  try {
    yield put(RoomsActions.addUserToRoom());
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export default function* watchUserAuth() {
  try {
    yield all([
      takeLatest(UserAuthTypes.LISTEN_FOR_FIREBASE_AUTH, listenForFirebaseAuth),
      takeLatest(UserAuthTypes.SIGN_IN_ANONYMOUSLY, signInAnonymously),
      takeLatest(UserAuthTypes.SIGN_IN_VIA_FACEBOOK, signInViaFacebook),
      takeLatest(UserAuthTypes.CHECK_IF_USER_ACCOUNT_EXISTS, checkIfUserAccountExists),
      takeLatest(UserAuthTypes.SIGN_OUT, signOutFromFirebase),
      takeLatest(UserAuthTypes.SET_USER_DATA, setUserData),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
