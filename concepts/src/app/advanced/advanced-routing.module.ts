import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedComponent } from './advanced/advanced.component';
import { OperatorsComponent } from './rxjs/operators/operators.component';
import { ObservablesComponent } from './rxjs/observables/observables.component';
import { DynamicformsComponent } from './forms/dynamic-forms/dynamicforms.component';
import { ReactiveFormsComponent } from './forms/reactive-forms/reactive-forms.component';

const routes: Routes = [
  { path: '', component: AdvancedComponent },
  { path: 'operators', component: OperatorsComponent },
  { path: 'observables', component: ObservablesComponent },
  { path: 'dynamic-form', component: DynamicformsComponent },
  { path: 'reactive-form', component: ReactiveFormsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancedRoutingModule {}
