# Signals in Angular — Simple explanation with examples

signals > https://www.youtube.com/watch?v=zCaw_3rqgCM

### https://media.licdn.com/dms/document/media/v2/D4D1FAQF0VWql-JOkcg/feedshare-document-pdf-analyzed/B4DZvHjlmAG0AY-/0/1768579555526?e=1770249600&v=beta&t=ix-1_yqG0V1CUlmWArvOLAZCzQwAFhH0PoChbRqw0X4

### https://www.linkedin.com/posts/anukool-naik_professional-guidesignals-in-ts-angular-activity-7417968745215639553-iDpU?trk=public_post_comment-text

Simple def : A signal is a value that remembers its current state and automatically updates anything that depends on it when it changes.
Signal = a variable with memory + auto update
When value changes → UI updates automatically

It’s like a live variable. When the value changes, Angular automatically updates wherever it’s used, similar to how a battery percentage updates on a phone screen.

room light example when turn OFF room dark , vice versa
phone battery percentage 

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


# 🔹 Quick Context

In Angular Signals we have:

```ts
signal()     → holds state
computed()   → derives state
effect()     → reacts to state change (side effects)
```

# ✅ 1️⃣ computed() – Derived State (Pure & Synchronous)

## 🔹 What is computed()?

👉 **computed = calculated value based on other signals**

# 📦 Real-Life Example

### Example: Shopping
* Price = 100
* Quantity = 2
👉 Total = 200 (calculated)
If quantity changes → total updates automatically
✔ That’s `computed()`

# 💻 Code Example

```ts
const price = signal(100);
const quantity = signal(2);

const total = computed(() => price() * quantity());
```

👉 Change quantity:

```ts
quantity.set(3);
```

👉 total automatically becomes **300**

# 🎯 One-Line Answer

> `computed()` is used to create a derived value that automatically updates when its dependent signals change.

`computed()` is used to create **derived values** based on one or more signals.

It automatically recalculates when dependency signals change.

👉 It is like a formula.
👉 It should be pure (no API calls, no side effects)


## 🔹 Real-Time Example 1: Cart Total Price

### Problem:
You have cart items and need total price.

### Using computed()
```ts
cartItems = signal([
  { name: 'Laptop', price: 50000 },
  { name: 'Mouse', price: 1000 }
]);

totalPrice = computed(() =>
  this.cartItems().reduce((sum, item) => sum + item.price, 0)
);
```

### How it works:
* If cartItems change → totalPrice auto recalculates
* No manual subscription
* No change detection headache

### Interview Explanation:

> computed() is used for derived state. For example, in an e-commerce app, I use computed() to calculate total cart price based on cart items. It automatically recalculates when items change and avoids manual subscriptions.

## 🔹 Real-Time Example 2: Form Validation Status

```ts
username = signal('');
password = signal('');

isFormValid = computed(() =>
  this.username().length > 3 && this.password().length > 6
);
```
Button auto enables/disables when values change.

## 🔹 When NOT to use computed()

❌ Don’t call APIs inside computed
❌ Don’t update another signal inside it
❌ Don’t use for async work

Because it must stay pure.

# ✅ 2️⃣ effect() – Side Effects (Reactions)

## 🔹 What is effect()?

# 🧠 2️⃣ `effect()` – Simple Meaning

👉 **effect = run some action when signal changes**

# 📦 Real-Life Example

### Example: Door Alarm

* Door opens → alarm rings

👉 Action happens when state changes

✔ That’s `effect()`

# 💻 Code Example

```ts
const count = signal(0);

effect(() => {
  console.log("Count changed:", count());
});
```

👉 When:
```ts
count.set(1);
```

👉 Console logs automatically

# 🎯 One-Line Answer

> `effect()` runs a function automatically whenever a signal value changes, mainly used for side effects like logging or API calls

`effect()` runs automatically whenever dependent signals change.

It is used for:
* API calls
* Logging
* LocalStorage updates
* DOM interactions
* Analytics tracking

👉 Think of it like automatic reaction.

## 🔹 Real-Time Example 1: Save to LocalStorage

```ts
user = signal({ name: 'Ganesh' });

effect(() => {
  localStorage.setItem('user', JSON.stringify(this.user()));
});
```
Whenever user changes → localStorage updates automatically.

---

# 🆚 Difference (Very Important for Interview)

| Feature  | computed()      | effect()          |
| -------- | --------------- | ----------------- |
| Purpose  | Calculate value | Perform action    |
| Returns  | Value           | Nothing           |
| Use case | UI data         | API call, logging |

---

# 🧠 Easy Way to Remember

* `signal` → value
* `computed` → calculated value
* `effect` → action

---

# 🔥 Real Angular Example

```ts
const price = signal(100);
const quantity = signal(2);

const total = computed(() => price() * quantity());

effect(() => {
  console.log("Total updated:", total());
});
```

# 💬 Perfect Interview Answer (Short)

> Signals store state, computed is used to derive values from signals, and effect is used to run side effects when signals change.

### Interview Explanation:

> I use effect() for side effects. For example, when user profile signal changes, I automatically persist it in localStorage using effect().

