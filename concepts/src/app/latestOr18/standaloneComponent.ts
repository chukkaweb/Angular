Angular Standalone Components - Simple Explanation

// In Angular, standalone components are components that do not require an Angular module (`NgModule`) to work. They simplify the structure of Angular applications by allowing components, pipes, and directives to be self-contained and used directly without needing to declare them in a module.

// ---

// Why Use Standalone Components?

// - Simplifies Module Structure: Reduces the need for module declarations and simplifies import/export of components.
// - Faster Bootstrapping: Standalone components streamline the application structure, which can improve load time in large apps.
// - Direct Imports: Standalone components can import Angular dependencies and other standalone components directly.

// ---

// How to Create a Standalone Component

// 1. Create a Standalone Component:
//    - Use the Angular CLI with the `--standalone` flag:
//      bash
//      ng generate component MyComponent --standalone
     

// 2. Basic Structure of a Standalone Component:
//    - A standalone component’s metadata includes `standalone: true` in the `@Component` decorator.
//    - Dependencies are imported directly into the component instead of a module.

   
//    import { Component } from '@angular/core';

//    @Component({
//      selector: 'app-my-component',
//      template: `<h1>Hello, Standalone Component!</h1>`,
//      standalone: true
//    })
//    export class MyComponent {}
   

// 3. Using the Standalone Component:
//    - Standalone components can be directly imported and used in other components or bootstrapped directly in the application without needing an `NgModule`.

// ---

// Examples of Standalone Components - All Cases Covered

// #Case 1: Standalone Component with Dependency Injection

// Standalone components can inject services just like regular components.


// import { Component, inject } from '@angular/core';
// import { MyService } from './my-service.service';

// @Component({
//   selector: 'app-my-standalone',
//   template: `<p>{{ message }}</p>`,
//   standalone: true,
// })
// export class MyStandaloneComponent {
//   private myService = inject(MyService);
//   message = this.myService.getMessage();
// }


// ---

// #Case 2: Standalone Component Importing Angular Modules

// A standalone component can import Angular modules such as `CommonModule` or `FormsModule` as needed.


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-form-component',
//   template: `
//     <input [(ngModel)]="name" placeholder="Enter your name" />
//     <p>Hello, {{ name }}!</p>
//   `,
//   standalone: true,
//   imports: [CommonModule, FormsModule]
// })
// export class FormComponent {
//   name = '';
// }


// ---

// #Case 3: Standalone Component Using Other Standalone Components

// You can compose standalone components by importing one standalone component into another.


// import { Component } from '@angular/core';
// import { MyStandaloneComponent } from './my-standalone.component';

// @Component({
//   selector: 'app-parent-component',
//   template: `
//     <app-my-standalone></app-my-standalone>
//   `,
//   standalone: true,
//   imports: [MyStandaloneComponent]
// })
// export class ParentComponent {}


// ---

// #Case 4: Standalone Component with Directives and Pipes

// Standalone components can import and use other standalone directives and pipes directly.


// import { Component } from '@angular/core';
// import { UpperCasePipe, NgIf } from '@angular/common';

// @Component({
//   selector: 'app-message',
//   template: `
//     <p *ngIf="message">{{ message | uppercase }}</p>
//   `,
//   standalone: true,
//   imports: [UpperCasePipe, NgIf]
// })
// export class MessageComponent {
//   message = 'Hello from Angular!';
// }


// ---

// #Case 5: Bootstrapping Standalone Component Directly

// You can bootstrap a standalone component directly in the `main.ts` file, without using a module.

// `main.ts`:

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent)
//   .catch(err => console.error(err));


// `app.component.ts`:

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   template: `<h1>Welcome to Angular Standalone Components!</h1>`,
//   standalone: true
// })
// export class AppComponent {}


// ---

// Summary

// - Standalone Components allow Angular components to be independent of modules, simplifying component structure.
// - Direct Imports: They can directly import other standalone components, Angular modules, directives, and pipes.
// - Multiple Use Cases: Standalone components can handle dependency injection, module imports, nesting, and can be bootstrapped directly.

// Using standalone components in Angular reduces the need for `NgModule` declarations, making your app structure more straightforward and flexible.
