// Jasmine and Karma in Real-Time Projects

// In real-time Angular projects, Jasmine and Karma are typically used to write and run various types of tests to ensure that your code behaves as expected.
// The focus is usually on unit tests, but you can also write integration tests to check how components work together.

// Types of Test Cases You Write Using Jasmine and Karma

// 1. Unit Testing
// - Unit tests focus on testing individual components, services, pipes, or directives to ensure they work in isolation.
// - Examples include testing functions, checking data-binding, and validating methods in a component or service.

// 2. Component Testing
// - Test how the component behaves by simulating user interactions, such as button clicks or input field changes, and ensuring that the DOM updates as expected.
// - You will check component methods, event bindings, and component lifecycle hooks.

// 3. Service Testing
// - In Angular, services are commonly used to fetch data, and you will write test cases to ensure that these services return the expected data.
// - Mocking HTTP requests is common when testing services.

// 4. Directive Testing
// - You can test custom directives to ensure they are manipulating the DOM as expected or triggering certain behaviors when attached to elements.

// 5. Pipe Testing
// - Pipes are used to transform data in templates, and testing them ensures they produce the correct output when given different inputs.

// Simple Test Case Examples Using Jasmine and Karma

// #1. Testing a Component (Unit Test)
// You typically test how a component behaves in isolation.

// Example: Testing a component’s method and DOM changes.
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MyComponent } from './my.component';

// describe('MyComponent', () => {
//   let component: MyComponent;
//   let fixture: ComponentFixture<MyComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [MyComponent]


//     });
//     fixture = TestBed.createComponent(MyComponent);
//     component = fixture.componentInstance;
//   });

//   it('should have a default title', () => {
//     expect(component.title).toBe('Welcome to MyComponent!');
//   });

//   it('should update title after calling updateTitle()', () => {
//     component.updateTitle('New Title');
//     expect(component.title).toBe('New Title');
//   });

//   it('should render updated title in DOM', () => {
//     component.updateTitle('New DOM Title');
//     fixture.detectChanges(); // triggers change detection
//     const compiled = fixture.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('New DOM Title');
//   });

// });


// #2. Testing a Service with HTTP Requests (Service Test)

// In real projects, services often make HTTP calls. We mock these calls when writing tests.
// Example: Testing an HTTP service with a mocked response.

// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { MyService } from './my.service';

// describe('MyService', () => {
//   let service: MyService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [MyService]
//     });
//     service = TestBed.inject(MyService);
//     httpMock = TestBed.inject(HttpTestingController);

// TestBed.inject(MyService):

// This injects an instance of the MyService into the test.
// It’s used to get access to the actual service being tested so you can call its methods.
// MyService is the service that is being tested in this test suite.
// TestBed.inject(HttpTestingController):

// This injects HttpTestingController, a tool provided by Angular to mock HTTP requests.
// You use this to simulate API calls and test how your service interacts with external APIs without actually making real HTTP requests.
//   });

//   it('should fetch data from API', () => {
//     const mockData = [{ id: 1, name: 'John Doe' }];
    
//     service.getData().subscribe(data => {
//       expect(data.length).toBe(1);
//       expect(data).toEqual(mockData);
//     });

//     const req = httpMock.expectOne('https://api.example.com/data');
//     expect(req.request.method).toBe('GET');
//     req.flush(mockData); // Respond with mock data
//   });

//   afterEach(() => {
//     httpMock.verify(); // Ensure no other requests are outstanding
//   });
// });


// #3. Testing a Pipe

// You write tests to ensure that pipes transform data correctly.
// Example: Testing a custom pipe that capitalizes text.

// import { CapitalizePipe } from './capitalize.pipe';
// describe('CapitalizePipe', () => {
//   let pipe: CapitalizePipe;
//   beforeEach(() => {
//     pipe = new CapitalizePipe();
//   });

//   it('should capitalize the first letter of each word', () => {
//     expect(pipe.transform('hello world')).toBe('Hello World');
//   });

//   it('should return empty string for null input', () => {
//     expect(pipe.transform(null)).toBe('');
//   });
// });


// #4. Testing a Custom Directive

// If you have custom directives that manipulate DOM elements, you can write test cases to ensure that they behave as expected.

// Example: Testing a directive that changes text color.
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { HighlightDirective } from './highlight.directive';
// import { Component } from '@angular/core';

// @Component({
//   template: `<p appHighlight="yellow">Highlight me!</p>`
// })
// class TestComponent {}

// describe('HighlightDirective', () => {
//   let fixture: ComponentFixture<TestComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [HighlightDirective, TestComponent]
//     });
//     fixture = TestBed.createComponent(TestComponent);
//     fixture.detectChanges(); // Apply the directive
//   });

//   it('should change background color to yellow', () => {
//     const el = fixture.debugElement.query(By.css('p'));
//     expect(el.nativeElement.style.backgroundColor).toBe('yellow');
//   });
// });



// Karma in the Testing Process
// - Karma is the test runner that launches the browser and runs the test cases written using Jasmine.
// - In a real project, Karma is configured to run the tests automatically whenever files are changed (using `ng test` in Angular projects).
  
// Karma Features:
// 1. Cross-Browser Testing: Karma can run tests in multiple browsers (e.g., Chrome, Firefox) to ensure compatibility.
// 2. Continuous Testing: Karma can be integrated with CI tools (Jenkins, Travis) for automated test execution.


// Conclusion: Jasmine and Karma in Real-Time Projects

// - Unit Tests: You write unit tests to test individual functions, components, services, directives, and pipes.
// - Karma is used as the test runner to execute these tests in real browsers and ensure cross-browser compatibility.
// - Jasmine provides the framework to write assertions, create spies (mocks), and organize tests in `describe` blocks.

// By ensuring you write and run comprehensive tests, you can maintain the reliability and stability of your Angular codebase in real-time projects.