// // import { HttpClient } from '@angular/common/http';
// // import { Injectable } from '@angular/core';
// // import { catchError, Observable, of } from 'rxjs';
// // import { Todo } from './todo.model';

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class TodoService {
// //   private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';
// //   constructor(private http: HttpClient) {}

// //   getToDos(): Observable<Todo[]> {
// //     // User[]: The observable is expected to emit an array of User objects (User[]

// //     // this.http.get<User[]> makes an HTTP GET request to the specified apiUrl
// //     // <User[]> is a TypeScript generic type that tells Angular’s HttpClient that the data it receives from the API will be of type User[], i.e., an array of User objects.

// //     return this.http.get<Todo[]>(this.apiUrl).pipe(
// //       catchError((error) => {
// //         console.error('Error fetching todos:', error);
// //         return of([]);
// //       })
// //     );
// //   }

// //   // getToDos(): Observable<Todo[]> {
// //   //   // User[]: The observable is expected to emit an array of User objects (User[]

// //   //   // this.http.get<User[]> makes an HTTP GET request to the specified apiUrl
// //   //   // <User[]> is a TypeScript generic type that tells Angular’s HttpClient that the data it receives from the API will be of type User[], i.e., an array of User objects.

// //   //   return this.http.get<Todo[]>(this.apiUrl);
// //   // }
// // }


// // component ts

// import { Component, OnInit } from '@angular/core';
// import { TodoService } from '../todo.service';
// import { Todo } from '../todo.model';
// import { HttpErrorResponse } from '@angular/common/http';
// import { catchError, finalize, map, of } from 'rxjs';

// @Component({
//   selector: 'app-todo',
//   templateUrl: './todo.component.html',
//   styleUrls: ['./todo.component.css'],
// })
// export class TodoComponent implements OnInit {
//   todos: Todo[] = [];
//   constructor(private todoService: TodoService) {}

//   ngOnInit() {
//     this.getTodos();
//   }

//   getTodos() {
//     this.todoService
//       .getToDos()
//       .pipe(
//         map((items: Todo[]) => {
//           if (!items || (items && items.length === 0)) return;
//           this.todos = items.filter((item) => item.completed === true);
//         }),
//         catchError((error: HttpErrorResponse) => {
//           console.error('Error fetching todos:', error);
//           return of([]); // Return an empty array or handle the error appropriately
//         }),
//         finalize(() => {
//           console.log('finally');
//         })
//       )
//       .subscribe();
//   }
// }


