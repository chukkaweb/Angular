# Senior Angular Coding & Scenario-Based Interview Questions
> Practical coding and scenario-based questions for Senior Angular / Frontend interviews.

## How to Practice
For every question, don't just memorize the code. Be ready to explain:
1. What problem are we solving?
2. Why did I choose this approach?
3. How does it work internally?
4. What alternatives are available?
5. What are the trade-offs?

---

# 1. Signals — `signal()` + `computed()` 🔴

## Question
Create `price` and `quantity` state and automatically calculate the total whenever either value changes.

## Answer
```ts
price = signal(1000);
quantity = signal(2);

total = computed(() =>
  this.price() * this.quantity()
);

increaseQuantity() {
  this.quantity.update(q => q + 1);
}
```

### HTML

```html
<p>Price: {{ price() }}</p>
<p>Quantity: {{ quantity() }}</p>
<p>Total: {{ total() }}</p>

<button (click)="increaseQuantity()">+</button>
```

### How It Works
```text
price ───────┐
             ↓
          computed()
             ↓
           total
             ↓
             UI
             ↑
quantity ────┘
```

Angular automatically tracks the Signals read inside `computed()`.

### Follow-Up
**Why use `computed()` instead of `effect()`?**
`computed()` is for **derived values**.

```ts
total = computed(() =>
  this.price() * this.quantity()
);
```

`effect()` is for **side effects**.

```ts
effect(() => {
  console.log(this.quantity());
});
```

### Interview Rule
```text
Need derived value?
       ↓
   computed()

Need side effect?
       ↓
    effect()
```

---

# 2. Find the Signal Bug 🔴
## Question
What is wrong with this code?

```ts
count = signal(0);

doubleCount = this.count() * 2;
```

I expect `doubleCount` to update whenever `count` changes.
## Answer
`doubleCount` is calculated when that line executes. It is not reactive.

Use `computed()`:

```ts
count = signal(0);

doubleCount = computed(() =>
  this.count() * 2
);
```

Now Angular tracks `count()` as a dependency.

```text
count changes
     ↓
computed recalculates
     ↓
doubleCount changes
     ↓
UI updates
```

---

# 3. Updating an Object Signal
## Question
Given:
```ts
user = signal({
  name: 'Ganesh',
  age: 33
});
```

Update only the user's name.

## Answer

```ts
updateName(name: string) {
  this.user.update(user => ({
    ...user,
    name
  }));
}
```

Avoid directly mutating the existing object:

```ts
this.user().name = 'Kumar'; // ❌
```

Prefer creating a new object:

```ts
this.user.update(user => ({
  ...user,
  name: 'Kumar'
}));
```

### Interview Point

Prefer immutable updates when working with object state.

---

# 4. `computed()` vs `effect()` 🔴

## Question

You have:

```ts
firstName = signal('Ganesh');
lastName = signal('Chukka');
```

Requirements:

1. Display the full name.
2. Send/log something whenever the full name changes.

What would you use?

## Answer

Use `computed()` for the derived value:

```ts
fullName = computed(() =>
  `${this.firstName()} ${this.lastName()}`
);
```

Use `effect()` for the side effect:

```ts
effect(() => {
  console.log('User changed:', this.fullName());
});
```

### Simple Rule

```text
Derived State
     ↓
computed()

Side Effect
     ↓
effect()
```

---

# 5. Modern Signal Input 🔴

## Question

A parent component passes `userId` to a child.

Implement it using modern Angular Signal inputs.

## Parent

```html
<app-user [userId]="selectedUserId()" />
```

## Child

```ts
userId = input.required<number>();

displayId = computed(() =>
  `USER-${this.userId()}`
);
```

## Follow-Up

**How is this different from `@Input()`?**

Traditional:

```ts
@Input()
userId!: number;
```

Modern:

```ts
userId = input.required<number>();
```

The modern input is a Signal and naturally participates in Angular's reactive dependency graph.

```text
Parent
   ↓
input()
   ↓
computed()
   ↓
Template
```

---

# 6. `linkedSignal()` Scenario 🟡

## Question

You have a list of products and a selected product.

