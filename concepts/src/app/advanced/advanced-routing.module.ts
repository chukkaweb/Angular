import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedComponent } from './advanced/advanced.component';
import { OperatorsComponent } from './rxjs/operators/operators.component';

const routes: Routes = [
  { path:'', component: AdvancedComponent },
  { path:'operators', component: OperatorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedRoutingModule { }
