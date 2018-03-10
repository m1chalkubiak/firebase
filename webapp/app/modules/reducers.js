import { combineReducers } from 'redux-immutable';

import { reducer as formReducer } from 'redux-form/immutable';
import { reducer as routerReducer } from './router/router.redux';
import { reducer as localesReducer } from './locales/locales.redux';
import { reducer as roomsReducer } from './rooms/rooms.redux';
import { reducer as userAuthReducer } from './userAuth/userAuth.redux';
import { reducer as usersReducer } from './users/users.redux';


export default function createReducer() {
  return combineReducers({
    form: formReducer,
    route: routerReducer,
    rooms: roomsReducer,
    userAuth: userAuthReducer,
    users: usersReducer,
    locales: localesReducer,
  });
}
