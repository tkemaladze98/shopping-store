import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthenticate = (
  email: string,
  userId: string,
  userToken: string,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  // const newUser = new User(email, userId, userToken, expirationDate);
  return new AuthActions.AuthenticateSuccess({
    email,
    userId,
    userToken,
    expirationDate,
    redirect: true,
  });
};

const handleErrors = (errorResponse: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((loginAction: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAImDwLD4ntL-iJeDgqr5H-SVqf4DwqaFA',
            {
              email: loginAction.payload.email,
              password: loginAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              return handleAuthenticate(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            }),
            catchError((errorRes) => {
              return handleErrors(errorRes);
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
