# Angular 20 → Latest: Modern Angular Features

## First Understand the Direction

Angular is moving broadly toward:

| Older Angular | Modern Angular |
|---|---|
| NgModules | Standalone |
| Zone.js | Zoneless |
| Default/Eager change detection | More targeted change detection |
| RxJS for almost all reactive state | Signals + RxJS |
| Reactive Forms | Signal Forms |
| Constructor DI | `inject()` |
| Traditional SSR | SSR + Incremental Hydration |

> **Interview Point:** You don't need to replace everything with the new APIs. The important skill is understanding **when and why the newer approach helps**.

---

# 1. Signals — Now Core Angular

Signals provide a reactive way to manage state.

## Simple Example

```ts
name = signal('Ganesh');

upperName = computed(() =>
  this.name().toUpperCase()
);

changeName() {
  this.name.set('Kumar');
}
```

### HTML

```html
<p>{{ name() }}</p>
<p>{{ upperName() }}</p>
```

## Real-World Scenario

Imagine an e-commerce page:

```ts
price = signal(1000);
quantity = signal(2);

total = computed(() =>
  this.price() * this.quantity()
);
```

When quantity changes:

```ts
quantity.set(3);
```

Angular knows that `total` depends on `quantity`.

```text
quantity
   ↓
computed()
   ↓
total
   ↓
UI
```

### Interview Point

Signals are excellent for **synchronous application/UI state**.

Signals do **not** mean RxJS is obsolete.

---

# 2. `linkedSignal()`

`linkedSignal()` is useful when one piece of state depends on another state but should still remain writable.

## Example

```ts
products = signal(['Laptop', 'Mobile']);

selectedProduct = linkedSignal(() =>
  this.products()[0]
);
```

If the products change, the selected product can react to the new source while still allowing the user to change the selection.

## Real-World Scenario

```text
Available Countries
        ↓
Selected Country
```

or:

```text
Available Products
        ↓
Selected Product
```

### When to Use

Use it when:

- State depends on another Signal.
- You need a default value based on that Signal.
- The value should still be manually changeable.

---

# 3. `resource()` / `httpResource()`

Angular is expanding Signals toward asynchronous data handling.

## Traditional Angular

```ts
users$ = this.http.get<User[]>('/api/users');
```

## Signal-Oriented Approach

Resource APIs can represent:

```text
Request
   ↓
Loading
   ↓
Data
   ↓
Error
```

Example:

```ts
users = httpResource<User[]>(
  () => '/api/users'
);
```

The UI can react to the resource state.

## Real-World Scenario

Suppose the page loads:

```text
/users/100
```

Then the user ID changes:

```text
100 → 200
```

The resource can reactively fetch the new user's data.

### Interview Point

Don't say:

> "`httpResource` replaces HttpClient or RxJS."

Better answer:

> "`httpResource` provides a Signal-oriented approach for reactive asynchronous data."

---

# 4. Zoneless Angular 🔴

This is one of the most important modern Angular topics.

## Traditional Angular

Angular traditionally relied heavily on Zone.js.

```text
Zone.js
   ↓
Something async happened
   ↓
Angular becomes aware
   ↓
Change detection
   ↓
UI update
```

## Modern Angular Direction

With Signals and explicit Angular notifications:

```text
Signal changes
      ↓
Angular knows
      ↓
Relevant view is marked
      ↓
UI updates
```

Angular 20.2 made zoneless stable, and Angular 21+ moved toward zoneless as the default.

Angular 20 could explicitly configure:

```ts
provideZonelessChangeDetection()
```

## Real-World Scenario

Imagine a large enterprise dashboard:

```text
50+ Components
      +
Charts
      +
Tables
      +
Filters
      +
Notifications
      +
Timers
      +
API Calls
```

Instead of relying on Zone.js to observe asynchronous activity broadly, Angular can use more explicit notifications about when views need updating.

### Senior Interview Priority: 🔴 Very High

Understand these concepts together:

```text
Zone.js
   ↓
Change Detection
   ↓
OnPush
   ↓
Signals
   ↓
Zoneless
```

---

# 5. Signal Forms

Signal Forms bring Angular's Signal model into forms.

## Traditional Reactive Forms

```ts
form = new FormGroup({
  name: new FormControl(''),
  email: new FormControl('')
});
```

## Signal Forms

Conceptually:

```ts
user = signal({
  name: '',
  email: ''
});

userForm = form(this.user);
```

## Why?

Forms contain a lot of reactive state:

```text
value
valid
invalid
dirty
touched
errors
```

Signal Forms allow this state to participate naturally in Angular's Signal model.

## Real-World Scenario

Imagine an enterprise capacity-request form containing:

- 30 fields
- Conditional fields
- Validation
- Calculated values
- Dynamic sections

Signal-based form state can integrate naturally with other Signal-based application state.

### Important Interview Point

Reactive Forms are **still valid**.

Don't say:

> "Signal Forms replaced Reactive Forms."

Instead explain that Signal Forms provide another approach that integrates with Angular's modern reactive model.

---

# 6. Incremental Hydration 🔴

Important for **SSR and performance interviews**.

## Normal SSR

```text
Server
   ↓
Generate HTML
   ↓
Browser receives HTML
   ↓
Angular hydrates application
```

## Incremental Hydration

```text
Server renders page
        ↓
Browser displays page
        ↓
Important area → hydrate
        ↓
Other areas → wait
        ↓
Hydrate when required
```

## Real-World Scenario

Imagine a news website:

```text
Header                ← Hydrate early
Main Article          ← Hydrate early

Recommendations       ← Later
Comments              ← On interaction
Large Chart           ← When visible
```

