import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { updateEmail, updateMobile, updateName } from "../actions"

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  constructor(private store:Store){}

  updateName(input:any){
    this.store.dispatch(updateName({name:input.value}));
    input.value = '';
  }

  updateEmail(input:any){
    this.store.dispatch(updateEmail({email:input.value}));
    input.value = '';
  }

  updateMobile(input:any){
    this.store.dispatch(updateMobile({mobile:input.value}));
    input.value = '';
  }
}
