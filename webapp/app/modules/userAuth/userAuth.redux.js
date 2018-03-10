import { Record } from 'immutable';
import { createActions, createReducer } from 'reduxsauce';

export const {
  Types: UserAuthTypes,
  Creators: UserAuthActions,
} = createActions({
  signOut: null,
  signInAnonymously: null,
  signInViaFacebook: null,
  signOutFromFirebase: null,
  checkIfUserAccountExists: ['user'],
  listenForFirebaseAuth: null,
  setUserData: ['uid', 'isAnonymous'],
}, { prefix: 'USER_AUTH_' });

const UserAuthRecord = new Record({
  uid: null,
  isAnonymous: null,
}, 'userAuth');

const INITIAL_STATE = new UserAuthRecord();

const signOut = () => INITIAL_STATE;

const setUserData = (state, { uid, isAnonymous }) => state.merge({
  uid,
  isAnonymous,
});

export const reducer = createReducer(INITIAL_STATE, {
  [UserAuthTypes.SIGN_OUT]: signOut,
  [UserAuthTypes.SET_USER_DATA]: setUserData,
}, { types: UserAuthTypes });
