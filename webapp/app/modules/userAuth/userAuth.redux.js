import { Record } from 'immutable';
import { createActions, createReducer } from 'reduxsauce';

export const {
  Types: UserAuthTypes,
  Creators: UserAuthActions,
} = createActions({
  setUserData: ['uid', 'isAnonymous'],
  clearUserData: null,
  signOut: null,
  signInAnonymously: null,
  signInViaFacebook: null,
  signOutFromFirebase: null,
  checkIfUserAccountExists: ['user'],
  listenForFirebaseAuth: null,
}, { prefix: 'USER_AUTH_' });

const UserAuthRecord = new Record({
  uid: null,
  isAnonymous: null,
}, 'userAuth');

const INITIAL_STATE = new UserAuthRecord();

const clearUserData = () => INITIAL_STATE;

const setUserData = (state, { uid, isAnonymous }) => state.merge({
  uid,
  isAnonymous,
});

export const reducer = createReducer(INITIAL_STATE, {
  [UserAuthTypes.SET_USER_DATA]: setUserData,
  [UserAuthTypes.CLEAR_USER_DATA]: clearUserData,
}, { types: UserAuthTypes });
