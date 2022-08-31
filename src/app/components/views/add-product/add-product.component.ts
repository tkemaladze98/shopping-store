import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import * as formApp from '../../../store/app-store.reducer';
import * as ProductsActions from '../../pages/home-page/store/products-store.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnDestroy, AfterViewInit {
  @Input() editingProduct: Product;
  @ViewChild('form', { static: false }) productForm: NgForm;
  loading: boolean = false;
  productImages: string[] = [];
  userSub: Subscription;
  constructor(private store: Store<formApp.AppState>, private router: Router) {}

  ngAfterViewInit(): void {
    if (this.editingProduct) {
      setTimeout(() => {
        this.productForm.setValue({
          category: this.editingProduct.category,
          description: this.editingProduct.description,
          images: null,
          name: this.editingProduct.name,
          price: this.editingProduct.price,
        });
        this.productImages = this.editingProduct.images.map((image) => {
          return image;
        });
      }, 0);
    }
  }

  onDeleteImage(index: number) {
    this.productImages = this.productImages.filter((_image, imageIndex) => {
      return imageIndex !== index;
    });
    if (this.productImages.length === 0) {
      this.productForm.form.patchValue({
        images: null,
      });
    }
  }

  uploadMultiFileEvt(event: { target: { files: any } }) {
    let self = this;
    for (let image of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        self.productImages.push(reader.result.toString());
      };
    }
  }
  onSubmit(form: NgForm) {
    let author: string;
    this.userSub = this.store.select('auth').subscribe((authState) => {
      author = authState.user.email;
    });
    const product = { ...form.value, images: this.productImages, author };
    if (!this.editingProduct) {
      this.store.dispatch(ProductsActions.storeProductInBase(product));
    } else {
      product['key'] = this.editingProduct.key;
      this.store.dispatch(ProductsActions.updateProductInBase(product));
      this.router.navigate(['/']);
    }
    form.reset();
    this.productImages = [];
  }
  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
