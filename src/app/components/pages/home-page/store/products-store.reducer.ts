import * as ProductActions from './products-store.actions';

import { Product } from 'src/app/models/product.model';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  products: Product[];
}

const initialState: State = {
  products: [],
};

const _productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct, (state, action) => {
    return {
      ...state,
      products: [...state.products, action],
    };
  }),
  on(ProductActions.setProducts, (state, action) => {
    return {
      ...state,
      products: [...state.products, ...action.products],
    };
  }),
  on(ProductActions.deleteProduct, (state, action) => {
    return {
      ...state,
      products: state.products.filter((product) => {
        return product.key !== action.key;
      }),
    };
  }),
  on(ProductActions.updateProductInStore, (state, action) => {
    return {
      ...state,
      products: state.products.map((product) => {
        if (product.key === action.key) {
          product = action;
        }
        return product;
      }),
    };
  })
);

export function productsReducer(state: State, action: Action) {
  return _productReducer(state, action);
}
