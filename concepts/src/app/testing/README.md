<!--
 # How to write unit tests
// 1. describe - define test suite, Create a group of specs (often called a suite)
describe('Textual description of the group', Function for Jasmine to invoke that will define inner suites specs () => {
 // 2. it - define an individual unit test case
 it('expectation from current test case', () => {
 // 3. expect - Create an expectation/assertion for a spec, expect().matcherFunction();
 expect(expectation).toBe(expected);
 })
})

# Unit test case Flow
The flow of how the test run is shown below
The Angular testing package includes two utilities called TestBed and async.
TestBed is the main Angular utility package.
The describe container contains different blocks (it, beforeEach, xit, etc.). 
beforeEach runs before any other block. Other blocks do not depend on each other to run.
The Angular CLI downloads and installs everything you need to test an Angular application with the Jasmine test framework. The ng test command builds the application in watch mode, and launches the Karma test runner.
There will be multiple things you will notice from the above code snippet, What each of this does is explained below:
We use a “describe” to start our test and we give the name of component that we are testing inside it.
The beforeEach tells the Karma test runner to run this code before every test in the test suit, i.e it().
Inside the beforeEach, we have TestBed.ConfigureTestingModule. What TestBed does is, It sets up the configurations and initializes the environment suitable for our test.
ConfigureTestingModule sets up the module that allows us to test our component. We can say that it creates a module for our test environment and have Declarations, Imports, and Providers inside it.
We declare the component that we test inside the Declarations array. We have to include those of other components If our component of interest has a dependency on them.
In the Provider array, we override the actual service with our spy that we created using Jasmine. Other services that are injected into our component through the constructor are provided directly in this array if we don’t want to spy on them.

## Ng test
If want to run specific folder test case
ng test  --include src\app, >ng test --include src\app\features\scss
Widely used Angular Unit Testing functions / Structure of Unit Test Case:
describe()
it()
expect()

## Various Matcher functions
### describe()
describe() function block define a test suite (the group of related tests)
The describe(string, function) function defines what we call a Test Suite, a collection of individual Test Specs
Usually, with describe block we define/describe - the name of the current component to test

### it()
it() block define a individual spec or test
The it(string, function) function defines an individual Test Spec, this contains one or more Test Expectations
The it block must have proper readable and meaningful statement as a Test Spec/description
With in describe(), we can have one or more it() functions - (group of related test/sepc)
Inside it() block define test/code behavior - expectation/assertion
e.g.
it('test-spec-name', () => { 


})

### expect()
expect() function block is Jasmine API for checking expectation/assertion
The expect(actual) expression is what we call an Expectation
Takes actual value as the parameter
Chained with a Matcher function
In conjunction with a Matcher Function, it describes an expected piece of behavior in the application
e.g.
expect(something).matcherFunction(value expected)

# Jasmine comes with a rich set of pre-built matchers like:
expect(actual).toBe(expected): This matcher compares the actual value with the expected value using strict equality (===). It ensures that the actual value is exactly equal to the expected value.

expect(actual).toEqual(expected): This matcher performs a deep equality check between the actual and expected values. It compares the properties and values of objects and arrays recursively.
expect(actual).not.toBe(expected): This matcher is the negation of toBe. It asserts that the actual value is not equal to the expected value.
expect(actual).toContain(expected): This matcher checks whether the actual value contains the expected value. It works with arrays, strings, and other iterables.
expect(actual).toMatch(pattern): This matcher checks whether the actual value matches the specified regular expression pattern.
expect(actual).toThrow(): This matcher verifies that a function invocation throws an exception. You can also provide a specific error message or a regular expression pattern to match against the thrown error.
expect(actual).toHaveBeenCalled(): This matcher checks whether a spy or mock function has been called.
expect(actual).toHaveBeenCalledTimes(expected): This matcher verifies the number of times a spy or mock function has been called.
expect(actual).toHaveBeenCalledBefore(expected): This matcher checks whether a spy or mock function has been called before another spy or mock function.
expect(actual).toHaveBeenCalledWith(...args): This matcher verifies that a spy or mock function has been called with specific arguments.
expect(actual).toBeDefined(): This matcher checks whether the actual value is defined.
expect(actual).toBeFalsy(): This matcher verifies that the actual value is falsy (e.g., false, 0, null, undefined).
expect(actual).toBeTruthy(): This matcher checks whether the actual value is truthy (e.g., true, non-zero number, non-empty string).
expect(actual).toBeGreaterThan(expected): This matcher asserts that the actual value is greater than the expected value.
expect(actual).toBeLessThan(expected): This matcher verifies that the actual value is less than the expected value.
expect(actual).toThrowError(expected): This matcher checks whether a function invocation throws an error with a specific message or matching a regular expression pattern.
expect(actual).toHaveClass(className): This matcher asserts that the actual DOM element has the specified CSS class.
expect(actual).toHaveStyle(styles): This matcher verifies that the actual DOM element has the specified CSS styles.

