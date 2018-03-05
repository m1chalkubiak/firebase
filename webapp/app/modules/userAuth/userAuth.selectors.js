import { createSelector } from 'reselect';
import { Map } from 'immutable';


export const selectUser = (state) => state.get('userAuth', Map());

export const selectUserEmail = createSelector(
  selectUser,
  (state) => state.get('email', Map()),
);
