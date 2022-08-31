import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioSystemsComponent } from './components/pages/audio-systems/audio-systems.component';
import { ComputersAndAccsComponent } from './components/pages/computers-and-accs/computers-and-accs.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { MobilesAndAccsComponent } from './components/pages/mobiles-and-accs/mobiles-and-accs.component';
import { TvPageComponent } from './components/pages/tv-page/tv-page.component';
import { AddProductComponent } from './components/views/add-product/add-product.component';
import { AuthGuardGuard } from './components/views/auth/auth-guard.guard';
import { SingInComponent } from './components/views/auth/sing-in/sing-in.component';
import { SingUpComponent } from './components/views/auth/sing-up/sing-up.component';
import { MyProductsComponent } from './components/views/my-products/my-products.component';
import { ProductEditComponent } from './components/views/product-edit/product-edit.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'mobiles', component: MobilesAndAccsComponent },
  { path: 'computers', component: ComputersAndAccsComponent },
  { path: 'audios', component: AudioSystemsComponent },
  { path: 'tv', component: TvPageComponent },
  { path: 'sign-in', component: SingInComponent },
  { path: 'sign-up', component: SingUpComponent },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: 'product-edit', component: ProductEditComponent },
  {
    path: 'my-products',
    component: MyProductsComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
