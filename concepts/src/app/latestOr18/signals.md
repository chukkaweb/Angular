# Signals in Angular — Simple explanation with examples

Signals are a lightweight reactive primitive introduced in Angular 16. They make local and shared state reactive without manual subscriptions and enable fine-grained change detection.

## What are signals?
- `signal`: A container for a reactive value (read with `signal()` and updated with `set()`/`update()`).
- `computed`: A derived value that automatically recalculates when its dependencies change.
- `effect`: A function that runs whenever the signals it reads change (use for side effects).

## Why use signals?
- Reduce boilerplate compared to manual RxJS subscriptions.
- Enable optimized, fine-grained change detection.
- Work well in zoneless mode and simplify component state.

## Example 1 — Basic signal
```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Counter: {{ counter() }}</h1>
    <button (click)="increment()">Increment</button>
  `,
})
export class AppComponent {
  counter = signal(0);

  increment() {
    this.counter.update(v => v + 1);
  }
}
```

- `signal(0)` creates a reactive value starting at `0`.
- `counter()` reads the current value.
- `counter.update()` or `counter.set()` changes the value and updates the view.

## Example 2 — Computed signals
```ts
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
  doubleCounter = computed(() => this.counter() * 2);

  increment() {
    this.counter.update(v => v + 1);
  }
}
```

`computed` values recalculate automatically when dependencies change.

## Example 3 — Effects
```ts
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
    effect(() => {
      console.log('Counter changed to:', this.counter());
    });
  }

  increment() {
    this.counter.update(v => v + 1);
  }
}
```

Use `effect` for logging, analytics, or imperative side effects (avoid using effects to drive UI rendering — signals handle that).

## Example 4 — Signals in templates
```ts
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
    this.showMessage.update(v => !v);
  }
}
```

Signals integrate directly with Angular templates (`{{ value() }}` and structural directives like `*ngIf`).

## Single-file Todo example (basic)

This minimal example shows a single-component Todo list using `signal`, `computed`, and `effect`. It persists to `localStorage` and demonstrates updates from the template.

```ts
import { Component, signal, computed, effect } from '@angular/core';

interface Todo { id: number; title: string; done: boolean }

@Component({
  selector: 'app-todos',
  template: `
    <div>
      <h2>Todos ({{ remaining() }} remaining)</h2>
      <input [(ngModel)]="newTitle" placeholder="New todo" />
      <button (click)="add()">Add</button>
      <ul>
        <li *ngFor="let t of todos()">
          <label>
            <input type="checkbox" [checked]="t.done" (change)="toggle(t.id)" />
            <span [class.done]="t.done">{{ t.title }}</span>
          </label>
          <button (click)="remove(t.id)">✕</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`.done { text-decoration: line-through; }`]
})
export class TodosComponent {
  todos = signal<Todo[]>([]);
  remaining = computed(() => this.todos().filter(t => !t.done).length);
  newTitle = '';

  constructor() {
    const raw = localStorage.getItem('todos');
    if (raw) this.todos.set(JSON.parse(raw));
    effect(() => localStorage.setItem('todos', JSON.stringify(this.todos())));
  }

  add() {
    const title = this.newTitle.trim();
    if (!title) return;
    const next: Todo = { id: Date.now(), title, done: false };
    this.todos.update(list => [...list, next]);
    this.newTitle = '';
  }

  toggle(id: number) {
    this.todos.update(list => list.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  remove(id: number) {
    this.todos.update(list => list.filter(t => t.id !== id));
  }
}
```

- Quick note: this example uses `[(ngModel)]` — import `FormsModule` in the module that declares `TodosComponent`.

## Benefits
- Reactive and declarative: less subscription management.
- Optimized for Angular: fine-grained change detection and good zoneless support.
- Composable: combine `signal`, `computed`, and `effect` for clear reactive flows.
- Reduced boilerplate for common component state patterns.

## Real-world use cases
- Live dashboards, shopping carts, form validation feedback, theme switching, auth state, search/filtering, progress indicators, notifications, game state, and dynamic UI preferences.

## Quick interview Q&A
- What are signals? — A lightweight reactive primitive for local and shared state.
- Difference vs Observables? — Signals are synchronous, dependency-tracked, and simpler for local state; Observables are better for streams and async pipelines.
- Computed? — A derived read-only value that updates when dependencies change.
- Effect? — Runs side effects when signals it reads change.
- Async with signals? — Use `effect` to call async APIs and update signals, or combine signals with Observables/Promises.
- Use in services? — Yes, signals can be stored in services to provide reactive shared state.

---

Signals are intentionally small and composable — they pair well with Angular's existing APIs and are ideal for straightforward reactive local state.
