import { ActionReducerMap, Store } from '@ngrx/store';

import * as fromAuth from '../components/views/auth/store/auth.reducer';
import * as fromProducts from '../components/pages/home-page/store/products-store.reducer';

export interface AppState {
  auth: fromAuth.State;
  products: fromProducts.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  products: fromProducts.productsReducer,
};
