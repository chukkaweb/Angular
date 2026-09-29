
# C. Performance Optimization (Angular Focused)

# 1️⃣ Avoiding Unnecessary API Calls + Caching using shareReplay

## Problem

Multiple components calling same API → duplicate network calls.

## ❌ Without caching

```ts
getUsers() {
  return this.http.get('/api/users');
}
```
Every subscription → new API call.

## ✅ With shareReplay (Best Practice)

```ts
private users$ = this.http.get('/api/users').pipe(
  shareReplay(1)
);

getUsers() {
  return this.users$;
}
```

Now:
* First call → API hit
* Next calls → cached response

Where exactly is it cached?
In JavaScript memory inside the running application, managed internally by RxJS's sharing/replay mechanism.
It is not stored in:
- browser localStorage ❌
- sessionStorage ❌
- database ❌
- server ❌
- browser HTTP cache necessarily ❌
It's essentially in-memory RxJS state associated with that observable.
Why 1?
shareReplay(1)

means:
Remember/replay the latest 1 emitted value to new subscribers.

## Real Use Case

Dashboard:
* Header component needs user
* Sidebar needs user
* Profile needs user
Instead of 3 calls → 1 call shared.


## Interview Line
"I use shareReplay(1) to cache API responses and prevent multiple unnecessary network calls across components."

# 2️⃣ Interceptors (Headers, Errors, Mocking)
## A. Add Custom Headers (JWT)
```ts
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const token = localStorage.getItem('token');
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next.handle(cloned);
}
```
## B. Centralized Error Handling
```ts
return next.handle(req).pipe(
  catchError(error => {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
    return throwError(() => error);
  })
);
```

## C. Mocking API (Development Mode)

```ts
if (environment.mock) {
  return of(mockData).pipe(delay(1000));
}
```

## Interview Line
"I use interceptors for centralized token management, error handling, logging, and development mocking to maintain clean service code."



# 3️⃣ Virtual Scrolling + Server Side Pagination

## Problem
Large dataset (10,000 records) → UI lag.

## ✅ Virtual Scrolling (Angular CDK)

```html
<cdk-virtual-scroll-viewport itemSize="50" class="viewport">
  <div *cdkVirtualFor="let item of items">
    {{ item.name }}
  </div>
</cdk-virtual-scroll-viewport>
```

✔ Renders only visible items.


## ✅ Server-Side Pagination

Instead of loading all data:

```ts
getUsers(page: number, size: number) {
  return this.http.get(`/api/users?page=${page}&size=${size}`);
}
```

## Server-side filtering

```ts
getUsers(filter: string) {
  return this.http.get(`/api/users?search=${filter}`);
}
```

## Interview Line

"For large datasets, I prefer server-side pagination and filtering. For UI rendering, I use CDK virtual scrolling to render only visible rows."


# 4️⃣ Change Detection + Reusable Components + Signals

## Default Change Detection
Checks entire component tree → expensive.

## ✅ OnPush Strategy

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```
Only updates when:
* Input reference changes
* Event triggered
* Observable emits


## Signals (Angular 16+)

Better for performance.

```ts
count = signal(0);

increment() {
  this.count.update(v => v + 1);
}
```

Signals update only dependent UI parts.


## Reusable Component Best Practice

✔ Use OnPush
✔ Use immutable data
✔ Avoid unnecessary subscriptions


## Interview Line

"I use OnPush for reusable components and signals for fine-grained reactivity to reduce unnecessary change detection cycles."



# 5️⃣ Preventing Memory Leaks

## ❌ Bad Practice

```ts
this.api.getUsers().subscribe();
```
Without unsubscribe → memory leak.


## ✅ Best Practice 1: takeUntil

```ts
private destroy$ = new Subject<void>();

ngOnInit() {
  this.api.getUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe();
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## ✅ Best Practice 2: Async Pipe (Recommended)

```html
<div *ngFor="let user of users$ | async">
```

Angular auto unsubscribes.

## ✅ Best Practice 3: Signals (No unsubscribe needed)

Signals automatically clean up.



## Real Production Example

Memory leak happened due to:
* interval()
* valueChanges subscription
* WebSocket not closed

Fix:

* takeUntil
* complete subjects
* close socket in ngOnDestroy

## Interview Line

"I prevent memory leaks using async pipe, takeUntil pattern, cleaning subscriptions in ngOnDestroy, and avoiding unnecessary manual subscriptions."

# Senior-Level Summary (Very Important)

When asked about performance:

Say this:

"I optimize Angular performance by reducing unnecessary API calls with shareReplay, using interceptors for centralized concerns, implementing virtual scrolling and server-side pagination for large datasets, leveraging OnPush and Signals for efficient change detection, and preventing memory leaks with proper subscription management."
