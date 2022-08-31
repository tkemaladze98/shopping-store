import * as AuthActions from './auth.actions';

import { User } from 'src/app/models/user.model';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

const _authReducer = createReducer(
  initialState,

  on(AuthActions.loginStart, AuthActions.signupStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),

  on(AuthActions.authenticateSuccess, (state, action) => ({
    ...state,
    authError: null,
    loading: false,
    user: new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    ),
  })),

  on(AuthActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.errorMessage,
    loading: false,
  })),
  on(AuthActions.clearError, (state) => ({
    ...state,
    authError: null,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  }))
);

export function authReducer(state: State, action: Action) {
  return _authReducer(state, action);
}
