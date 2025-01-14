Signals in Angular – Simple Explanation with Examples

Signals in Angular are a reactive state management feature introduced in Angular 16. They provide a way to track and respond to changes in data declaratively, similar to how state changes are handled in frameworks like React or Solid.js. Signals eliminate the need for manual subscriptions and make change detection more efficient and intuitive.

What are Signals?
Signal: A container for a piece of reactive data that notifies consumers (like components) when the data changes.
Computed: A derived state that reacts to one or more signals.
Effect: A reactive function triggered when signals it depends on change.


Why Signals?
- Reduce complexity by eliminating manual RxJS subscriptions.
- Improve performance with optimized change detection.
- Simplify state management by declaratively handling dependencies.



Example 1: Basic Signal
app.component.ts

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Counter: {{ counter() }}</h1>
    <button (click)="increment()">Increment</button>
  `,
})
export class AppComponent {
  // Create a signal with an initial value
  counter = signal(0);

  increment() {
    // Update the signal's value
    this.counter.update(value => value + 1);
  }
}


signal(0)`: Creates a reactive value starting at `0`.
counter()`: Reads the current value of the signal.
counter.update()`: Updates the signal's value and triggers the UI to update automatically.



Example 2: Using Computed Signals
app.component.ts

import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Counter: {{ counter() }}</h1>
    <h2>Double: {{ doubleCounter() }}</h2>
    <button (click)="increment()">Increment</button>
  `,
})
export class AppComponent {
  counter = signal(0);

  // Create a computed signal that depends on another signal
  doubleCounter = computed(() => this.counter() * 2);

  increment() {
    this.counter.update(value => value + 1);
  }
}


computed`: Automatically recalculates when `counter` changes.



Example 3: Effects
app.component.ts

import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Counter: {{ counter() }}</h1>
    <button (click)="increment()">Increment</button>
  `,
})
export class AppComponent {
  counter = signal(0);

  constructor() {
    // Log whenever the counter changes
    effect(() => {
      console.log('Counter changed to:', this.counter());
    });
  }

  increment() {
    this.counter.update(value => value + 1);
  }
}


effect`: Reacts to changes in `counter` and runs the provided function.



Example 4: Combining Signals with Template Directives

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 *ngIf="showMessage()">Hello, Angular Signals!</h1>
    <button (click)="toggleMessage()">Toggle Message</button>
  `,
})
export class AppComponent {
  showMessage = signal(true);

  toggleMessage() {
    this.showMessage.update(value => !value);
  }
}


- Signals integrate seamlessly with Angular's template syntax like `*ngIf`.



Benefits of Signals:
1. Reactive and Declarative: No need to manage manual subscriptions.
2. Optimized for Angular: Works well with Angular's change detection and zoneless mode.
3. Composable: Combine signals with computed and effects for advanced use cases.
4. Simplified Code: Reduces boilerplate for state management.



Real-World Use Cases:
1. Component State: Manage local component states like counters, toggles, etc.
2. Derived State: Calculate derived data like totals, filtered lists, or formatted values.
3. Reactive APIs: Replace RxJS observables for simpler reactive patterns.

Signals are designed to be simple and intuitive, making Angular more efficient and easier to use for reactive state management.
