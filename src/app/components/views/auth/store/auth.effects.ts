import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../auth.service';
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
  const newUser = new User(email, userId, userToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(newUser));
  return AuthActions.authenticateSuccess({
    email,
    userId,
    token: userToken,
    expirationDate,
    redirect: true,
  });
};

const handleErrors = (errorResponse: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(AuthActions.authenticateFail({ errorMessage }));
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
  return of(AuthActions.authenticateFail({ errorMessage }));
};

@Injectable()
export class AuthEffects {
  authSignup$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(AuthActions.signupStart),
        switchMap((action: { email: string; password: string }) => {
          return this.http
            .post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAImDwLD4ntL-iJeDgqr5H-SVqf4DwqaFA',
              {
                email: action.email,
                password: action.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              tap((resData) => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              }),
              map((resData: AuthResponseData) => {
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
      )
  );

  authLogin$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(AuthActions.loginStart),
        switchMap((action) => {
          return this.http
            .post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAImDwLD4ntL-iJeDgqr5H-SVqf4DwqaFA',
              {
                email: action.email,
                password: action.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              tap((resData) => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              }),
              map((resData: AuthResponseData) => {
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
      )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap((action) => action.redirect && this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'DUMMY' };
        }
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return AuthActions.authenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false,
          });
        }
        return { type: 'DUMMY' };
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  deleteProfile$ = createEffect(
    (): Actions =>
      this.actions$.pipe(
        ofType(AuthActions.deleteProfile),
        switchMap((action) => {
          return this.http
            .post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAImDwLD4ntL-iJeDgqr5H-SVqf4DwqaFA',
              { idToken: action.token }
            )
            .pipe(
              map(() => {
                return AuthActions.logout();
              })
            );
        })
      )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
