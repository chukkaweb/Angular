import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvancedComponent } from './advanced/advanced.component';
import { OperatorsComponent } from './rxjs/operators/operators.component';
import { ObservablesComponent } from './rxjs/observables/observables.component';
import { DynamicformsComponent } from './forms/dynamic-forms/dynamicforms.component';
import { ReactiveFormsComponent } from './forms/reactive-forms/reactive-forms.component';
import { AuthComponent } from './auth/auth.component';
import { SubjectsComponent } from './rxjs/subjects/subjects.component';

const routes: Routes = [
  { path: '', component: AdvancedComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'operators', component: OperatorsComponent },
  { path: 'observables', component: ObservablesComponent },
  { path: 'dynamic-form', component: DynamicformsComponent },
  { path: 'reactive-form', component: ReactiveFormsComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancedRoutingModule {}
