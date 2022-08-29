import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent {
  constructor(private http: HttpClient) {}


  onSubmit(form: NgForm) {
    this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAImDwLD4ntL-iJeDgqr5H-SVqf4DwqaFA',
      {
        email: form.value.email,
        password: form.value.password,
        returnSecureToken: true,
      }
    ).subscribe(responseData =>{
      console.log(responseData)
    });
  }
}