# Tripple A - AAA - 3A - Arrang, Act and Assert pattern/structure
The AAA (Arrange, Act, Assert) pattern/structure is a common way of writing unit tests for a method under test. It suggests that you should divide your test method into three sections: arrange, act and assert. It also makes the test more clean and readable.

## Arrange:
Set up the necessary preconditions and inputs for the unit being tested. This may involve creating mock objects or configuring test data.
Initialize system under test
The Arrange section of a unit test method initializes objects and sets the value of the data that is passed to the method under test
let component = new ComponentToCheck();

## Act:
Execute the unit of code being tested, usually by calling a function or method.
Calling a method/function which perform some activity
component.methodFunction();

## Assert:
Verify the actual output or behavior of the unit matches the expected outcome. Use assertions to validate specific conditions or expectations.
The fact to check/test

The Assert section verifies that the action of the method under test behaves as expected
expect(var-name).toBe(value);
expect(var-name).toContain(value);

## Example
import { CounterComponent } from "./01-counter";
describe('ArrangeActAssertCounterComponent', () => {
 it('should check incremented value is greater than zero', () => {
 // Arrange - dependency injection
 let counterComponent: CounterComponent = new CounterComponent();
 // Act - call a method/function
 const curCounterValue = counterComponent.increaseCounter();
 // Assert - 3. expect - Create an expectation/assertion for a spec
 expect(curCounterValue).toBeGreaterThan(0);
 })

 ## Example2
 it('should check decremented value is less than zero', () => {
 // Arrange - dependency injection
 let counterComponent: CounterComponent = new CounterComponent();
 // Act - call a method/function
 const curCounterValue = counterComponent.decreaseCounter();
 // Assert - 3. expect - Create an expectation/assertion for a spec
 expect(curCounterValue).toBeLessThan(0);
 })
})


# Disable tests / Ignore test
To disable test put/use/insert x before it() function block, it will prevent running that particular specs/test scripts
In the below scenario, 2nd test case with x will be ignored/disabled
it ('should check incremented value is greater than zero ', ()=> { })
xit ('should check decremented value is less than zero ', ()=> { })


# By.css()
const bannerDe: DebugElement = fixture.debugElement;
 const paragraphDe = bannerDe.query(By.css('p'));
Some noteworthy observations:
The By.css() static method selects DebugElement nodes with a standard CSS selector.
The query returns a DebugElement for the paragraph.
You must unwrap that result to get the paragraph element.


# debugElement
The DebugElement associated with the root element of the component.
The debugElement provides insight into the component and its DOM element during test and debugging. It's a critical property for testers. The most interesting members are covered below.

# nativeElement
The native DOM element at the root of the component.
The corresponding DOM element in the browser

# isStable
If the fixture is currently stable, returns true. If there are async tasks that have not completed, returns false.

# whenStable
Returns a promise that resolves when the fixture is stable.
To resume testing after completion of asynchronous activity or asynchronous change detection, hook that promise. See whenStable.


# ng test --no-watch --no-progress

