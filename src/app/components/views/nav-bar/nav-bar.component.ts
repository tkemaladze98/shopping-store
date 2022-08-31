import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import * as fromApp from '../../../store/app-store.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  user: User;
  userEmail: string;
  isOpen: boolean = false;
  userSub: Subscription;
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.userSub = this.store.select('auth').subscribe((authState) => {
      if (authState.user) {
        this.user = authState.user;
        this.userEmail = authState.user.email;
      } else {
        this.user = null;
        this.userEmail = null;
      }
    });
  }
  onLogin() {
    this.router.navigate(['/sign-in']);
  }
  onSignup() {
    this.router.navigate(['/sign-up']);
  }
  onClick() {
    this.isOpen = !this.isOpen;
  }
  onLogOut() {
    this.store.dispatch(AuthActions.logout());
    this.isOpen = false;
  }
  goToMyProducts() {
    this.router.navigate(['/my-products']);
  }
  onDeleteProfile() {
    // console.log(this.user.token)
    this.store.dispatch(AuthActions.deleteProfile({ token: this.user.token }));
  }
  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
