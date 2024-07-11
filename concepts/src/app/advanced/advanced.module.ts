import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedRoutingModule } from './advanced-routing.module';
import { AdvancedComponent } from './advanced/advanced.component';
import { ObservablesComponent } from './rxjs/observables/observables.component';
import { OperatorsComponent } from './rxjs/operators/operators.component';
import { SubjectsComponent } from './rxjs/subjects/subjects.component';
import { SharedModule } from '../shared/shared.module';
import { DynamicformsComponent } from './forms/dynamic-forms/dynamicforms.component';
import { ReactiveFormsComponent } from './forms/reactive-forms/reactive-forms.component';

@NgModule({
  declarations: [
    AdvancedComponent,
    ObservablesComponent,
    OperatorsComponent,
    SubjectsComponent,
    DynamicformsComponent,
    ReactiveFormsComponent,
  ],
  imports: [CommonModule, SharedModule, AdvancedRoutingModule],
})
export class AdvancedModule {}
