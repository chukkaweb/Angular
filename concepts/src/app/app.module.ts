import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './advanced/ngrx/basic/reducers/userReducer';
import { useEffectReducer } from './advanced/ngrx/effects/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { userEffect } from './advanced/ngrx/effects/user.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({user:userReducer ,users: useEffectReducer}, {}),
    EffectsModule.forRoot([userEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
