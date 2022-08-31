import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import * as fromApp from '../../../../store/app-store.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent implements OnInit, OnDestroy {
  loading: boolean;
  errorMessage: null | string;
  private storeSub: Subscription;
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.loading = authState.loading;
      this.errorMessage = authState.authError;
    });
  }
  onSubmit(form: NgForm) {
    this.store.dispatch(
      AuthActions.loginStart({
        email: form.value.email,
        password: form.value.password,
      })
    );
    form.reset();
  }
  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
