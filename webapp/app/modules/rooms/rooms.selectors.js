import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { complement, isNil } from 'ramda';


export const selectRooms = (state) => state.get('rooms');

export const selectItems = createSelector(
  selectRooms,
  (state) => state.get('items', Map()),
);

export const selectActiveRoomId = createSelector(
  selectRooms,
  (state) => state.get('activeRoomId'),
);

export const selectActiveRoom = createSelector(
  selectActiveRoomId, selectItems,
  (activeRoomId, rooms) => rooms.get(`${activeRoomId}`, Map())
);

export const selectMessages = createSelector(
  selectRooms,
  (state) => state.get('messages').filter(complement(isNil)),
);
