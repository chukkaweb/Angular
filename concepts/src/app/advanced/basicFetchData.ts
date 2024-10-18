import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

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
