In Angular unit tests, mocking API calls is done to test the component or service's behavior without actually making HTTP requests.
This is usually done using the HttpClientTestingModule and HttpTestingController, which allow you to intercept and mock HTTP requests.

Here’s a step-by-step guide on how to mock API calls in Angular unit tests:

---

1. Import Required Testing Modules

To mock HTTP requests, you need to import `HttpClientTestingModule` and use `HttpTestingController`.

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service'; // The service that makes API calls


---

2. Set Up the TestBed for the Component/Service

In your test suite, use `TestBed.configureTestingModule` to configure the testing environment. Include the `HttpClientTestingModule` to mock HTTP requests.


describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController
  });

  afterEach(() => {
    // Verify no outstanding requests remain
    httpMock.verify();
  });
});


---

3. Mocking the API Call in the Test
Now, mock an API call using `HttpTestingController` by providing a mock response to your HTTP request.
Example: Mocking a GET request

it('should fetch users via GET', () => {
  const mockUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  // Call the method that triggers the HTTP request
  service.getUsers().subscribe((users) => {
    expect(users.length).toBe(2);
    expect(users).toEqual(mockUsers); // Assert that the response is as expected
  });

  // Expect an HTTP GET request to the URL specified in the service
  const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
  expect(req.request.method).toBe('GET');

  // Provide the mock response
  req.flush(mockUsers);
});


Explanation:
1. `expectOne()`: Verifies that an HTTP request to the specified URL is made.
2. `req.flush(mockUsers)`: Provides a mock response (in this case, a list of users) that the `HttpClient` will receive.
3. `expect(req.request.method).toBe('GET')`: Verifies that the HTTP method is a `GET` request.
4. `httpMock.verify()`: Ensures there are no outstanding requests after each test.

---

4. Mocking a POST Request

Example: Mocking a POST request


it('should add a new user via POST', () => {
  const newUser = { id: 3, name: 'Charlie' };

  // Call the method that triggers the HTTP POST request
  service.addUser(newUser).subscribe((user) => {
    expect(user).toEqual(newUser); // Check that the response is correct
  });

  // Expect a POST request
  const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
  expect(req.request.method).toBe('POST');

  // Provide the mock response
  req.flush(newUser);
});


Explanation:
1. `expectOne()`: Verifies that the POST request is sent to the correct URL.
2. `req.flush(newUser)`: Mocks the server's response, which will be passed to the subscription callback.
3. `expect(req.request.method).toBe('POST')`: Verifies the request is a `POST` request.

---

5. Mocking Error Responses

You can also simulate error responses to check how your service or component handles them.

Example: Simulating an Error Response


it('should handle error response', () => {
  const errorMessage = 'Failed to load users';

  // Call the method that triggers the HTTP request
  service.getUsers().subscribe(
    () => fail('Expected an error, not users'),
    (error) => {
      expect(error.status).toBe(500); // Check that error status is 500
      expect(error.error).toBe(errorMessage); // Check the error message
    }
  );

  // Expect a GET request
  const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
  expect(req.request.method).toBe('GET');

  // Provide the error response
  req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
});


Explanation:
1. `req.flush()`: Instead of passing data, you can pass an error message and the HTTP status code.
2. Handling the error: The second argument in the `subscribe()` method is executed if the request fails, allowing you to test error handling.

---

6. Handling Multiple Requests

If your test case triggers multiple API calls, you can use `expectOne()` multiple times or `match()` to handle all of them.

Example: Matching Multiple Requests


it('should handle multiple requests', () => {
  const mockUsers = [{ id: 1, name: 'Alice' }];
  const mockPosts = [{ id: 1, title: 'Post 1' }];

  // Trigger multiple API calls
  service.getUsers().subscribe((users) => {
    expect(users).toEqual(mockUsers);
  });

  service.getPosts().subscribe((posts) => {
    expect(posts).toEqual(mockPosts);
  });

  // Handle both requests
  const userReq = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
  const postReq = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');

  // Provide responses
  userReq.flush(mockUsers);
  postReq.flush(mockPosts);
});


Explanation:
- `expectOne()`: Called multiple times to verify and handle both requests.
- You can also use `match()` if you expect multiple requests of the same type.

---

7. Clean Up After Tests

After each test, always call `httpMock.verify()` to ensure no pending HTTP requests remain. This helps prevent unintentional side effects between tests.


afterEach(() => {
  httpMock.verify(); // Ensures no open requests
});


---

Summary of Steps:
1. Import `HttpClientTestingModule` and `HttpTestingController` in your test.
2. Inject `HttpTestingController` to intercept and mock HTTP requests.
3. Use `expectOne()` to verify that the HTTP request was made.
4. Use `req.flush()` to provide mock data or error responses.
5. Clean up after each test by calling `httpMock.verify()`.

By following these steps, you can easily mock and test API calls in your Angular unit tests without making actual network requests.
