import { createReducer, on } from '@ngrx/store';
import { getCookie } from '../shared/utils/decodeCookie';
import { setUser } from '../actions/user.actions';
import decodeToken from '../shared/utils/decodeToken';

var user;
try {
  user = decodeToken(getCookie('token'));
} catch (e) {}
export const initialState = user || undefined;

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, action: any) => ({
    ...state,
    ...action.user,
  }))
);

/* export const initialState = 0; */

/* export const userReducer = createReducer(initialState); */
