import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  
  registerForm:any = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    comment:['', [Validators.required,Validators.minLength(20),Validators.maxLength(100)]],
    cityName: ['', [Validators.required]]
  });

  state = '';
  countries = [
    {
      id: 'us',
      name: 'United States'
    },
    {
      id: 'uk',
      name: 'United Kingdom'
    },
    {
      id: 'ca',
      name: 'Canada'
    }
  ];
  



public ngOnInit(): void { }

isFieldValid(field: string) {
  return this.registerForm.get(field).invalid && this.registerForm.get(field).touched;
}

get name() { return this.registerForm.get('name'); }
get mobile() { return this.registerForm.get('mobile'); }
get email() { return this.registerForm.get('email'); }
get comment() { return this.registerForm.get('comment'); }
get cityName() { return this.registerForm.get('cityName'); }

onSubmit(){

  if (this.registerForm.invalid) {
    this.validateAllFormFields(this.registerForm);
    return;
    
}
this.onReset();

}

validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {    
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}

onReset(){
  this.registerForm.reset();
}

setValues(){
  this.registerForm.patchValue({
    name:'User',
    comment:'description'
  })
}
}