When the product list changes, you want the selection to be based on the latest product list, but the user should still be able to manually change the selected product.

## Answer

```ts
products = signal([
  'Laptop',
  'Mobile'
]);

selectedProduct = linkedSignal(() =>
  this.products()[0]
);
```

The user can still change it:

```ts
this.selectedProduct.set('Mobile');
```

## Real-World Scenarios

```text
Available Countries
        ↓
Selected Country
```

```text
Available Products
        ↓
Selected Product
```

### Interview Point

Use `linkedSignal()` when state:

- Depends on another reactive value.
- Needs a default/linked value.
- Still needs to remain writable.

---

# 7. RxJS vs Signals 🔴

## Question

Which would you use for these requirements?

- Selected tab
- Logged-in user state
- Calculated total
- WebSocket events
- Debounced search
- Complex asynchronous streams

## Answer

| Requirement | Good Choice |
|---|---|
| Selected tab | Signal |
| Local UI state | Signal |
| Calculated total | `computed()` |
| Derived state | `computed()` |
| WebSocket events | RxJS |
| Debounced search | RxJS |
| Complex async streams | RxJS |

### Senior-Level Answer

> Signals are very useful for synchronous reactive application and UI state. RxJS remains valuable for asynchronous streams, cancellation, debouncing and complex event composition.

Do **not** say:

> "Signals replace RxJS."

---

# 8. Search API with `switchMap()` 🔴

## Question

Build a search feature where:

- User types text.
- Wait 300ms.
- Avoid duplicate searches.
- Cancel the previous API request when new text arrives.

## Answer

```ts
searchControl.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(search =>
      this.userService.searchUsers(search)
    )
  )
  .subscribe(users => {
    this.users = users;
  });
```

## How It Works

```text
User types "A"
      ↓
Request A starts

User types "AB"
      ↓
Previous inner request is unsubscribed
      ↓
Request AB starts
```

### Interview Point

`switchMap()` is a good choice when **only the latest request matters**.

Common examples:

- Search
- Autocomplete
- Route-parameter-based API calls

---

# 9. `switchMap` vs `concatMap` vs `mergeMap` vs `exhaustMap` 🔴

This is one of the most important RxJS scenario questions.

## Search Box

Use:

```text
switchMap
```

Because:

```text
Latest request matters
```

Example:

```ts
search$.pipe(
  switchMap(value =>
    this.api.search(value)
  )
);
```

---

## Sequential Operations

Use:

```text
concatMap
```

Because operations should run one after another.

```text
Request 1
   ↓
Complete
   ↓
Request 2
   ↓
Complete
   ↓
Request 3
```

---

## Parallel Independent Operations

Use:

```text
mergeMap
```

```text
Request 1 ─────────→

Request 2 ─────→

Request 3 ───────────→
```

They can run concurrently.

---

## Prevent Multiple Submissions

Use:

```text
exhaustMap
```

Example:

```text
Login Click
    ↓
Request running

Click again
    ↓
Ignored

Request completes
    ↓
Next click accepted
```

Useful for:

- Login
- Payment
- Form submission

### Quick Memory Trick

| Operator | Think |
|---|---|
| `switchMap` | Switch to latest |
| `concatMap` | Queue |
| `mergeMap` | Parallel |
| `exhaustMap` | Ignore new until current completes |

---

# 10. Avoid Duplicate HTTP Calls with `shareReplay()` 🔴

## Question

Three components need the same configuration API.

How can you avoid unnecessary repeated requests?

## Answer

```ts
config$ = this.http
  .get<AppConfig>('/api/config')
  .pipe(
    shareReplay(1)
  );
```

Multiple subscribers can share the source and receive the replayed latest value.

## Follow-Up

**Where is the value cached?**

In JavaScript memory associated with the RxJS observable.

It is **not automatically stored** in:

```text
localStorage ❌
sessionStorage ❌
database ❌
server cache ❌
```

---

# 11. OnPush Change Detection Scenario 🔴

## Question

Why can direct object mutation be problematic with `OnPush` components?

```ts
this.user.name = 'Ganesh';
```

## Answer

The object reference remains the same.

