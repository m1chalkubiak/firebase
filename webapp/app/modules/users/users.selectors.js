import { createSelector } from 'reselect';
import { Map } from 'immutable';

import { selectUserEmail } from '../userAuth/userAuth.selectors';

const selectDomain = (state) => state.get('users', Map());

export const selectUsers = createSelector(
  selectDomain,
  (state) => state.get('items', Map()),
);

export const selectLoggedUser = createSelector(
  selectUsers, selectUserEmail,
  (users, email) => users.get(email, null)
);
