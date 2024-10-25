import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsComponent } from './forms.component';

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;
  let form:any;

  beforeEach(async () => {
    // Call configureTestingModule to refine the testing module configuration for a particular set of tests by adding and removing imports, declarations (of components, directives, and pipes), and providers.
    await TestBed.configureTestingModule({
      declarations: [ FormsComponent ],
      imports:[SharedModule]
    })
    .compileComponents(); // Compile the testing module asynchronously after you've finished configuring it. 
    // You must call this method if any of the testing module components have a templateUrl or styleUrls because fetching component template and style files is necessarily asynchronous. 

    fixture = TestBed.createComponent(FormsComponent); // creates an instance of the FormsComponent, adds a corresponding element to
    // test-runner DOM, and returns a ComponentFixture.
    
    component = fixture.componentInstance; // Access the component instance through the fixture and confirm it exists with a Jasmine expectation:
    fixture.detectChanges(); // Trigger a change detection cycle for the component.
    // Call it to initialize the component (it calls ngOnInit) and after your test code, change the component's data bound property values. Angular can't see that you've changed personComponent.name and won't update the name binding until you call detectChanges.
    // Runs checkNoChanges afterwards to confirm that there are no circular updates unless called as detectChanges(false);
    
    form = component.customerForm;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the form when submitted with empty fields', () => {
    component.onSubmit();
    expect(form.valid).toBeFalsy();
  });

  it('should validate the form when all required fields are filled', () => {
    expect(form.valid).toBeFalsy();
    form.controls['customerName'].setValue('ganesh');
    form.controls['customerAadhar'].setValue('123456789012');
    form.controls['address'].setValue('123 Main Street');
    form.controls['phoneNumber'].setValue('1234567890');
    form.controls['customerMail'].setValue('test@example.com');
    form.controls['state'].setValue('California');
    expect(form.valid).toBeTruthy();
  });

  
  it('should invalidate the form when phoneNumber field contains non-numeric characters', () => {
    expect(form.valid).toBeFalsy();
    form.controls['phoneNumber'].setValue('1234567890abc');
    expect(form.valid).toBeFalsy();
  });

  it('should invalidate the form when customerMail field is not a valid email', () => {
    form.controls['customerMail'].setValue('test');
    expect(form.valid).toBeFalsy();
  });


});