```text
Object
  ↓
Property mutation
  ↓
Same reference
```

Prefer creating a new reference:

```ts
this.user = {
  ...this.user,
  name: 'Ganesh'
};
```

Now:

```text
Old Object
    ↓
New Object
    ↓
New Reference
```

### Senior Follow-Up

Be prepared to explain:

```text
Default Change Detection
        ↓
OnPush
        ↓
Signals
        ↓
Zoneless
```

---

# 12. Zoneless Angular Scenario 🔴

## Question

Why would you consider zoneless Angular for a large application?

## Answer

Traditional Angular relies on Zone.js to observe asynchronous activity.

```text
Async Event
    ↓
Zone.js observes it
    ↓
Angular synchronization/change detection
```

Modern Angular can use more explicit notifications, including Signals and Angular APIs.

```text
State changes
     ↓
Angular knows
     ↓
Relevant view marked
     ↓
UI update
```

### Senior-Level Understanding

Know these concepts together:

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

# 13. Large List with `@for` 🔴

## Question

You need to render 5,000 users.

How would you help Angular efficiently identify list items?

## Answer

```html
@for (user of users(); track user.id) {
  <app-user [user]="user" />
}
```

## Why `track user.id`?

It gives Angular a stable identity for each item.

```text
User ID 101 → DOM element 101
User ID 102 → DOM element 102
User ID 103 → DOM element 103
```

Angular can efficiently associate data items with existing DOM elements when the collection changes.

---

# 14. `@defer` Performance Scenario 🔴

## Question

Your dashboard contains a large chart below the fold.

The chart increases initial loading cost.

What would you do?

## Answer

```html
@defer (on viewport) {

  <app-analytics-chart />

} @placeholder {

  <div>Chart loading...</div>

}
```

## Flow

```text
Page loads
    ↓
Chart not visible
    ↓
Don't load it yet
    ↓
User scrolls
    ↓
Chart enters viewport
    ↓
Load chart
```

### Use Cases

- Charts
- Maps
- Rich editors
- Large widgets
- Below-the-fold sections
- Heavy third-party libraries

---

# 15. Lazy-Load a Route 🔴

## Question

The admin feature is rarely used.

How would you avoid loading it as part of the initial application route?

## Standalone Component

```ts
{
  path: 'admin',
  loadComponent: () =>
    import('./admin/admin.component')
      .then(m => m.AdminComponent)
}
```

## Lazy Route Configuration

```ts
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
}
```

## Follow-Up

**Difference between route lazy loading and `@defer`?**

```text
Route Lazy Loading
        ↓
Load feature based on navigation
```

```text
@defer
   ↓
Delay loading part of the current view
```

---

# 16. Functional Guard with `inject()` 🟡

## Question

Protect the `/admin` route.

## Answer

```ts
export const authGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/login']);
};
```

Route:

```ts
{
  path: 'admin',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./admin/admin.component')
      .then(m => m.AdminComponent)
}
```

### Interview Point

Be ready to explain:

- `inject()`
- Functional guards
- Injection context
- Why returning a `UrlTree` is useful

---

# 17. HTTP Authentication Interceptor 🔴

## Question

Add an authentication token to API requests.

## Answer

```ts
export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    const auth = inject(AuthService);

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.token()}`
      }
    });

    return next(authReq);
  };
```

## Common Follow-Up Questions

### How would you handle `401` globally?

Use the interceptor to detect authentication errors and trigger the appropriate authentication/refresh flow.

### What if the access token expires?

Implement a refresh-token strategy if the backend supports it.

### What if five API calls receive `401` simultaneously?

A senior-level solution should avoid triggering five independent refresh-token requests.

Think about:

```text
Multiple 401s
     ↓
Single Refresh Request
     ↓
New Token
     ↓
Retry Waiting Requests
```

---

# 18. Two-Way Binding with `model()` 🟡

## Question

A child component controls quantity, but the parent also needs the updated value.

## Child

```ts
quantity = model(1);
```

## Parent

```html
<app-counter [(quantity)]="quantity" />
```

### Concept

```text
Parent
   ↓
quantity

   ↕ two-way binding

