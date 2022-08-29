import * as AuthActions from './auth.actions';

import { User } from 'src/app/models/user.model';

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

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.AUTHENTICATE_SUCCESS:
      const currentUser = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.userToken,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: currentUser,
        authError: null,
        loading: false,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
      };
  }
}
