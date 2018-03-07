import { takeLatest, put, select, all, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { replace } from 'react-router-redux';
import reportError from 'report-error';
import firebase from 'firebase';

import { UserAuthTypes, UserAuthActions } from './userAuth.redux';
import { selectLoggedUser } from '../users/users.selectors';
import { selectUser } from './userAuth.selectors';
import { UsersActions } from '../users/users.redux';


const provider = new firebase.auth.FacebookAuthProvider();

function* signInAnonymously() {
  try {
    yield firebase.auth().signInAnonymouslyAndRetrieveData();
  } catch (error) {
    reportError(error);
  }
}

function* signInViaFacebook() {
  try {
    const { user } = yield firebase.auth().signInWithPopup(provider);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      profilePhoto: user.photoURL,
    };
    yield put(UserAuthActions.setUserData(user.uid, user.isAnonymous));
    yield put(UserAuthActions.checkUserAccount(userData));
  } catch (error) {
    reportError(error);
  }
}

function* checkUserAccount({ user }) {
  try {
    const loggedUser = yield select(selectLoggedUser);

    if (loggedUser.size > 1) {
      return null;
    }

    yield put(UsersActions.createUser(user));
  } catch (error) {
    reportError(error);
  }
}

function* signOutFromFirebase() {
  try {
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

        if (currentUserData.isAnonymous) {
          yield put(replace('/login'));
        } else {
          yield put(replace('/room/'));
        }
      }
    }
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
      takeLatest(UserAuthTypes.CHECK_USER_ACCOUNT, checkUserAccount),
      takeLatest(UserAuthTypes.SIGN_OUT, signOutFromFirebase),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
