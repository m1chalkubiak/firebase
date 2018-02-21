import { Record, Map } from 'immutable';
import { createActions, createReducer } from '../utils/entityRegistry';
import { createMessage } from './rooms.sagas';

export const {
  Types: RoomsTypes,
  Creators: RoomsActions,
} = createActions({
  setActiveRoomId: ['id'],
  createMessage: ['author', 'content', 'date'],
}, { prefix: 'ROOMS_' });

const RoomsRecord = new Record({
  fetch: ['id'],
  fetchSuccess: ['id'],
  activeRoomId: null,
  messages: Map(),
}, 'rooms');

export const INITIAL_STATE = new RoomsRecord({});

const setActiveRoomId = (state, { id }) => state
  .set('activeRoomId', id)
  .set('messages', Map());

// const getSuccessHandler = (state = INITIAL_STATE, action) => state.set('messages', fromJS(action.data));

export const reducer = createReducer(INITIAL_STATE, {
  [RoomsTypes.SET_ACTIVE_ROOM_ID]: setActiveRoomId,
  [RoomsTypes.CREATE_MESSAGE]: createMessage,
}, { types: RoomsTypes });
