import { combineReducers } from 'redux-immutable';

import { reducer as formReducer } from 'redux-form/immutable';
import { reducer as routerReducer } from './router/router.redux';
import { reducer as localesReducer } from './locales/locales.redux';
import { reducer as roomsReducer } from './rooms/rooms.redux';


export default function createReducer() {
  return combineReducers({
    form: formReducer,
    route: routerReducer,
    rooms: roomsReducer,
    locales: localesReducer,
  });
}
