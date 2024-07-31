import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdvancedRoutingModule } from './advanced-routing.module';
import { AdvancedComponent } from './advanced/advanced.component';
import { ObservablesComponent } from './rxjs/observables/observables.component';
import { OperatorsComponent } from './rxjs/operators/operators.component';
import { SubjectsComponent } from './rxjs/subjects/subjects.component';
import { SharedModule } from '../shared/shared.module';
import { DynamicformsComponent } from './forms/dynamic-forms/dynamicforms.component';
import { ReactiveFormsComponent } from './forms/reactive-forms/reactive-forms.component';
import { ChangeDetectionComponent } from './change-detection/change-detection.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AdvancedComponent,
    ObservablesComponent,
    OperatorsComponent,
    SubjectsComponent,
    DynamicformsComponent,
    ReactiveFormsComponent,
    ChangeDetectionComponent,
    AuthComponent
  ],
  imports: [CommonModule, SharedModule, AdvancedRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class AdvancedModule { }
