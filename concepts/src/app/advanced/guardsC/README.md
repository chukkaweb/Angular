<!-- 

### Angular Route Guards  
Guards in Angular are used to control navigation based on certain conditions. They are part of the Angular Router module and can help manage access to routes.

### Types of Guards
1. `CanActivate`: Controls if a route can be activated (entered).
2. `CanActivateChild`: Controls if child routes can be activated.
3. `CanDeactivate`: Controls if you can leave a route.
4. `Resolve`: Pre-fetches data before the route is activated.
5. `CanLoad`: Controls if a module can be loaded lazily.


### 1. CanActivate Guard

This guard determines whether a route can be activated based on some condition (e.g., if the user is logged in).

Example:

// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token');  // Example check for user login
    if (isLoggedIn) {
      return true;  // Allow access
    } else {
      this.router.navigate(['/login']);  // Redirect to login if not logged in
      return false;  // Prevent access
    }
  }
}


Route Setup:
// app-routing.module.ts
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];


In this case, the `AuthGuard` checks if the user is logged in. If not, it redirects to the login page.



### 2. CanActivateChild Guard

This guard is similar to `CanActivate` but applies to child routes. It checks if a user can access specific child routes under a parent route.

Example:
// admin.guard.ts
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  canActivateChild(): boolean {
    const isAdmin = /* logic to check if user is admin */;
    return isAdmin;
  }
}


Route Setup:

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AdminGuard],
    children: [
      { path: 'settings', component: AdminSettingsComponent },
      { path: 'users', component: AdminUsersComponent },
    ],
  },
];


In this example, only users with admin privileges can access the child routes of `admin`.

### 3. CanDeactivate Guard

This guard controls whether a user can leave a route. It's useful when you want to warn the user about unsaved changes before navigating away.

Example:


// unsaved-changes.guard.ts
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// The component we want to protect
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}


Component Implementation:


// form.component.ts
export class FormComponent implements CanComponentDeactivate {
  canDeactivate(): boolean {
    return confirm('You have unsaved changes. Do you really want to leave?');
  }
}


Route Setup:


const routes: Routes = [
  { path: 'form', component: FormComponent, canDeactivate: [UnsavedChangesGuard] },
];


In this example, if the user tries to leave the `FormComponent` without saving changes, they are prompted with a confirmation dialog.



### 4. Resolve Guard

This guard pre-fetches data before the route is activated, ensuring the component has all the necessary data before it loads.

Example:


// data-resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataResolverService implements Resolve<any> {
  resolve(): Observable<any> {
    return of({ message: 'Hello from Resolver' });  // Fetch or simulate some data
  }
}


Component:


// home.component.ts
export class HomeComponent {
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      console.log(data);  // Output: { message: 'Hello from Resolver' }
    });
  }
}


Route Setup:


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: { message: DataResolverService },  // Use the resolver
  },
];


In this example, data is pre-fetched before navigating to the `HomeComponent`.



### 5. CanLoad Guard

This guard is used to prevent lazy-loaded modules from being loaded until certain conditions are met (e.g., if the user has permission to load a particular feature).

Example:


// auth.guard.ts
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  canLoad(): boolean {
    const isAuthorized = /* logic to check authorization */;
    return isAuthorized;
  }
}


Route Setup:
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AuthGuard],  // Prevent loading unless authorized
  },
];

In this case, the `AuthGuard` ensures that the `admin` module is only loaded if the user is authorized.

### Summary of Guards:
1. CanActivate: Controls access to routes (e.g., checking if the user is logged in).
2. CanActivateChild: Controls access to child routes.
3. CanDeactivate: Checks if the user can leave a route (e.g., prompts for unsaved changes).
4. Resolve: Pre-fetches data before navigating to a route.
5. CanLoad: Controls if a lazy-loaded module can be loaded. 

Guards are useful for improving application security, user experience, and flow control by ensuring that routes are accessed under the right conditions. 

-->