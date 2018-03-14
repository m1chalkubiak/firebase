import { Record, Map } from 'immutable';
import { createActions, createReducer } from '../utils/entityRegistry';


export const DEFAULT_ROOM = 'main';
export const MESSAGE_FORM = 'messageForm';
export const CREATE_ROOM_FORM = 'createRoomForm';

export const {
  Types: RoomsTypes,
  Creators: RoomsActions,
} = createActions({
  setActiveRoomId: ['id'],
  addUserToRoom: null,
  removeUserFromRoom: null,
  createMessage: ['author', 'content'],
  createRoom: ['name'],
  openCreateRoomDialog: null,
  closeCreateRoomDialog: null,
}, { prefix: 'ROOMS_' });

const RoomsRecord = new Record({
  activeRoomId: null,
  messages: Map(),
  roomsList: Map(),
  messagesLoaded: false,
  createRoomDialogOpened: false,
}, 'rooms');

export const INITIAL_STATE = new RoomsRecord({});

const setActiveRoomId = (state, { id }) => state.merge({
  activeRoomId: id,
  messages: Map(),
  roomsList: Map(),
  messagesLoaded: false,
  createRoomDialogOpened: false,
});

const openCreateRoomDialog = (state) => state.set('createRoomDialogOpened', true);

const closeCreateRoomDialog = (state) => state.set('createRoomDialogOpened', false);

export const reducer = createReducer(INITIAL_STATE, {
  [RoomsTypes.SET_ACTIVE_ROOM_ID]: setActiveRoomId,
  [RoomsTypes.OPEN_CREATE_ROOM_DIALOG]: openCreateRoomDialog,
  [RoomsTypes.CLOSE_CREATE_ROOM_DIALOG]: closeCreateRoomDialog,
}, { types: RoomsTypes });
