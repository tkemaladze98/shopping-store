import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