## 🔹 Real-Time Example 2: Trigger API on Filter Change

```ts
filter = signal('all');

effect(() => {
  const value = this.filter();
  this.loadData(value);
});
```
Whenever filter changes → API is triggered.

⚠ Important:
This is allowed because API call is side effect.

## 🔹 Real-Time Example 3: Analytics Tracking
```ts
selectedProduct = signal(null);
effect(() => {
  if (this.selectedProduct()) {
    console.log('User viewed product:', this.selectedProduct());
  }
});
```

Used for tracking events.

# 🔥 computed() vs effect() (Simple Interview Comparison)

| computed()           | effect()          |
| -------------------- | ----------------- |
| Derived state        | Side effect       |
| Pure function        | Impure allowed    |
| Returns value        | No return         |
| Sync                 | Can trigger async |
| Example: total price | Example: API call |


# 🧠 Advanced Interview Point

If interviewer asks:

"What happens internally?"

You can say:

> computed() is memoized. It recalculates only when dependencies change.
> effect() tracks dependencies automatically and re-runs when they change.

That sounds senior.

# 🔥 Very Important: When to Avoid effect()

Don’t overuse effect for state updates like:

```ts
effect(() => {
  this.total.set(this.price() * this.qty());
});
```

Instead use computed:

```ts
total = computed(() => this.price() * this.qty());
```

Because:
Derived state → computed
Side effects → effect


# 💡 Real Enterprise Example (Senior-Level Answer)

In large Angular app:

* Use signal() for local component state
* Use computed() for UI derived state
* Use effect() for:

  * API trigger on filter change
  * Sync with LocalStorage
  * Analytics tracking
  * External library integration


# 🎯 Perfect Interview Answer (Short Version)

If interviewer asks:

“What is computed and effect?”

You can say:

> computed() is used for derived state. It recalculates automatically when dependent signals change and should remain pure. For example, calculating total cart value.
> effect() is used for side effects like API calls, logging, or updating localStorage when a signal changes.

Clear. Confident. Senior.


 **normal variable vs signal works completely differently**.

Let’s break it simple.

# 1️⃣ Normal Variable (counter)

```ts
counter = 0;
```
When you click:

```ts
this.counter = this.counter + 1;
```
## What happens internally?

Angular uses **Zone.js** (default mode).

Flow:
1. Button click event happens
2. Zone.js detects event
3. Angular runs change detection
4. Angular checks ALL bindings in component tree
5. It compares old vs new value
6. If changed → updates DOM

Important:
👉 Angular checks entire component tree
👉 Even if only one variable changed

This is called **dirty checking**


# 2️⃣ Signal Variable (counter1)

```ts
counter1 = signal(0);
```

When you do:

```ts
this.counter1.set(this.counter1() + 1);
```

## What happens internally?

Signals work differently.

Flow:

1. counter1.set() is called
2. Angular knows exactly who is using counter1()
3. Only those parts are marked dirty
4. Only those parts re-render

Important:

👉 No full tree checking
👉 Precise reactivity
👉 No dependency on Zone.js

This is called **fine-grained reactivity**

# Visual Difference

Normal variable:

```
Click → Zone → Full component check → DOM update
```

Signal:

```
Click → Signal update → Only dependent binding update
```

# 3️⃣ Why UI looks same?

Because:

* Your example is small
* Only one binding exists

In small component → no visible difference.
In large enterprise app → BIG difference.

# 6️⃣ Key Internal Difference (Very Important)

Normal variable:

* Pull-based change detection
* Angular pulls and checks everything

Signal:

* Push-based reactivity
* Signal pushes update only where needed

# 7️⃣ Performance Perspective

Small app → no visible difference
Large app (100+ components) → huge difference

Signals:
✔ Better performance
✔ More predictable
✔ Easier debugging
✔ Zoneless compatible

# 8️⃣ Why Signals Work Without Zone?

Because:
Signal tracks dependency automatically.
When template calls:
```html
{{ counter1() }}
```

Angular registers dependency.
So when:
```ts
counter1.set()
```
Angular knows exactly what to update.

No need to scan full tree.

# 9️⃣ Real Interview Answer (Strong)

> "Normal variables rely on Angular’s zone-based change detection which checks the full component tree, whereas signals use fine-grained reactivity and update only the dependent parts, enabling better performance and zoneless operation."


# 1️⃣0️⃣ Senior-Level Understanding

Signals:
* Track dependencies automatically
* Work like reactive system (similar to SolidJS / Vue reactivity)
* Future of Angular architecture

# When we say "Full Component Check", what does it really mean?

## ✅ In Default Angular (Zone-based, without OnPush)

When an event happens (like button click):

👉 Angular runs change detection from the **root component (AppComponent)**
👉 It checks the **entire component tree**

So it is NOT just the `Counter` component.

It starts from:

```
AppComponent
  ├── HeaderComponent
  ├── SidebarComponent
  ├── DashboardComponent
  │     ├── CounterComponent
  │     └── ChartComponent
  └── FooterComponent
```

If you click button inside `CounterComponent`:

Angular will:

