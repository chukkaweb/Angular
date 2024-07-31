import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicRoutingModule } from './basic-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ParentComponent } from './communication/parent/parent.component';
import { ChildComponent } from './communication/child/child.component';
import { ComponentLifecycleComponent } from './component-lifecycle/component-lifecycle.component';


@NgModule({
  declarations: [
    ParentComponent,
    ChildComponent,
    ComponentLifecycleComponent
  ],
  imports: [
    CommonModule,
    BasicRoutingModule,
    SharedModule,
  ]
})
export class BasicModule { }
