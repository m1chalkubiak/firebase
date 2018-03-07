import { createSelector } from 'reselect';
import { Map } from 'immutable';

import { selectUserUid } from '../userAuth/userAuth.selectors';

export const selectDomain = (state) => state.get('users', Map());

export const selectUsers = createSelector(
  selectDomain,
  (state) => state.get('items', Map()),
);

export const selectLoggedUser = createSelector(
  selectUsers, selectUserUid,
  (users, uid) => users.getIn([`${uid}`, 'value'], Map()).merge({
    uid,
  }),
);