Child
   ↓
model()
```

Useful for component APIs that naturally support two-way binding.

---

# 19. Subscription Memory Leak Scenario 🔴

## Question

What potential issue exists here?

```ts
ngOnInit() {
  this.service.events$
    .subscribe(data => {
      this.data = data;
    });
}
```

## Answer

If `events$` is a long-lived stream, the subscription may remain active after the component is destroyed unless managed correctly.

Modern Angular:

```ts
private destroyRef = inject(DestroyRef);

ngOnInit() {
  this.service.events$
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(data => {
      this.data = data;
    });
}
```

## Follow-Up

**Does every HTTP subscription create a memory leak?**

No.

Angular `HttpClient` request observables normally complete after the response.

Pay more attention to long-lived streams such as:

- WebSockets
- Intervals
- Event streams
- Subjects
- Router/event subscriptions

---

# 20. Combine Multiple API Calls 🔴

## Question

A dashboard needs:

- Users
- Orders
- Configuration

You want to continue only after all three one-time HTTP requests complete.

## Answer

```ts
forkJoin({
  users: this.userService.getUsers(),
  orders: this.orderService.getOrders(),
  config: this.configService.getConfig()
})
.subscribe(result => {

  console.log(result.users);
  console.log(result.orders);
  console.log(result.config);

});
```

## Why `forkJoin()`?

```text
Users API ────────┐
                  │
Orders API ───────┼─→ All complete → Result
                  │
Config API ───────┘
```

It waits for all supplied observables to complete and then emits their latest/final values together.

### Follow-Up

**What happens if one API fails?**

Without error handling, the combined stream errors.

Be prepared to discuss `catchError()` and whether:

- Entire page should fail.
- Individual API failure should have a fallback.
- Partial data is acceptable.

---

# 21. Complete Search Scenario 🔴

## Question

Build a user search with:

- 300ms debounce
- Duplicate search prevention
- Previous request cancellation
- Loading indicator
- Error handling
- Future searches should continue after an error

## Answer

```ts
loading = signal(false);
error = signal<string | null>(null);

searchControl.valueChanges
  .pipe(
    debounceTime(300),

    distinctUntilChanged(),

    tap(() => {
      this.loading.set(true);
      this.error.set(null);
    }),

    switchMap(search =>
      this.userService.searchUsers(search)
        .pipe(
          catchError(() => {
            this.error.set('Unable to load users');
            return of([]);
          }),
          finalize(() => {
            this.loading.set(false);
          })
        )
    )
  )
  .subscribe(users => {
    this.users = users;
  });
```

## Concepts Tested

```text
Reactive Forms
      +
RxJS
      +
debounceTime()
      +
distinctUntilChanged()
      +
switchMap()
      +
catchError()
      +
finalize()
      +
Signals
```

### Why put `catchError()` inside `switchMap()`?

It handles the individual API request failure while allowing the outer search stream to remain usable for later searches.

This is a good **Senior Angular coding question**.

---

# 22. Angular Performance Debugging Scenario 🔴

## Question

Your Angular dashboard became slow after adding:

- Large tables
- Charts
- Multiple API calls
- Filters
- Many components

How would you investigate?

## Answer

Don't immediately start changing code.

First identify the actual bottleneck.

```text
Reproduce Problem
       ↓
Measure/Profile
       ↓
Identify Bottleneck
       ↓
Is it:

Network?
Bundle size?
Rendering?
Change detection?
Large DOM?
Expensive computation?
Repeated API calls?
Memory?
       ↓
Apply targeted optimization
       ↓
