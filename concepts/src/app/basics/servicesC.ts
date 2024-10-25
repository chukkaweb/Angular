// Services in Angular are used to share data, logic, or functionality across different components. 
// They promote reusability and maintainability.
// Dependency Injection (DI) is a design pattern in which dependencies are injected into a class rather than being created inside the class. 
// Angular's DI framework allows you to inject services into components or other services.

// @Injectable({
//   providedIn: 'root',
// })
// export class DataService {
//   getData() { return 'data'; }
// }

// @Component({
//   selector: 'app-data',
//   templateUrl: './data.component.html',
// })
// export class DataComponent {
//   constructor(private dataService: DataService) {}
// }


// What is the `providedIn` Property in Angular Services?

// - The `providedIn` property in Angular services is part of the `@Injectable` decorator, introduced in Angular 6. 
// It specifies the provider scope of the service and controls where and how the service is provided (or registered) in the dependency injection (DI) system.
// - By default, it tells Angular where to register the service so that Angular can inject it when needed.


// How `providedIn` Works:
// #1. providedIn: 'root'
// - When you specify `providedIn: 'root'`, the service is provided in the root injector of the application.
// - This means the service is singleton and is available globally across the entire application.
//  It will be instantiated once and shared wherever it's injected.

// @Injectable({
//   providedIn: 'root'
// })
// export class MyService {
  // Service logic here
// }


// #How It Works:
// - The service is registered in the root injector, so you don’t need to add it manually to the `providers` array in a module (e.g., `AppModule`).
// - Angular ensures that the service is lazy-loaded, meaning it will only be instantiated when it is first injected, not when the application starts.

// #Use Case:
// - Use `providedIn: 'root'` for services that are shared across the entire application, like authentication, logging, or data services.


// #2. providedIn: 'any'

// - When `providedIn: 'any'` is used, the service will be provided in all modules where it’s injected, but not globally.
// - If the service is used in multiple lazy-loaded modules, each module will get its own instance of the service.


// @Injectable({
//   providedIn: 'any'
// })
// export class MyOtherService {
  // Service logic here
// }


// #How It Works:
// - This creates a new instance of the service for each lazy-loaded module.
// - If the module is eagerly loaded, the service will behave the same as `providedIn: 'root'`.

// #Use Case:
// - Use `providedIn: 'any'` when you want each lazy-loaded module to have its own instance of a service, for cases where different parts of the application need different service states.



// #3. providedIn: Specific Module
// - You can specify the service to be provided in a specific module (e.g., `providedIn: MyModule`). The service will only be available in that module or its child components.


// @Injectable({
//   providedIn: MyModule
// })
// export class MyModuleSpecificService {
  // Service logic here
// }


// #How It Works:
// - The service is available only to the components and services within that specific module (`MyModule`).
// - You need to import that module to use the service.

// #Use Case:
// - Use this when you want the service to be scoped only to a specific feature module, especially in modular applications.

// Advantages of Using `providedIn`:
// 1. Automatic Tree Shaking: If the service is not used anywhere in the application, Angular tree-shakes (removes) it during the build process, reducing the bundle size.
// 2. Simplifies Module Setup: You no longer need to manually add the service to the `providers` array in the module.
// 3. Lazy Loading: Services are only loaded when required, improving application performance.


// Summary:
// providedIn: 'root'`: Registers the service in the root injector, making it singleton and available globally.
// providedIn: 'any'`: Provides the service in lazy-loaded modules, creating a new instance for each module.
// providedIn: MyModule`: Registers the service only in the specified module, scoping it to that module.

// This feature improves efficiency, modularity, and simplifies the way services are provided in Angular applications.


// Making HTTP Requests in Angular (Using HttpClient)
// In Angular, you make HTTP requests using the `HttpClient` service from the `@angular/common/http` module. 
// It provides an easy-to-use API for making various HTTP requests (GET, POST, PUT, DELETE, etc.) and handling responses.

