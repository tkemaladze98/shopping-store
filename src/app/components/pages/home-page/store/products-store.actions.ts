import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const addProduct = createAction(
  '[Product] Add product',
  props<Product>()
);

export const setProducts = createAction(
  '[Product] Set products',
  props<{
    products: Product[];
  }>()
);

export const fetchProducts = createAction('[Product] Fetch products');

export const deleteProduct = createAction(
  '[Product] Delete Product In Store',
  props<{ key: string }>()
);

export const storeProductInBase = createAction(
  '[Product] Store Product',
  props<Product>()
);

export const updateProductInBase = createAction(
  '[Product] Update Product',
  props<Product>()
);

export const updateProductInStore = createAction(
  '[Product] Update Product In Store',
  props<Product>()
);
