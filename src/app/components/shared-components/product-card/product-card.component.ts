import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

import * as fromApp from '../../../store/app-store.reducer';
import * as ProductActions from '../../pages/home-page/store/products-store.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() productId: number;
  @Input() currentUserEmail: string;
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  onDelete(key: string) {
    this.store.dispatch(ProductActions.deleteProduct({ key }));
  }
  onEdit(key: string) {
    this.router.navigate(['/product-edit'], { queryParams: { product: key } });
  }
}
