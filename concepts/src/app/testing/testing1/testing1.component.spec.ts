      import { ComponentFixture, TestBed } from '@angular/core/testing';
      import { Testing1Component } from './testing1.component';
      import { RouterModule } from '@angular/router';
      import { NO_ERRORS_SCHEMA } from '@angular/core';
      import { JasmineSpyService } from '../services/jasmine-spy.service';
      //  test method into three sections: arrange, act and assert. It also makes the test more clean and readable.

      // describe - define test suite, Create a group of specs (often called a suite)
      describe('Testing1Component', () => { // describe() function block define a test suite (the group of related tests)
        let component: Testing1Component;
        let fixture: ComponentFixture<Testing1Component>; // The ComponentFixture properties and methods provide access to the component, its DOM representation, and aspects of its Angular environment.
        let jasmineSpy:jasmine.SpyObj<JasmineSpyService>

  beforeEach(async () => {
          // const spy = jasmine.createSpyObj('jasmineSpy','getData'); // This line uses Jasmine's createSpyObj function to create a spy object named spy for the MyService class. The second argument is an array of method names that you want to spy on. In this case, it's the getData method. The spy object will have a spy for each method specified in the array.

          await TestBed.configureTestingModule({ // similar to the @ngModule The default testing module is configured with basic declaratives and some Angular service substitutes that every tester needs.
            declarations: [ Testing1Component],
            imports:[RouterModule],
            // providers:[{provide:JasmineSpyService,useValue:spy}],
            schemas:[NO_ERRORS_SCHEMA] // instead of importing dependecy thing like testing header  // ignore all the unrecognized tags while testing the this spec component 
          })

          .compileComponents(); // will help to templateUrls, styles rendering if any change in the dom 
          fixture = TestBed.createComponent(Testing1Component); // Create an instance of a component of type T based on the current TestBed configuration. 
          component = fixture.componentInstance; // The instance of the component class created by TestBed.createComponent.
          jasmineSpy = TestBed.inject(JasmineSpyService) as jasmine.SpyObj<JasmineSpyService>;
          fixture.detectChanges(); //  Angular can't see that you've changed personComponent.name and won't update the name binding until you call detectChanges.
        });

        // it - define an individual unit test case
        it('should create', () => { 
          expect(component).toBeTruthy();
        });

        it('should be text in string', () => {
          expect(component.text).toContain('Testing working');
        });

        // Disable tests / Ignore test insert x before it() // The developer can easily disable test suit or tests without commenting them out but by just pre-pending x to the describe or it functions:
        it('test disable', () => {
          expect(component).toBeTruthy();
        });

        it('should check incremented value is greater than zero', () => {
            // Arrange - dependency injection
            // let counterComponent: Testing1Component = new Testing1Component();
            // Act - call a method/function
            const curCounterValue = 1;
            //  const curCounterValue = counterComponent.increaseCounter();
            // Assert - 3. expect - Create an expectation/assertion for a spec
            expect(curCounterValue).toBeGreaterThan(0);
      })

      xit('should call jasmine spy service getData',()=>{
        // Configure the spy to return a fake value when getData is called
        jasmineSpy.getData.and.returnValue('Fake data');
        // Call the ngOnInit method, which should trigger the MyService.getDat
        component.ngOnInit();
        // Check if MyService.getData was called
        expect(jasmineSpy.getData).toHaveBeenCalled();
        // Check if the component property 'data' is set to the fake value
        expect(component.spyText).toBe('Fake data');
      })


      });

      // --no-watch --no-progress will help not open karma runner (browser)