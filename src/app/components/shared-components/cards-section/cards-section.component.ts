import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import * as fromApp from '../../../store/app-store.reducer';

@Component({
  selector: 'app-cards-section',
  templateUrl: './cards-section.component.html',
  styleUrls: ['./cards-section.component.scss'],
})
export class CardsSectionComponent implements OnInit {
  @Input() title: string;
  @Input() category: string;
  @Input() myProducts: boolean = false;
  products: Product[];
  currentUserEmail: string;
  productSub: Subscription;
  userSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store.select('auth').subscribe((authState) => {
      if (authState.user) {
        this.currentUserEmail = authState.user.email;
      }
    });
    this.productSub = this.store
      .select('products')
      .subscribe((productState) => {
        if (this.category) {
          this.products = productState.products.filter((product) => {
            return product.category === this.category;
          });
        } else if (!this.category && !this.myProducts) {
          this.products = productState.products;
        } else if (this.myProducts) {
          this.products = productState.products.filter((product) => {
            return product.author === this.currentUserEmail;
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
