import { Record } from 'immutable';
import { createActions, createReducer } from 'reduxsauce';

export const {
  Types: UserAuthTypes,
  Creators: UserAuthActions,
} = createActions({
  signOut: null,
  signInViaFacebook: null,
  signOutFromFirebase: null,
  checkUserAccount: ['user'],
  listenForFirebaseAuth: null,
  setUserData: ['email'],
}, { prefix: 'USER_AUTH_' });

const UserAuthRecord = new Record({
  email: null,
}, 'userAuth');

const INITIAL_STATE = new UserAuthRecord();

const signOut = (state) => state.merge(INITIAL_STATE);

const setUserData = (state, { email }) => state.merge({
  email: email,
});

export const reducer = createReducer(INITIAL_STATE, {
  [UserAuthTypes.SIGN_OUT]: signOut,
  [UserAuthTypes.SET_USER_DATA]: setUserData,
}, { types: UserAuthTypes });
