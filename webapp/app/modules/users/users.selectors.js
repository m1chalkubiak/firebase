import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { complement, isNil } from 'ramda';

import { selectUserUid } from '../userAuth/userAuth.selectors';
import { selectActiveRoom } from '../rooms/rooms.selectors';

export const selectDomain = (state) => state.get('users', Map());

export const selectUsers = createSelector(
  selectDomain,
  (state) => state.get('items', Map()),
);

export const selectUsersInActiveRoom = createSelector(
  selectActiveRoom, selectUsers,
  (activeRoom, users) => activeRoom.get('users', Map())
    .map((value, key) => users.get(key))
    .filter(complement(isNil)),
);

export const selectLoggedUser = createSelector(
  selectUsers, selectUserUid,
  (users, uid) => users.getIn([uid, 'value'], Map()).merge({
    uid,
  }),
);
