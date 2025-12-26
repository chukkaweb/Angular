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


Real-Time Use Cases for Angular Signals:

1. **Live Dashboard Updates**: Use signals to update charts or metrics in real-time, like stock prices or user activity counters. Signals automatically refresh the UI when data changes.

2. **Shopping Cart Totals**: Track items in a cart with a signal, and use computed signals to calculate the total price automatically as items are added or removed.

3. **Form Validation Feedback**: Bind form inputs to signals and use computed signals to show validation messages instantly as the user types.

4. **Theme Switching**: Store the current theme (light/dark) in a signal, and use effects to apply CSS changes or update the DOM when the theme changes.

5. **User Authentication State**: Manage login status with a signal, and use computed signals to show/hide UI elements based on whether the user is logged in.

6. **Search and Filtering**: Use signals for search queries and filters, with computed signals to filter lists of data reactively.

7. **Progress Bars or Loading States**: Track progress (like file upload percentage) with a signal, and bind it to a progress bar in the template.

8. **Real-Time Notifications**: Store notification messages in a signal array, and use effects to display alerts or update a notification panel.

9. **Game Scores**: In a simple game, use signals to track scores, lives, or levels, updating the UI instantly on changes.

10. **Dynamic UI Preferences**: Store user preferences (like font size or layout) in signals, and use computed signals to adjust the UI dynamically.


Interview Questions and Answers on Angular Signals:

1. **What are Angular Signals?**
   Answer: Angular Signals are a reactive state management feature that allows you to track and respond to data changes declaratively. They notify components when data updates, making change detection efficient without manual subscriptions.

2. **How do Signals differ from RxJS Observables?**
   Answer: Signals are simpler and more direct for reactive state. Observables require subscriptions and unsubscriptions, while signals automatically handle dependencies and updates. Signals are synchronous and work well with Angular's change detection.

3. **What is a Computed Signal?**
   Answer: A computed signal is a derived value that automatically recalculates when its dependent signals change. It's like a reactive formula, e.g., total = price * quantity.

4. **Explain Effects in Signals.**
   Answer: Effects are functions that run automatically when signals they depend on change. They're useful for side effects like logging, updating the DOM, or making API calls, but avoid using them for UI updates since signals handle that.

5. **How do Signals improve Performance?**
   Answer: Signals enable fine-grained change detection, updating only the parts of the UI that depend on changed data. This reduces unnecessary re-renders and works better in zoneless Angular applications.

6. **Can you give an example of using Signals in a Component?**
   Answer: Sure, create a counter: counter = signal(0); In the template: {{ counter() }}, and in a method: this.counter.set(this.counter() + 1);

7. **How to handle Asynchronous Operations with Signals?**
   Answer: Signals are synchronous, so for async operations, combine them with RxJS or promises. For example, use an effect to call an API and update a signal with the result.

8. **When should you use Signals over traditional Change Detection?**
   Answer: Use signals for reactive state in components where you need automatic updates without Zone.js. They're great for local state, but for complex app-wide state, consider NgRx or services.

9. **Are Signals Mutable or Immutable?**
   Answer: Signals are mutable; you can update them directly with set() or update(). But computed signals are read-only and derived from others.

10. **Can Signals be used in Services?**
    Answer: Yes, signals can be injected into services for shared state, making services reactive. This is useful for global app state like user settings.
