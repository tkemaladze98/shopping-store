import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private router: Router) {}

  onLogin(){
    this.router.navigate(['/sign-in'])
  }
  onSignup(){
    this.router.navigate(['/sign-up'])
  }
}
