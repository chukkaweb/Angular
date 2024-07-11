import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedRoutingModule } from './advanced-routing.module';
import { AdvancedComponent } from './advanced/advanced.component';
import { ObservablesComponent } from './rxjs/observables/observables.component';
import { OperatorsComponent } from './rxjs/operators/operators.component';
import { SubjectsComponent } from './rxjs/subjects/subjects.component';


@NgModule({
  declarations: [
    AdvancedComponent,
    ObservablesComponent,
    OperatorsComponent,
    SubjectsComponent
  ],
  imports: [
    CommonModule,
    AdvancedRoutingModule
  ]
})
export class AdvancedModule { }
