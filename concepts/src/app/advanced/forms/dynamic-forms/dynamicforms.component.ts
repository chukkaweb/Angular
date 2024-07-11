import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray,Validators, FormBuilder } from '@angular/forms'  

@Component({
  selector: 'app-dynamicforms',
  templateUrl: './dynamicforms.component.html',
  styleUrls: ['./dynamicforms.component.scss']
})
export class DynamicformsComponent implements OnInit {
  productForm:any = FormGroup;  
  submitMsg = '';
  isAddProduct = false;
  productsTypes = ['Grocery','Toys','Appliances','Jewellery']

  constructor(private fb:FormBuilder) {
    this.productForm = this.fb.group({        
      products: this.fb.array([]) ,  
    });  
   }

  ngOnInit(): void {

    // this.products().push(this.addItem());
  }

  products() : FormArray {  

    return this.productForm.get("products") as FormArray
    
  }  

  addQuantity() { 
    this.isAddProduct = true;
    this.products().push(this.newQuantity());
  }  

  newQuantity(): FormGroup {  
    return this.fb.group({  
      type:'',
      qty: ['', Validators.required],  
      price: ['', Validators.required]
    });
  }  


 
     
  removeQuantity(i:number) {  
    this.products().removeAt(i);  
  }  
     
  onSubmit() {  

    if (this.productForm.invalid) {  
      this.submitMsg = 'Validations required';
      return;
      
  }

  this.submitMsg = 'Submit successfully';
    console.log(this.productForm.value);  
  }  

  changeProduct(e:any){
    this.productForm.patchValue(e.target.value, {
      onlySelf: true
    });
  }
  addItem(): FormGroup {  
    return this.fb.group({  
      type:'Glass',
      qty: '10',  
      price: '20',  
      
    })  
  } 
}


   