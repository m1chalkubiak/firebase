import { Map, Record } from 'immutable';
import { createActions, createReducer } from '../utils/entityRegistry';
import { UserAuthTypes } from '../userAuth/userAuth.redux';


export const OFFLINE_STATUS = 'offline';
export const ONLINE_STATUS = 'online';

export const {
  Types: UsersTypes,
  Creators: UsersActions,
} = createActions({
  createUser: ['user'],
  listenForUsers: null,
  changeUserStatus: ['uid', 'status'],
}, { prefix: 'USERS_' });

const UserAuthRecord = new Record({
  items: Map(),
}, 'users');

const INITIAL_STATE = new UserAuthRecord();

const signOut = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [UserAuthTypes.SIGN_OUT]: signOut,
}, { types: UsersTypes });
