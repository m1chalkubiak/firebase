import { Record, Map } from 'immutable';
import { createActions, createReducer } from '../utils/entityRegistry';


export const DEFAULT_ROOM = 'main';

export const {
  Types: RoomsTypes,
  Creators: RoomsActions,
} = createActions({
  setActiveRoomId: ['id'],
  createMessage: ['author', 'content'],
}, { prefix: 'ROOMS_' });

const RoomsRecord = new Record({
  activeRoomId: null,
  messages: Map(),
}, 'rooms');

export const INITIAL_STATE = new RoomsRecord({});

const setActiveRoomId = (state, { id }) => state
  .set('activeRoomId', id)
  .set('messages', Map());

export const reducer = createReducer(INITIAL_STATE, {
  [RoomsTypes.SET_ACTIVE_ROOM_ID]: setActiveRoomId,
}, { types: RoomsTypes });
