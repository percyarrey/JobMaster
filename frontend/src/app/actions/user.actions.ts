import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
  '[User] setProfile',
  props<{ user: any }>()
);