Measure again
```

## Possible Solutions

Depending on the actual problem:

- Signals
- `OnPush`
- Proper `track`
- Route lazy loading
- `@defer`
- Virtual scrolling
- Code splitting
- Reduce unnecessary subscriptions
- Avoid duplicate API calls
- Optimize expensive calculations
- Optimize large DOM rendering
- Optimize images/assets
- Cache appropriate data

### Senior Interview Point

Don't say:

> "The application is slow, so I will use OnPush."

Say:

> "First I would profile the application and identify whether the bottleneck is network, JavaScript execution, rendering, change detection, bundle size or API behavior. Then I would apply the appropriate optimization and measure again."

---

# 23. Route Parameter → API Call 🔴

## Question

The page URL changes:

```text
/users/100
/users/200
/users/300
```

Whenever the ID changes, fetch the latest user and cancel the previous request.

## Answer

```ts
this.route.paramMap
  .pipe(
    map(params => params.get('id')),
    filter((id): id is string => !!id),
    distinctUntilChanged(),

    switchMap(id =>
      this.userService.getUser(id)
    )
  )
  .subscribe(user => {
    this.user = user;
  });
```

### Why `switchMap()`?

If navigation changes quickly:

```text
User 100 request
      ↓
Navigate to 200
      ↓
Old inner request unsubscribed
      ↓
User 200 request
```

Only the latest route state matters.

---

# 24. Parent → Child → Parent Communication

## Question

How would you implement communication where:

1. Parent sends user information to child.
2. Child sends an action back to parent.

## Traditional Approach

Child:

```ts
@Input() user!: User;

@Output()
deleteUser = new EventEmitter<number>();
```

Modern Angular can use signal-based component APIs such as:

```ts
user = input.required<User>();

deleteUser = output<number>();
```

Child:

```ts
remove() {
  this.deleteUser.emit(this.user().id);
}
```

Parent:

```html
<app-user
  [user]="selectedUser()"
  (deleteUser)="removeUser($event)"
/>
```

---

# 25. Expensive Calculation Scenario

## Question

A component performs an expensive calculation based on Signal state.

How can you avoid recalculating it unnecessarily?

## Answer

Use `computed()`:

```ts
products = signal<Product[]>([]);

expensiveResult = computed(() => {
  return this.calculateReport(
    this.products()
  );
});
```

`computed()` values are memoized and recalculated when their tracked dependencies change.

### Interview Point

Don't call expensive methods directly from templates unnecessarily:

```html
<!-- Avoid when calculateTotal() is expensive -->
{{ calculateTotal() }}
```

Prefer derived reactive state when appropriate:

```html
{{ total() }}
```

---

# Highest-Priority Practice

For a Senior Angular interview, practice these first:

| Priority | Topic |
|---|---|
| 🔴 | Signals + `computed()` + `effect()` |
| 🔴 | Signals vs RxJS |
| 🔴 | Change Detection + OnPush |
| 🔴 | Zoneless Angular |
| 🔴 | `switchMap` / `concatMap` / `mergeMap` / `exhaustMap` |
| 🔴 | Debounced API search |
| 🔴 | RxJS subscription management |
| 🔴 | Performance debugging |
| 🔴 | `@defer` |
| 🔴 | Lazy loading |
| 🔴 | Interceptors / authentication |
| 🟡 | `input()` / `output()` / `model()` |
| 🟡 | `linkedSignal()` |
| 🟡 | `resource()` / `httpResource()` |
| 🟡 | Functional guards + `inject()` |
| 🟡 | Signal Forms |
| 🟡 | SSR + Hydration |

---

# Senior-Level Follow-Up Pattern

After solving every coding question, practice answering these four questions:

```text
Why did you choose this approach?
              ↓
How does it work internally?
              ↓
What alternative could you use?
              ↓
What are the trade-offs?
```

## Example

If the interviewer asks:

> Why did you use `switchMap()` here?

Don't answer only:

> "Because switchMap cancels requests."

A better Senior-level answer:

> "This is a search scenario where only the latest user input matters. `switchMap` unsubscribes from the previous inner observable when a new search value arrives, so stale responses don't update the UI. If every request needed to complete in order, I would consider `concatMap` instead."

---

# Final Preparation Strategy

For each topic, practice in this order:

```text
Concept
   ↓
Small Code Example
   ↓
Real-World Scenario
   ↓
Why This Approach?
   ↓
Alternative Approach
   ↓
Performance / Trade-Off
   ↓
Senior-Level Follow-Up
```

The goal is not only to write working Angular code.

For a **Senior Angular / Senior Frontend Engineer**, you should be able to explain **why the solution is appropriate for the scenario and what trade-offs you considered**.
