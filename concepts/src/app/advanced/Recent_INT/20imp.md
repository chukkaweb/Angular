
# 1️⃣ Angular Signals – `signal()`, `computed()`, `effect()`
## 🔎 What It Solves

Old Angular:
* Zone.js triggers change detection everywhere.
* Hard to control re-renders in large apps.

Signals:
* Fine-grained reactivity.
* Only dependent UI updates.

## 🏢 Real-Time Example

Analytics Dashboard:
* Filters (date, region)
* Charts
* KPI cards

```ts
filters = signal({ region: 'APAC', date: 'Today' });
totalSales = computed(() => {
  return calculateSales(this.filters());
});

effect(() => {
  console.log("Filters changed", this.filters());
});
```
When region changes:
✔ Only charts + KPIs update
❌ Entire page doesn’t re-render

## ❌ When NOT to use
* WebSockets
* Debounce search
* Complex async chaining

Use RxJS there.
## 🎯 Interview Line
> Signals are best for synchronous UI state. They reduce unnecessary change detection and make state management simpler compared to Subjects.



# 2️⃣ Signals vs RxJS (Very Important)
## 🟢 Signals → Sync State
* Form state
* Toggle states
* Selected tab
* Local component state

## 🔵 RxJS → Async Streams
* HTTP calls
* Debounce
* switchMap
* Retry
* WebSocket
## 🏢 Real Interview Example

Search Feature:

```ts
searchText = signal('');

results$ = toObservable(this.searchText).pipe(
  debounceTime(500),
  switchMap(text => this.api.search(text))
);

results = toSignal(this.results$);
```

Explanation:

* searchText → UI state (Signal)
* API → Async (RxJS)
* Result converted back to Signal

## 🎯 Interview Line

> In real apps, I don’t replace RxJS with signals. I use signals for UI state and RxJS for async flows, then bridge them properly.

That sounds senior.

# 3️⃣ Zoneless Angular
## 🔎 Problem

Zone.js:

* Patches async APIs.
* Triggers change detection globally.

Even unrelated async tasks can cause re-render.

## 🏢 Real Example

Large enterprise dashboard:

* Multiple background timers
* WebSocket updates
* API polling

Before:
Unnecessary change detection cycles.

After using signals + zoneless:
Only exact UI parts update.

## 🎯 Interview Line

> Zoneless Angular improves performance by removing global patching and relying on explicit reactive updates via signals.


# 4️⃣ OnPush + Signals (Power Combo)

## 🔎 Problem

Default strategy:
* Checks entire component tree.

OnPush:
* Checks only when input changes.

Signals:
* Notify Angular directly.

## 🏢 Real Example

Reusable Table Component (1000 rows):
Without OnPush:
Scrolling or filter change triggers full re-render.

With OnPush + Signals:
Only modified rows update.

Performance improvement noticeable in admin dashboards.

## 🎯 Interview Line

> Combining OnPush and signals gives predictable and minimal change detection, which is ideal for large reusable components.

# 5️⃣ Standalone Components Architecture
## 🔎 Why Angular Moved Away from NgModules

Problems:

* Boilerplate
* Hard dependency tracking
* Confusing imports

Standalone:

* Component-first architecture
* Better lazy loading
* Cleaner structure

## 🏢 Real Example

Admin feature:

```ts
{
  path: 'admin',
  loadComponent: () => import('./admin.component')
}
```

Only loads when needed.

Improves:

* Initial bundle size
* LCP



# 6️⃣ Route-Level Code Splitting & @defer

## 🔎 Problem
Heavy components slow initial load.

Example:

* Charts
* Maps
* Large grids

## 🏢 Real Example

Home page:

```html
@defer (on viewport) {
  <analytics-chart />
}
```

Chart loads only when scrolled into view.

Improves:

* TTI
* Perceived performance

## 🎯 Interview Line

> I use route-level lazy loading and deferrable views to improve initial load performance in large applications.

# 7️⃣ TrackBy vs Signals (Large Lists)

Even with signals:

If TrackBy not used:
Angular recreates DOM nodes.

```ts
trackById(index, item) {
  return item.id;
}
```

## 🏢 Real Example

1000-row financial table.

With TrackBy:
Only changed row updates.

Without:
Whole list re-renders.

# 8️⃣ Dependency Injection Tree

Levels:

* Root → Singleton
* Component → Per instance
* Environment → App config

## 🏢 Real Example

AuthService → root
ModalService → component-level

Each modal gets its own state.

## 🎯 Interview Line

> I carefully decide provider scope to avoid unintended shared state or memory leaks.



# 9️⃣ Http Interceptors (Real Auth Flow)

Order matters.

Example pipeline:

1. Add token
2. Catch 401
3. Refresh token
4. Retry request
5. Global error handler

If order wrong → infinite loop possible.

## 🎯 Senior Answer

> In production apps, interceptor order is critical especially for refresh token logic.



# 🔟 State Management Without NgRx

Medium-sized app:

```ts
@Injectable({ providedIn: 'root' })
class UserStore {
  user = signal<User | null>(null);

  setUser(user: User) {
    this.user.set(user);
  }
}
```

Simple, readable, less boilerplate.


# 1️⃣4️⃣ When NgRx Still Makes Sense

Use NgRx when:

* Multi-team development
* Complex async workflows
* Strict immutability needed
* Audit logging required

Example:
Banking platform with strict compliance.



# 1️⃣5️⃣ Pure vs Impure Pipes

Impure pipes:
Run every CD cycle.

In 1000-row table:
Massive performance hit.

Always prefer pure.



# 1️⃣6️⃣ Smart vs Dumb Components

Smart:

* Fetches data
* Handles logic

Dumb:

* UI only
* Reusable

Real Example:
ProductCard reused across pages.

Improves:

* Testability
* Maintainability



# 1️⃣8️⃣ SSR & Hydration

SSR:
Server sends ready HTML.

Hydration:
Angular attaches to existing DOM.

Used in:

* Ecommerce
* Marketing sites

Improves:

* SEO
* LCP



# 1️⃣9️⃣ Memory Leaks (Common in Real Apps)

Sources:

* Subscriptions
* setInterval
* Effects without cleanup

Modern Solution:

```ts
takeUntilDestroyed()
```

Senior dev must mention this confidently.

# 2️⃣0️⃣ Performance Metrics

Important:

* LCP
* TTI
* CLS

## How Angular Helps
✔ Lazy loading
✔ OnPush + Signals
✔ @defer
✔ Bundle optimization
✔ TrackBy



# 🔥 Final Interview Strategy

Don’t define.

Say something like:

> In our enterprise dashboard with 200+ components, we migrated local Subject-based state to signals and combined it with OnPush strategy. This reduced unnecessary change detection and improved rendering performance noticeably.


