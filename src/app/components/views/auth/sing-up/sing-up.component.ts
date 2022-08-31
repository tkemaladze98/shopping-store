import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app-store.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  userPassword: string;
  userConfirmpassword: string;
  signupForm: FormGroup;
  loading: boolean;
  errorMessage: null | string;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
    this.store.select('auth').subscribe((authState) => {
      this.loading = authState.loading;
      this.errorMessage = authState.authError;
    });
    this.signupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmpassword: new FormControl(null, [
        Validators.required,
        this.confirmation.bind(this),
      ]),
    });
  }
  onSubmit() {
    let email = this.signupForm.get('email').value;
    let password = this.signupForm.get('password').value;
    this.store.dispatch(
      AuthActions.signupStart({ email: email, password: password })
    );
    this.signupForm.reset();
  }
  confirmation(control: FormControl): { [s: string]: boolean } {
    if (control.value !== this.userPassword) {
      return { passwordNotMatch: true };
    }
    return null;
  }
}
