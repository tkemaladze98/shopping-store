import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as fromApp from './store/app-store.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/views/nav-bar/nav-bar.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { MobilesAndAccsComponent } from './components/pages/mobiles-and-accs/mobiles-and-accs.component';
import { ComputersAndAccsComponent } from './components/pages/computers-and-accs/computers-and-accs.component';
import { AudioSystemsComponent } from './components/pages/audio-systems/audio-systems.component';
import { TvPageComponent } from './components/pages/tv-page/tv-page.component';
import { SingInComponent } from './components/views/auth/sing-in/sing-in.component';
import { SingUpComponent } from './components/views/auth/sing-up/sing-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './components/views/auth/store/auth.effects';
import { DropDownDirective } from './directives/drop-down.directive';
import { AddProductComponent } from './components/views/add-product/add-product.component';
import { ProductEffects } from './components/pages/home-page/store/products-store.effects';
import { ProductCardComponent } from './components/shared-components/product-card/product-card.component';
import { MyProductsComponent } from './components/views/my-products/my-products.component';
import { CardsSectionComponent } from './components/shared-components/cards-section/cards-section.component';
import { ProductEditComponent } from './components/views/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    MobilesAndAccsComponent,
    ComputersAndAccsComponent,
    AudioSystemsComponent,
    TvPageComponent,
    SingInComponent,
    SingUpComponent,
    DropDownDirective,
    AddProductComponent,
    ProductCardComponent,
    MyProductsComponent,
    CardsSectionComponent,
    ProductEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, ProductEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
