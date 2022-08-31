import * as ProductActions from './products-store.actions';

import { Product } from 'src/app/models/product.model';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  products: Product[];
  loading: boolean;
}

const initialState: State = {
  products: [],
  loading: false,
};

const _productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct, (state, action) => {
    return {
      ...state,
      products: [...state.products, action],
      loading: false,
    };
  }),
  on(ProductActions.setProducts, (state, action) => {
    return {
      ...state,
      products: [...state.products, ...action.products],
      loading: false,
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
  }),
  on(ProductActions.storeProductInBase, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ProductActions.fetchProducts, (state) => {
    return {
      ...state,
      loading: true,
    };
  })
);

export function productsReducer(state: State, action: Action) {
  return _productReducer(state, action);
}