1. Start from `AppComponent`
2. Go down every child component
3. Check all bindings in all components

Even if only `counter` changed.


# Why does Angular do this?

Because Angular (traditional mode) does:

👉 Dirty checking
👉 It does not know exactly what changed
👉 So it checks everything to be safe


# Important Clarification

It checks all components
BUT

It only updates DOM where value changed.

So:

✔ It checks entire tree
✔ It updates only affected bindings


# What changes with OnPush?

If a component uses:

```ts
changeDetection: ChangeDetectionStrategy.OnPush
```

Then Angular:

✔ Skips checking that component unless:

* Input reference changed
* Event happened inside it
* Observable emitted
* Signal updated

So OnPush reduces tree checking.


# What changes with Signals?

Signals are different.

Signals:

✔ Track exactly where they are used
✔ Update only dependent views
✔ Do not require full tree scan
✔ Work even in zoneless mode


# So to answer your question directly:

> Full component check means Angular runs change detection starting from the root component (AppComponent) and traverses the entire component tree, not just the Counter component.


# Visual Comparison

### Default Mode

```
Click → Zone → AppComponent → All children → All bindings checked
```

### With OnPush

```
Click → Only affected branch checked
```

### With Signals (Zoneless future)

```
Signal.set() → Only exact dependent binding updated
```

# Senior-Level Interview Answer

> "In default Angular change detection, when an event occurs, Angular starts checking from the root component and traverses the entire component tree. With OnPush and Signals, this process becomes more optimized and targeted."

**Real Todo App Pattern using Angular Signals**
(Structured like production-level, not basic demo)

We’ll cover:
* Add Todo
* Remove Todo
* Toggle Complete
* Computed values
* Clean architecture pattern
* No mutation (immutable updates)
* Scalable approach



# ✅ 1️⃣ Todo Model (Type Safe)

```ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```



# ✅ 2️⃣ Component (Production Pattern)

```ts
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent {

  // 🔹 State
  todos = signal<Todo[]>([]);
  newTodo = signal('');

  // 🔹 Computed Signals
  totalTodos = computed(() => this.todos().length);

  completedTodos = computed(() =>
    this.todos().filter(t => t.completed).length
  );

  pendingTodos = computed(() =>
    this.todos().filter(t => !t.completed).length
  );

  // 🔹 Add Todo
  addTodo() {
    const title = this.newTodo().trim();
    if (!title) return;

    const todo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };

    this.todos.update(list => [...list, todo]);
    this.newTodo.set('');
  }

  // 🔹 Remove Todo
  removeTodo(id: number) {
    this.todos.update(list => list.filter(t => t.id !== id));
  }

  // 🔹 Toggle Complete
  toggleTodo(id: number) {
    this.todos.update(list =>
      list.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

}
```



# ✅ 3️⃣ Template

```html
<h2>Todo App</h2>

<input
  [value]="newTodo()"
  (input)="newTodo.set($any($event.target).value)"
  placeholder="Add todo"
/>

<button (click)="addTodo()">Add</button>

<hr />

<p>Total: {{ totalTodos() }}</p>
<p>Completed: {{ completedTodos() }}</p>
<p>Pending: {{ pendingTodos() }}</p>

<ul>
  <li *ngFor="let todo of todos(); trackBy: trackById">
    <input
      type="checkbox"
      [checked]="todo.completed"
      (change)="toggleTodo(todo.id)"
    />
    <span [style.textDecoration]="todo.completed ? 'line-through' : 'none'">
      {{ todo.title }}
    </span>
    <button (click)="removeTodo(todo.id)">X</button>
  </li>
</ul>
```



# ✅ 4️⃣ trackBy Function (Performance)

```ts
trackById(index: number, todo: Todo) {
  return todo.id;
}
```



# 🔥 Why This is Production Pattern?

✔ Uses strong typing
✔ Uses computed signals
✔ Immutable updates
✔ Uses trackBy
✔ No unnecessary change detection
✔ Fully zoneless compatible
✔ Scalable



# 🔎 Internally What Happens?

When:

```ts
this.todos.update(...)
```

Signal:

1. Creates new array reference
2. Marks dependent template dirty
3. Only todos() dependent UI updates
4. Computed signals auto-recalculate

No full app tree check.



# 🧠 Senior-Level Improvement (Optional)

You can move state to service:

```ts
@Injectable({ providedIn: 'root' })
export class TodoStore {

  todos = signal<Todo[]>([]);

  add(todo: Todo) {
    this.todos.update(list => [...list, todo]);
  }

}
```

Now multiple components can share same signal.


# 🚀 Real Interview Explanation

> "I use signals for local component state management. I keep state immutable, use computed signals for derived values, and optimize rendering using trackBy. This ensures predictable updates and zoneless compatibility."


# 🔥 Difference from RxJS Todo

Signals:

* Synchronous
* Simple state
* No subscription management
* Automatic dependency tracking

RxJS:

* Better for async streams
* API calls
* Complex reactive flows



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



Signals are intentionally small and composable — they pair well with Angular's existing APIs and are ideal for straightforward reactive local state.
