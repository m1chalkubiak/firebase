import { createSelector } from 'reselect';
import { fromJS, Map } from 'immutable';
import { complement, isNil } from 'ramda';


export const selectRooms = (state) => state.get('rooms', Map());

export const selectRoomsList = createSelector(
  selectRooms,
  (state) => state.get('roomsList', Map()),
);

export const selectItems = createSelector(
  selectRooms,
  (state) => state.get('items', Map()),
);

export const selectActiveRoomId = createSelector(
  selectRooms,
  (state) => state.get('activeRoomId', ''),
);

export const selectMessagesLoaded = createSelector(
  selectRooms,
  (state) => state.get('messagesLoaded', true),
);

export const selectCreateRoomDialogOpened = createSelector(
  selectRooms,
  (state) => state.get('createRoomDialogOpened', true),
);

export const selectActiveRoom = createSelector(
  selectActiveRoomId, selectRoomsList,
  (activeRoomId, rooms) => (fromJS({
    id: activeRoomId,
    name: rooms.getIn([activeRoomId, 'value', 'name']),
  }))
);

export const selectMessages = createSelector(
  selectRooms,
  (state) => state.get('messages').filter(complement(isNil)),
);