# code-coverage
ng test --codeCoverage OR
ng test --code-coverage
Generate the code-coverage report at the same time close Karma test window (don't watch unit test cases):
ng test --no-watch --code-coverage
ng test --watch=false --code-coverage

# ng test --no-watch --code-coverage(To generate a coverage report)

## Output:
Angular CLI generates the coverage report in a separate folder called coverage at the root
Every folder in the coverage/src/app has his index.html, we can load that in the browser to see the actual report for that particular folder or module
coverage/index.html: To check the final report on code coverage of every individual component or page/files or folders
coverage/src/index.html: Shows report of polyfills.ts and test.ts

# jasmine matchers 
## toBe(true)
Matcher function performs the test: actual === expected
Syntax: expect(flag).toBe(true | false)
This test passes only if flag has the value true,
in the case of expect(flag).toBe(true).

## toBeTrue()
Matcher function performs the test: (actual === true || is(actual, 'Boolean') && actual.valueOf())
Syntax: expect(flag).toBeTrue()
This function behaves the same way as toBe(true) but handles an additional case.
toBe(true) ➜ only handles a primitive boolean type.

## ToBeTruthy()
This Boolean matcher is used in Jasmine to check whether the result is equal to true or false.

## toBeFalsy()
toBeFalsy() also works the same way as toBeTruthy() method. It matches the output to be false whereas toBeTruthy matches the output to be true.

expect(true).toBeTruthy(); // true
expect('1').toBeTruthy(); // true
expect(0).toBeTruthy(); // false
expect(undefined).toBeTruthy(); // false
expect(NaN).toBeTruthy(); // false
expect(false).toBeTruthy(); // false
expect('').toBeTruthy(); // false

## toBeGreaterThan() ,toBeGreaterThanOrEqual() ,toBeLessThan() ,toBeLessThanOrEqual() Matcher
toBeGreaterThan( expectedValue )
toBeGreaterThan(expectedValue) is a comparison function that evaluates to true or false.
toBeGreaterThanOrEqual( expectedValue )
toBeGreaterThanOrEqual(expectedValue) is a comparison function that evaluates to true or false.
toBeLessThan( expectedValue )
toBeLessThan(expectedValue) is a comparison function that evaluates to true or false.
toBeLessThanOrEqual( expectedValue )
toBeLessThanOrEqual(expectedValue) is a comparison function that evaluates to true or false.
toMatch() and toBeCloseTo() Jasmin Matcher
toMatch() and toBeCloseTo() Jasmin Matcher

## ToMatch()
The 'toMatch' matcher should be applied successfully for regular expressions
it('Jasmin Matcher - Match function', () =>{
var input = "The dotnetoffice tutorials";
var strPhone = "001-789-56-67";
expect(input).toMatch(/dotnetoffice/);
expect(input).toMatch(/dotnetoffice/i);
expect(input).not.toMatch(/dot1/);
expect(strPhone).toMatch(/\d{3}-\d{3}-\d{2}-\d{2}/);
})

## toBeCloseTo()
This matcher is used to check whether a number is close to another number, up to a given level of decimal precision.
In our case, we checked whether the expected number was equal to the actual number with a given level of decimal precision.
it('Jasmin Matcher - toBeCloseTo ', () =>{
var pi = 3.1415926, e = 2.78;
expect(pi).not.toBeCloseTo(e);
expect(pi).toBeCloseTo(e,0);
expect(4.334).toBeCloseTo(4.334);
expect(4.334).toBeCloseTo(4.3345,1);
expect(4.334).toBeCloseTo(4.3345,2);
expect(4.334).not.toBeCloseTo(4.3,2);
expect(4.223).not.toBeCloseTo(4.22,3);
expect(4.223).not.toBeCloseTo(4.22,4);
})

## toBeDefined and toBeUndefined Jasmine matcher
toBeDefined()
The 'toBeDefined' matcher should be applied successfully to compares against defined
it("Jasmine matcher - toBeDefined", function() {
var MyObj = {
foo: "foo"
};
var Myfunction = (function() {})();
var strUndefined;
expect("The Dotnet office").toBeDefined();
expect(MyObj).toBeDefined();
expect(MyObj.foo).toBeDefined();
expect(Myfunction).not.toBeDefined();
expect(strUndefined).not.toBeDefined();
});

## 'toBeUndefined()
The 'toBeUndefined' matcher should be applied successfully to compares against undefined
it("Jasmine matcher - toBeUnDefined", function() {
var MyObj = {
foo: "foo"
}
var Myfunction = (function() {})();
var strUndefined;
expect(MyObj).not.toBeUndefined();
expect(MyObj.foo).not.toBeUndefined();     
expect(Myfunction).toBeUndefined();
expect(strUndefined).toBeUndefined();
});

## tobenull() ,tocontain() ,tobeNan() , toBePositiveInfinity, toBeNegetiveInfinity matcher
'toBeNull()
The 'toBeNull' matcher should be applied successfully to compare against null



it("Jasmine matcher - toBeNull", function() {
  var nullValue = null;
  var valueUndefined;
  var notNull = "notNull";
  expect(null).toBeNull();
  expect(nullValue).toBeNull();
  expect(valueUndefined).not.toBeNull();
  expect(notNull).not.toBeNull();
}); 

## 'toContain()
The 'toContain' matcher should be applied successfully for finding an item in an array
it("Jasmine matcher -toContain ", function() {
  var MyArray = ["jasmine", "Dotnetoffice", "Tutorials"];
    expect([1, 2, 3]).toContain[2];
    expect([1, 2, 3]).toContain(2,3);
    expect(MyArray).toContain["jasmine"];
    expect([1, 2, 3]).not.toContain(4);
    expect(MyArray).not.toContain("dot");
});

## tobeNan()
The tobeNan' matcher should be applied successfully for finding an Un-determined value
it("Jasmine matcher - tobeNan ", function() {
    expect(0 / 0).toBeNaN();
      expect(0 / 5).not.toBeNaN();

## toBePositiveInfinity()
The toBePositiveInfinity ' matcher should be applied successfully for finding an Positive infinity value
it("Jasmine matcher - toBePositiveInfinity ", function() {
 expect(1 / 0).toBePositiveInfinity();
}); });


## BeforeEach and AfterEach Jasmine functions | Angular unit test case Tutorials with Jasmine
beforeEach() is run before each test in a describe
afterEach()   is run after each test in a describe
BeforeAll and AfterAll in Jasmin Method | Angular unit test case Tutorials with Jasmine
beforeAll() The beforeAll function executes once and only once for the describe block containing it, just before the any block run.
AfterAll() The beforeAll function executes once and only once for the describe block containing it, just All After the block run.

 TestBed and Component Fixture | Angular unit test case Tutorials with Jasmine & Karma
The Angular Test Bed (ATB) is a higher level Angular Only testing framework that allows us to easily test behaviors that depend on the Angular Framework.
We still write our tests in Jasmine and run using Karma but we now have a slightly easier way to create components, handle injection, test asynchronous behaviour and interact with our application.

## When to Use ATB
It allows us to test the interaction of a directive or component with its template.
It allows us to easily test change detection.
It provide methods to create components and services for unit test case.
It allows us to test and use Angular’s DI framework.
It allows us to test using the NgModule configuration we use in our application.
It allows us to test user interaction via clicks and input fields

## SpyOn to mock and Stub methods in angular unit test
Jasmine Spies help  us to mock the execution of the Angular method.
It’s a easy way to check a method was called or not, without leaving Subject Under Test(SUT).
We can chain the spyOn method to get dummy return value using .and.returnvalue()
spyOn can call the original function using .and.callThrough().
Stub: a dummy piece of code that lets the test run, but you don't care what happens to it.
Mock: a dummy piece of code, that you VERIFY is called correctly as part of the test.
Spy: a dummy piece of code, that intercepts some calls to a real piece of code, allowing you to verify calls without replacing the entire original object.
Change Detection is the backbone of the Angular framework, and each component has its own change detector.
Angular can detect when data changes in the component, and can re-render the view to display the updated data. Angular makes sure that data in the component and the view are always in sync with each other.
Change detection means updating the view whenever data changed.
Fixeture.detectChanges -🡪 to Identify the DOM element change 

## Debug Element & DOM events in angular unit test
DebugElement is an Angular class that contains all kinds of references and methods relevant to investigate an element as well as component fixture.debugElement.query(By.css(‘#h1’))
Instead of creating an HTML element tree, Angular creates a DebugElement tree that wraps the native elements for the runtime platform.
The nativeElement property unwraps the DebugElement and returns the platform-specific element object.
nativeElement returns a reference to the DOM element.
triggerEventHandler is a function that exists on Angular's DebugElement.


 -->
