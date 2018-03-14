import { createSelector } from 'reselect';
import { fromJS, Map } from 'immutable';
import { complement, isNil } from 'ramda';

import { selectUserUid } from '../userAuth/userAuth.selectors';


export const selectRooms = (state) => state.get('rooms', Map());

export const selectRoomsList = createSelector(
  selectRooms, selectUserUid,
  (rooms, userUid) => rooms.get('roomsList', Map())
    .map((room) => room.set('isActive', room.getIn(['value', 'users', userUid], false))),
);

export const selectActiveRoomsList = createSelector(
  selectRoomsList,
  (rooms) => rooms.filter((room) => room.get('isActive')),
);

export const selectInactiveRoomsList = createSelector(
  selectRoomsList,
  (rooms) => rooms.filter((room) => !room.get('isActive')),
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
  (activeRoomId, rooms) => fromJS({
    id: activeRoomId,
    ...rooms.getIn([activeRoomId, 'value'], Map()).toJS(),
  })
);

export const selectMessages = createSelector(
  selectRooms,
  (state) => state.get('messages').filter(complement(isNil)),
);
