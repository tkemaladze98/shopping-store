import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as ProductAction from './components/pages/home-page/store/products-store.actions';
import * as AuthActions from './components/views/auth/store/auth.actions';
import * as fromApp from './store/app-store.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shoppingStore';
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
    this.store.dispatch(ProductAction.fetchProducts());
  }
}
