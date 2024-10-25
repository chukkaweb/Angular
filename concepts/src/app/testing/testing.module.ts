import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestingRoutingModule } from './testing-routing.module';

import { Testing1Component } from './testing1/testing1.component';
import { TestingHeaderComponent } from './testing-header/testing-header.component';
import { FormsComponent } from './forms/forms.component';
import { ServicesComponent } from './services/services.component';

@NgModule({
  declarations: [
    Testing1Component, 
    TestingHeaderComponent, 
    FormsComponent, ServicesComponent
  ],
  imports: [
    CommonModule,
    TestingRoutingModule,
    SharedModule
  ],
  bootstrap:[
    Testing1Component
  ]
})
export class TestingModule { }
