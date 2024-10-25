import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Testing1Component } from './testing1/testing1.component';
import { FormsComponent } from './forms/forms.component';

const routes: Routes = [
  {path:'',component:Testing1Component},
  {path:'forms',component:FormsComponent},
  {path:'services',component:FormsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestingRoutingModule { }
