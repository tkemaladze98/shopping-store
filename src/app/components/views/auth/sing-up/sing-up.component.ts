import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  userPassword: string;
  userConfirmpassword: string;
  signupForm: FormGroup;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
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
    this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAImDwLD4ntL-iJeDgqr5H-SVqf4DwqaFA',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).subscribe(responseData => {
      console.log(responseData)
    });
  }
  confirmation(control: FormControl): { [s: string]: boolean } {
    if (control.value !== this.userPassword) {
      return { passwordNotMatch: true };
    }
    return null;
  }
}
