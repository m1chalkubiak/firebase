import { createSelector } from 'reselect';
import { List, Map } from 'immutable';
import { complement, isNil } from 'ramda';


// const selectRoomDomain = state => state.get('mainRoom');

export const selectRooms = (state) => state.get('rooms');

const selectIds = createSelector(
  selectRooms,
  (state) => state.get('ids', List()),
);

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

// export const selectMainRoomMessages = createSelector(
//   selectMainRoomDomain, state => state.get('messages')
// );
