import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import * as ProductsActions from './products-store.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductEffects {
  addProduct$ = createEffect((): Actions<any> => {
    return this.actions$.pipe(
      ofType(ProductsActions.storeProductInBase),
      switchMap((action: Product) => {
        return this.http
          .post<{ name: string }>(
            'https://shopping-store-212a9-default-rtdb.europe-west1.firebasedatabase.app/products.json',
            action
          )
          .pipe(
            map((resData) => {
              return ProductsActions.addProduct({
                ...action,
                key: resData.name,
              });
            })
          );
      })
    );
  });

  fetchProducts$ = createEffect((): Actions<any> => {
    return this.actions$.pipe(
      ofType(ProductsActions.fetchProducts),
      switchMap(() => {
        return this.http
          .get<Product[]>(
            'https://shopping-store-212a9-default-rtdb.europe-west1.firebasedatabase.app/products.json',
            { params: new HttpParams().set('print', 'pretty') }
          )
          .pipe(
            map((resData) => {
              let products = [];
              for (let key in resData) {
                products.push({ ...resData[key], key });
              }
              return products;
            }),
            map((products: Product[]) =>
              ProductsActions.setProducts({ products })
            )
          );
      })
    );
  });

  deleteProduct$ = createEffect(
    (): Actions<any> => {
      return this.actions$.pipe(
        ofType(ProductsActions.deleteProduct),
        switchMap(({ key }) => {
          return this.http.delete(
            `https://shopping-store-212a9-default-rtdb.europe-west1.firebasedatabase.app/products/${key}.json`
          );
        })
      );
    },
    { dispatch: false }
  );

  updateProduct$ = createEffect((): Actions<any> => {
    return this.actions$.pipe(
      ofType(ProductsActions.updateProductInBase),
      switchMap((action: Product) => {
        return this.http
          .put<Product>(
            `https://shopping-store-212a9-default-rtdb.europe-west1.firebasedatabase.app/products/${action.key}.json`,
            action
          )
          .pipe(
            map((resData) => {
              return ProductsActions.updateProductInStore({
                ...resData,
              });
            })
          );
      })
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
