// Signals for Reactive State Management
// Signals are reactive primitives introduced to help manage component state without complex observable chains.

// import { Component, signal } from '@angular/core';
// @Component({
//   selector: 'app-counter',
//   template: `<p>Count: {{ count() }}</p>
//              <button (click)="increment()">Increment</button>`,
// })
// export class CounterComponent {
//   count = signal(0);
//   increment() {
//     this.count.update(c => c + 1);
//   }
// }