Instead of making the entire application interactive immediately, Angular can hydrate different portions when required.

It works closely with:

```html
@defer
```

and hydration triggers.

### Benefit

Can help reduce initial client-side work and improve startup performance.

---

# 7. `@defer`

`@defer` allows expensive components or dependencies to be loaded later.

## Example

```html
@defer (on viewport) {
  <app-heavy-chart />
} @placeholder {
  <p>Loading chart...</p>
}
```

Meaning:

> Don't immediately load the expensive chart. Load it when it becomes relevant or visible.

## Real-World Scenario

Imagine a dashboard:

```text
Top Summary       ← Load now

User Table        ← Load now

Analytics Chart   ← Below fold
                      ↓
                   @defer
                      ↓
                Load when visible
```

### Interview Point

`@defer` is an important feature to discuss when asked about:

- Initial bundle size
- Lazy loading
- Page-load performance
- Heavy components
- Below-the-fold content

---

# 8. Modern Dependency Injection with `inject()`

## Traditional Approach

```ts
constructor(
  private userService: UserService
) {}
```

## Modern Approach

```ts
private userService = inject(UserService);
```

Both approaches are important to understand.

`inject()` is especially useful with Angular's functional APIs.

## Real-World Example — Functional Guard

```ts
export const authGuard = () => {
  const auth = inject(AuthService);

  return auth.isLoggedIn();
};
```

Instead of creating a class only for dependency injection, dependencies can be accessed directly within the injection context.

---

# 9. Standalone Architecture

Modern Angular applications don't require NgModules for every feature.

## Older Architecture

```text
AppModule
    ↓
FeatureModule
    ↓
SharedModule
    ↓
Components
```

## Modern Architecture

```text
Application
    ↓
Routes
    ↓
Standalone Components
    ↓
Services / Signals
```

## Example

```ts
@Component({
  standalone: true,
  imports: [CommonModule],
  ...
})
export class UserComponent {}
```

### Benefits

- Fewer NgModules
- Clearer component dependencies
- Easier lazy loading
- Simpler application structure

### Interview Point

Know **both architectures**.

Enterprise applications may still contain large amounts of NgModule-based code.

---

# 10. Modern Control Flow

Modern Angular provides built-in template control flow.

## `*ngIf` → `@if`

### Older

```html
<div *ngIf="isLoggedIn">
  Welcome
</div>
```

### Modern

```html
@if (isLoggedIn) {
  <div>Welcome</div>
}
```

---

## `*ngFor` → `@for`

### Older

```html
<div *ngFor="let user of users">
  {{ user.name }}
</div>
```

### Modern

```html
@for (user of users; track user.id) {
  <div>{{ user.name }}</div>
}
```

## Real-World Benefit

Explicit tracking:

```html
@for (user of users; track user.id)
```

helps Angular associate rendered DOM elements with the corresponding data items efficiently.

---

# 11. Modern Signal Inputs

## Traditional Input

```ts
@Input()
userId!: number;
```

## Signal Input

```ts
userId = input.required<number>();
```

Read the value:

```ts
this.userId()
```

Derive another value:

```ts
displayId = computed(() =>
  `USER-${this.userId()}`
);
```

## Real-World Flow

```text
Parent Component
       ↓
    input()
       ↓
   computed()
       ↓
    Template
```

The input becomes part of Angular's Signal dependency graph.

---

# 12. Angular 21/22 Testing Direction

Angular's testing tooling is also modernizing.

## Older Angular Projects

```text
Karma
  +
Jasmine
```

## Modern Angular Direction

```text
Vitest
```

## E2E Testing

```text
Playwright
```

You don't need to forget Jasmine.

For interviews, understand both older and modern testing setups.

Since you already have Playwright experience, it is useful to connect your existing experience with modern Angular testing practices.

---

# What Should I Prepare First?

Don't spend equal time on every feature.

## 🔴 Deep Understanding — Highest Priority

Prepare these deeply:

1. Signals
2. Change Detection
3. OnPush
4. Zoneless Angular
5. RxJS vs Signals
6. `@defer` and performance
7. Standalone architecture

Understand the relationship:

```text
Zone.js
   ↓
Change Detection
   ↓
OnPush
   ↓
Signals
   ↓
Zoneless
```

Also understand:

```text
Signals ↔ RxJS
```

and:

```text
Standalone
     ↓
Lazy Loading
     ↓
@defer
     ↓
Performance
```

---

## 🟡 Good Understanding

Prepare enough to explain with an example:

- Signal `input()`
- Signal `output()`
- `model()`
- `linkedSignal()`
- `resource()`
- `httpResource()`
- SSR
- Hydration
- Incremental Hydration
- `inject()`
- Modern control flow
- Signal Forms

---

## 🟢 Awareness

Know what these are, but don't spend too much preparation time initially:

- Angular Aria
- MCP / AI tooling
- Smaller Angular release features

---

# Senior Angular Interview Mindset

The strongest interview answer is **not**:

> "I know Angular 22 features."

A stronger senior-level answer is:

> **"I understand how Angular evolved from NgModule and Zone.js-heavy applications toward standalone, Signal-based and zoneless architecture, and I understand where these changes can improve real enterprise applications."**

For every modern Angular feature, prepare these **5 questions**:

```text
1. What is it?
       ↓
2. Why was it introduced?
       ↓
3. What problem does it solve?
       ↓
4. Where would I use it in a real project?
       ↓
5. What are its trade-offs / when would I NOT use it?
```

That is the level to target for a **Senior Angular / Senior Frontend interview**.
