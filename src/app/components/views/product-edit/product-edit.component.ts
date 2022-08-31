import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import * as fromApp from '../../../store/app-store.reducer';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  product: Product;
  selectedProductKey: string;
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => {
          return params.product;
        }),
        switchMap((key) => {
          this.selectedProductKey = key;
          return this.store.select('products');
        }),
        map((productsState) => {
          return productsState.products.find((product) => {
            return product.key === this.selectedProductKey;
          });
        })
      )
      .subscribe((product) => {
        this.product = product;
      });
  }
}