// Steps to Make HTTP Requests Using `HttpClient`:
// 1. Import `HttpClientModule` in Your App Module
// First, you need to import the `HttpClientModule` in the `AppModule` to make HTTP services available throughout the application.


// import { HttpClientModule } from '@angular/common/http';
// @NgModule({
//   imports: [HttpClientModule], // Add HttpClientModule to imports array
//   bootstrap: [AppComponent]
// })
// export class AppModule {}

// 2. Inject `HttpClient` in Your Service or Component
// Once the `HttpClientModule` is imported, you can inject the `HttpClient` service into your service or component where you need to make HTTP requests.
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {
//   private apiUrl = 'https://api.example.com/data'; // Example API endpoint

//   constructor(private http: HttpClient) {}

  // Method to make GET request
//   getData(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);  // Returns Observable
//   }

  // Method to make POST request
//   postData(data: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, data);  // Returns Observable
//   }
// }

// 3. Making HTTP Requests in a Component
// Once you've set up the service, you can call the service methods in your component and subscribe to the Observables to handle the HTTP responses.
// import { Component, OnInit } from '@angular/core';
// import { DataService } from './data.service';

// @Component({
//   selector: 'app-my-component',
//   template: `
//     <h1>Data:</h1>
//     <pre>{{ data | json }}</pre>
//   `
// })
// export class MyComponent implements OnInit {
//   data: any;

//   constructor(private dataService: DataService) {}

//   ngOnInit(): void {
    // Making GET request and handling the response
//     this.dataService.getData().subscribe(
//       (response) => {
//         this.data = response;
//       },
//       (error) => {
//         console.error('Error fetching data', error);
//       }
//     );
//   }
// }




// Types of HTTP Requests Using `HttpClient`

// 1. GET Request: To retrieve data from the server.
//    this.http.get<any>('https://api.example.com/data');

// 2. POST Request: To send data to the server (e.g., creating new data).

//    this.http.post<any>('https://api.example.com/data', { name: 'John' });


// 3. PUT Request: To update existing data on the server.
//    this.http.put<any>('https://api.example.com/data/1', { name: 'Updated John' });


// 4. DELETE Request: To delete data from the server.
//    this.http.delete<any>('https://api.example.com/data/1');


// 5. PATCH Request: To partially update existing data on the server.
//    this.http.patch<any>('https://api.example.com/data/1', { age: 30 });




// Handling Errors in HTTP Requests
// You can handle errors using `catchError` from RxJS. Here's an example of error handling in a GET request:

// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';

// getData(): Observable<any> {
//   return this.http.get<any>(this.apiUrl).pipe(
//     catchError(error => {
//       console.error('Error occurred:', error);
//       return throwError('Something went wrong!');  // Return a fallback message
//     })
//   );
// }




// Sending HTTP Headers
// You can send custom headers using the `HttpHeaders` class:

// import { HttpHeaders } from '@angular/common/http';
// getDataWithHeaders(): Observable<any> {
//   const headers = new HttpHeaders({
//     'Authorization': 'Bearer token',
//     'Custom-Header': 'CustomValue'
//   });

//   return this.http.get<any>(this.apiUrl, { headers });
// }




// Setting Query Parameters
// You can add query parameters using the `HttpParams` class:


// import { HttpParams } from '@angular/common/http';
// getDataWithParams(): Observable<any> {
//   const params = new HttpParams()
//     .set('page', '1')
//     .set('limit', '10');

//   return this.http.get<any>(this.apiUrl, { params });
// }




// Summary of `HttpClient` Features:
// 1. GET/POST/PUT/DELETE Requests: Make HTTP requests to fetch or modify data.
// 2. Observable-Based: All HTTP requests return Observables, allowing easy handling of asynchronous operations.
// 3. Error Handling: Use `catchError` to manage error handling in the service.
// 4. Headers and Parameters: Easily send custom headers and query parameters.
// 5. Response Types: Specify the response type (`json`, `text`, `blob`, etc.) based on the expected data format.



// By using `HttpClient`, Angular makes it simple to interact with remote APIs and handle HTTP requests efficiently.