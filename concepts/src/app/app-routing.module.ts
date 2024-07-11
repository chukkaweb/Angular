import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'basic', loadChildren: () => import('./basics/basic.module').then(m => m.BasicModule) },
  { path: 'advanced', loadChildren: () => import('./advanced/advanced.module').then(m => m.AdvancedModule) },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
