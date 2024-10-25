// Here are some Angular coding questions that focus on fetching data and updating the UI, commonly asked in interviews:

// ---

//  1. Fetch Data from an API and Display in the UI

//  Question: Write an Angular service and component to fetch a list of users from an API and display them in a list on the UI.

// Solution:

// 1. Create a Service to Fetch Data:

// // user.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'https://jsonplaceholder.typicode.com/users';

//   constructor(private http: HttpClient) { }

//   getUsers(): Observable<any> {
//     return this.http.get(this.apiUrl);
//   }
// }


// 2. Use the Service in a Component:

// // user-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { UserService } from './user.service';

// @Component({
//   selector: 'app-user-list',
//   template: `
//     <h2>Users</h2>
//     <ul>
//       <li *ngFor="let user of users">{{ user.name }}</li>
//     </ul>
//   `,
// })
// export class UserListComponent implements OnInit {
//   users: any[] = [];

//   constructor(private userService: UserService) { }

//   ngOnInit(): void {
//     this.userService.getUsers().subscribe((data) => {
//       this.users = data;
//     });
//   }
// }


// 3. Template to Display Users:
// html
// <!-- user-list.component.html -->
// <h2>Users</h2>
// <ul>
//   <li *ngFor="let user of users">{{ user.name }}</li>
// </ul>


// ---

//  2. Fetch Data and Update UI on Button Click

//  Question: Fetch user data from an API and update the UI when a button is clicked.

// Solution:

// 1. Component to Fetch Data on Button Click:

// // user-fetch.component.ts
// import { Component } from '@angular/core';
// import { UserService } from './user.service';

// @Component({
//   selector: 'app-user-fetch',
//   template: `
//     <button (click)="fetchUsers()">Fetch Users</button>
//     <ul>
//       <li *ngFor="let user of users">{{ user.name }}</li>
//     </ul>
//   `,
// })
// export class UserFetchComponent {
//   users: any[] = [];

//   constructor(private userService: UserService) {}

//   fetchUsers(): void {
//     this.userService.getUsers().subscribe((data) => {
//       this.users = data;
//     });
//   }
// }


// 2. Explanation:
// - The component has a button to trigger the `fetchUsers()` method.
// - When the button is clicked, it calls the API using the `UserService` and updates the `users` array, which then updates the UI.

// ---

//  3. Display Loading Indicator While Fetching Data

//  Question: Modify the previous example to display a loading indicator while the data is being fetched.

// Solution:

// 1. Update Component to Show Loading:

// // user-fetch-loading.component.ts
// import { Component } from '@angular/core';
// import { UserService } from './user.service';

// @Component({
//   selector: 'app-user-fetch-loading',
//   template: `
//     <button (click)="fetchUsers()">Fetch Users</button>
//     <div *ngIf="loading">Loading...</div>
//     <ul>
//       <li *ngFor="let user of users">{{ user.name }}</li>
//     </ul>
//   `,
// })
// export class UserFetchLoadingComponent {
//   users: any[] = [];
//   loading = false;

//   constructor(private userService: UserService) {}

//   fetchUsers(): void {
//     this.loading = true;
//     this.userService.getUsers().subscribe((data) => {
//       this.users = data;
//       this.loading = false; // Disable loading once data is fetched
//     });
//   }
// }


// 2. Explanation:
// - The `loading` property is set to `true` when the API call starts.
// - While `loading` is `true`, a "Loading..." message is displayed.
// - Once the data is fetched, `loading` is set to `false` and the user data is displayed.

// ---

//  4. Two-Way Data Binding: Form Input and Display

//  Question: Implement a form where the user types their name, and it immediately updates on the UI using two-way data binding.

// Solution:

// 1. Component for Two-Way Data Binding:

// // name-binding.component.ts
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-name-binding',
//   template: `
//     <input [(ngModel)]="name" placeholder="Enter your name" />
//     <p>Hello, {{ name }}!</p>
//   `,
// })
// export class NameBindingComponent {
//   name = '';
// }


// 2. Explanation:
// - `[(ngModel)]` creates two-way data binding between the input and the `name` property.
// - As the user types, the `name` property is updated, and the UI reflects the changes immediately.

// ---

//  5. Submit Form Data and Update the UI

//  Question: Create a form to submit a user's name and email. When the form is submitted, display the submitted data on the UI.

// Solution:

// 1. Create a Form in a Component:

// // user-form.component.ts
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-form',
//   template: `
//     <form (ngSubmit)="onSubmit()">
//       <label for="name">Name:</label>
//       <input [(ngModel)]="user.name" name="name" id="name" required />

//       <label for="email">Email:</label>
//       <input [(ngModel)]="user.email" name="email" id="email" required />

//       <button type="submit">Submit</button>
//     </form>

//     <div *ngIf="submitted">
//       <h3>Submitted Data</h3>
//       <p>Name: {{ user.name }}</p>
//       <p>Email: {{ user.email }}</p>
//     </div>
//   `,
// })
// export class UserFormComponent {
//   user = { name: '', email: '' };
//   submitted = false;

//   onSubmit() {
//     this.submitted = true; // Update the UI when the form is submitted
//   }
// }


// 2. Explanation:
// - The form uses `ngModel` to bind input fields to the `user` object.
// - On form submission (`ngSubmit`), the `onSubmit()` method is triggered, and the form data is displayed.

// ---

//  6. Fetch Data with Error Handling

//  Question: Write a component that fetches user data from an API and handles errors if the request fails.

// Solution:

// 1. Component with Error Handling:

// // user-fetch-error.component.ts
// import { Component } from '@angular/core';
// import { UserService } from './user.service';

// @Component({
//   selector: 'app-user-fetch-error',
//   template: `
//     <button (click)="fetchUsers()">Fetch Users</button>
//     <div *ngIf="error">{{ error }}</div>
//     <ul>
//       <li *ngFor="let user of users">{{ user.name }}</li>
//     </ul>
//   `,
// })
// export class UserFetchErrorComponent {
//   users: any[] = [];
//   error: string | null = null;

//   constructor(private userService: UserService) {}

//   fetchUsers(): void {
//     this.userService.getUsers().subscribe({
//       next: (data) => {
//         this.users = data;
//         this.error = null; // Clear error if the data fetch is successful
//       },
//       error: (err) => {
//         this.error = 'Failed to fetch users. Please try again later.';
//       }
//     });
//   }
// }


// 2. Explanation:
// - If the API request fails, the error is caught in the `error` callback of `subscribe`.
// - An error message is displayed, and the UI shows the fetched data if the request is successful.

// ---

//  7. Use `async` Pipe to Fetch Data

//  Question: Write a component that fetches data and uses the `async` pipe to display it in the template.

// Solution:

// 1. Component Using `async` Pipe:

// // user-async.component.ts
// import { Component } from '@angular/core';
// import { UserService } from './user.service';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-user-async',
//   template: `
//     <ul *ngIf="users$ | async as users">
//       <li *ngFor="let user of users">{{ user.name }}</li>
//     </ul>
//   `,
// })
// export class UserAsyncComponent {
//   users$: Observable<any[]>;

//   constructor(private userService: UserService) {
//     this.users$ = this.userService.getUsers();
//   }
// }


// 2. Explanation:
// - The `async` pipe automatically subscribes to the `users$` Observable and updates the UI when the data arrives.
// - This eliminates the need to manually subscribe and unsubscribe.

// ---

// These Angular coding questions cover essential scenarios like fetching data, updating the UI, handling user input, and error management, helping you prepare for real-world use cases and interviews.
