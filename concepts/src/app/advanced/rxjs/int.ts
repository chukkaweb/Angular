//  1. What is RxJS and why do we use it in Angular?
// Answer:
// RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables, to handle asynchronous events.

// Why in Angular?
// Angular uses RxJS for:

// * HTTP calls (`HttpClient` returns observables)
// * Form control value changes
// * Event handling
// * Reactive programming patterns

// Example:
// this.http.get('api/users').subscribe(data => console.log(data));


// Real-world:
// Fetching user data from an API, listening to search input changes, or managing WebSocket connections.
//  2. What is an Observable? How is it different from a Promise?
// Answer:
// Observable: A stream of data that can emit multiple values over time.

// Difference from Promise:

// | Feature        | Observable        | Promise   |
// | -- | -- |  |
// | Emission       | Multiple values   | One value |
// | Lazy Execution | Yes               | Yes       |
// | Cancelable     | Yes (unsubscribe) | No        |
// | Operators      | Rich operators    | No        |

// Example:
// of(1, 2, 3).subscribe(console.log); // emits 1, 2, 3
// Real-world:
// Live search input (stream of values) is handled with `Observable`, not `Promise`.

//  3. What is the use of `takeUntil()` operator?
// Answer:
// `takeUntil()` unsubscribes from an observable when another observable emits.

// Example:
// ngOnInit() {
//   interval(1000)
//     .pipe(takeUntil(this.destroy$))
//     .subscribe(console.log);
// }

// ngOnDestroy() {
//   this.destroy$.next();
//   this.destroy$.complete();
// }
// Real-world:
// Automatically unsubscribe when a component is destroyed to prevent memory leaks.

//  4. What is the purpose of `forkJoin()` in RxJS?
// Answer:
// `forkJoin()` is used to execute multiple observables in parallel and get the final values after all complete.
// Example:
// forkJoin([
//   this.userService.getUser(),
//   this.orderService.getOrders()
// ]).subscribe(([user, orders]) => {
//   console.log(user, orders);
// });
// Real-world:
// Fetch user and their orders together after both API calls finish.

//  5. What is the difference between `tap()` and `map()`?

// Topic: tap vs map
// ```
// This structure ensures you always get:
// * Concept
// * Difference
// * Example
// * Interview explanation

// # 📘 Now the Answer (tap vs map)

// # 1️⃣ map() – Used to Transform Data
// ### Simple Meaning
// `map()` is used when you want to **change the value emitted by an observable**.

// It **transforms the data**.
// 👉 Input → Modify → Output

// ### Example

// ```ts
// import { of, map } from 'rxjs';

// of(1,2,3)
// .pipe(
//   map(x => x * 2)
// )
// .subscribe(console.log);
// ```
// Output:
// ```
// 2
// 4
// 6
// ```

// Here `map()` **changes the emitted value**.

// ### Real-Time Angular Example
// API returns user data:
// ```
// {
//  id: 1,
//  firstName: "Ganesh",
//  lastName: "Chukka"
// }
// ```

// You want **full name**.
// ```ts
// this.http.get('/api/user')
// .pipe(
//   map(user => `${user.firstName} ${user.lastName}`)
// )
// .subscribe(name => console.log(name));
// ```

// Now UI receives:
// ```
// Ganesh Chukka
// ```

// ### Interview Explanation
// You can say:
// > `map()` is used to transform the data emitted by an observable. For example, when an API returns user details, I can use map to transform the response into the required format for the UI.


// # 2️⃣ tap() – Used for Side Effects
// ### Simple Meaning
// `tap()` is used to **perform side effects without changing the data**.
// It is mostly used for:
// * Logging
// * Debugging
// * Analytics
// * Triggering events

// 👉 Observe → Do something → Pass data unchanged

// ### Example

// ```ts
// import { of, tap } from 'rxjs';

// of(1,2,3)
// .pipe(
//   tap(x => console.log("Value:", x))
// )
// .subscribe(console.log);
// ```

// Output
// ```
// Value: 1
// 1
// Value: 2
// 2
// Value: 3
// 3
// ```

// Data is **not modified**.

// ### Real-Time Angular Example
// Logging API response.
// ```ts
// this.http.get('/api/products')
// .pipe(
//   tap(res => console.log('API Response:', res))
// )
// .subscribe();
// ```

// Useful for debugging production issues.
// ### Interview Explanation
// You can say:
// > `tap()` is used for side effects like logging, debugging, or analytics tracking without modifying the data stream.

// # 🔥 Key Difference (Interview Table)

// | Feature       | map()               | tap()               |
// | ------------- | ------------------- | ------------------- |
// | Purpose       | Transform data      | Side effects        |
// | Changes value | Yes                 | No                  |
// | Return value  | Modified data       | Same data           |
// | Use case      | Modify API response | Logging / debugging |

// ---

// # 🧠 Real Angular Interview Scenario
// Example pipeline:
// ```ts
// this.http.get('/api/products')
// .pipe(
//   tap(() => this.loading = true),
//   map(products => products.filter(p => p.active)),
//   tap(() => this.loading = false)
// )
// .subscribe();
// ```

// Explanation:

// * `tap()` → update loader
// * `map()` → transform data

// # 🎯 Perfect Interview Answer (Short)

// If interviewer asks **tap vs map**:
// > `map()` is used to transform the data emitted by an observable, while `tap()` is used for side effects like logging or debugging without modifying the data stream.

// # ⭐ Pro Tip (Interviewers Love This)

// Say this line:
// > `tap()` is mainly used for debugging and side effects, while `map()` should be used when you want to change the data flowing through the stream.

// That sounds like **real project experience**.


//  6. How to cancel HTTP requests using RxJS?
// Answer:
// Use `takeUntil()` with `unsubscribe` logic or `switchMap()` which cancels the previous inner observable.
// Example (search input):
// this.searchInput.valueChanges.pipe(
//   debounceTime(300),
//   switchMap(value => this.http.get(`api/search?q=${value}`))
// ).subscribe(console.log);

// Real-world:
// Cancel the previous API call when the user types again in search bar.

// 7. How do you combine multiple observables? (`combineLatest`)
// Answer:
// `combineLatest()` emits values whenever any input observable emits, using the latest value from each.
// Example:
// combineLatest([
//   this.currencyService.getRates(),
//   this.userService.getPreferences()
// ]).subscribe(([rates, prefs]) => {
//   console.log(rates, prefs);
// });

// Real-world:
// Update UI when either currency rates or user preferences change.

//  8. Explain basic error handling in RxJS (`catchError`, `retry`)

// Answer:

// * `catchError()`: Handle and recover from errors.
// * `retry(n)`: Retry the observable `n` times before failing.

// Example:


// this.http.get('api/data')
//   .pipe(
//     retry(2),
//     catchError(err => of([])) // fallback to empty array
//   )
//   .subscribe(console.log);




//  9. How do you manage complex Observable chains in large Angular apps?

// Answer:

// * Use RxJS operators for composition.
// * Move logic to services.
// * Use `async` pipe in templates.
// * Use custom operators for reuse.

// Real-world:
// Data fetching + transformation + loading state management using shared services.



//  10. Compare `mergeMap`, `concatMap`, and `switchMap` with real-world examples

// | Operator    | Use Case    | Behavior                               |
// | -- | -- | -- |
// | `mergeMap`  | Parallel    | All inner observables run concurrently |
// | `concatMap` | Sequence    | Waits for previous to complete         |
// | `switchMap` | Latest only | Cancels previous observable            |

// Examples:


// // mergeMap - run all API calls in parallel
// from(users).pipe(mergeMap(user => this.getOrders(user.id)))

// // concatMap - run in sequence
// from(users).pipe(concatMap(user => this.getOrders(user.id)))

// // switchMap - cancel previous
// <input type="text" [formControl]="searchControl" placeholder="search..." />
//  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
//   searchControl = new FormControl('');
//   private http = inject(HttpClient);
//   results$: Observable<string[]> = this.searchControl.valueChanges.pipe(
//     debounceTime(300),
//     distinctUntilChanged(),
//     switchMap((query) => this.searchApi(query ?? ''))
//   );

//   ngOnInit() {
//     this.results$.subscribe((data) => console.log(data));
//   }

//   searchApi(query: string): Observable<string[]> {
//     return this.http.get<string[]>(this.apiUrl + `?q=${query}`);
//   }




//  11. What are cold and hot Observables?

// Answer:

// * Cold: Starts fresh for each subscriber.
// * Hot: Shared between subscribers.

// Example:


// // Cold
// const obs$ = new Observable(observer => {
//   observer.next(Math.random());
// });

// // Hot
// const subject$ = new Subject();
// subject$.next(Math.random());


// Real-world:
// HTTP calls are cold, WebSocket streams are hot.



//  12. Difference between Subject, BehaviorSubject, ReplaySubject, and AsyncSubject

// | Type              | Description                           | Emits to new subscriber  |
// | -- | - |  |
// | `Subject`         | Only new emissions                    | No previous value        |
// | `BehaviorSubject` | Stores last emitted value             | Emits latest immediately |
// | `ReplaySubject`   | Stores N previous values              | Replays N values         |
// | `AsyncSubject`    | Emits only the last value on complete | One value on complete    |



//  13. How do you avoid memory leaks with Observables?

// Answer:

// * Use `takeUntil()` on component destroy.
// * Use `async` pipe in templates.
// * Manually `unsubscribe()` in `ngOnDestroy`.

// Example:


// ngOnDestroy() {
//   this.destroy$.next();
//   this.destroy$.complete();
// }




//  14. What is a higher-order Observable? Give an example

// Answer:
// An observable that emits other observables.

// Example:


// from([1,2,3]).pipe(
//   map(id => this.http.get(`api/data/${id}`))
// )


// Use `mergeMap`, `concatMap`, `switchMap` to flatten them.



//  15. Explain custom RxJS operator creation

// Answer:
// Custom operators are functions that return `MonoTypeOperatorFunction`.

// Example:


// function log<T>(msg: string): MonoTypeOperatorFunction<T> {
//   return tap(val => console.log(msg, val));
// }

// // Usage
// source$.pipe(log('Value:')).subscribe();




//  16. How does `distinctUntilChanged()` work and where would you use it?
// Answer:
// Prevents emitting value if the new value is same as the previous.

// Example:


// this.searchInput.valueChanges
//   .pipe(distinctUntilChanged())
//   .subscribe(console.log);
// Real-world:
// Avoid redundant API calls if user typed same value again.



//  17. How would you debounce or throttle user input in search?
// Answer:
// * `debounceTime()`: Waits until user stops typing.
// * `throttleTime()`: Emits only once in given interval.

// Example:


// this.searchInput.valueChanges
//   .pipe(
//     debounceTime(300),
//     distinctUntilChanged(),
//     switchMap(value => this.searchAPI(value))
//   )
//   .subscribe(console.log);

//  18. How do you delay retrying after a failed HTTP call using RxJS?
// Answer:
// Use `retryWhen()` with `delay`.
// Example:
// this.http.get('api/data')
//   .pipe(
//     retryWhen(errors => errors.pipe(
//       delay(2000), // wait 2 sec before retry
//       take(3) // try 3 times
//     ))
//   )
//   .subscribe(console.log);

// What is finalize() in RxJS and when should you use it?
// Answer:
// finalize() runs a callback when observable completes or errors. Great for loading indicators or cleanup.

// Example:

// ts
// Copy
// Edit
// this.http.get('api/data')
//   .pipe(finalize(() => this.loading = false))
//   .subscribe();

// How to handle multiple dependent HTTP calls?
// Answer:
// Use switchMap or concatMap to chain them.

// Real-time:
// Fetch user → then get orders for that user.

// Example:
// ts
// Copy
// Edit
// this.getUser().pipe(
//   switchMap(user => this.getOrders(user.id))
// ).subscribe();

// How to test observables in Angular?
// Answer:
// Use done() callback, fakeAsync + tick, or marble testing.

// Basic Jasmine Example:

// ts
// Copy
// Edit
// it('should emit value', (done) => {
//   of(1).subscribe(val => {
//     expect(val).toBe(1);
//     done();
//   });
// });

// How to use RxJS in Angular Reactive Forms?
// Answer:
// Use formControl.valueChanges with RxJS operators.

// Example:

// ts
// Copy
// Edit
// this.searchControl.valueChanges.pipe(
//   debounceTime(300),
//   distinctUntilChanged(),
//   switchMap(value => this.api.search(value))
// ).subscribe();


// RxJS 7 (7.8.1) — Changes, migration notes (6.x -> 7.8.1), examples, and interview Q&A
// NOTE: This section intentionally covers topics NOT already present earlier in this file.
// Focus: migration steps, new APIs, typing changes, pitfalls (shareReplay), examples, and interview questions/answers.

// ---- Quick highlights (what's new or changed moving from 6.x -> 7.8.1) ----
// - toPromise() removed/unsupported: replace with firstValueFrom() or lastValueFrom().
// - Improved and stricter TypeScript typings for operators and creation functions — custom operators often need explicit OperatorFunction types.
// - shareReplay pitfalls: prefer share({ connector: () => new ReplaySubject(1), resetOnRefCountZero: true }) or use shareReplay with explicit refCount patterns to avoid memory leaks.
// - Some deprecated internals were removed; library is stricter (may surface previously-silent typing issues).
// - Minor API additions/improvements and performance fixes; overall behavior is mostly compatible but typing and some edge semantics changed.
// - RxJS 7 requires newer TypeScript versions (check RxJS docs for exact minimum TS version; in many projects TS >= 4.x is required).

// ---- Migration Checklist (practical steps) ----
// 1) Upgrade the package
//    npm install rxjs@^7.8.1
//    or
//    yarn add rxjs@^7.8.1
//
// 2) Optionally install rxjs-compat temporarily if you can't update everything immediately:
//    npm install rxjs-compat
//    NOTE: rxjs-compat helps compatibility but is a temporary measure — remove once code is migrated.
//
// 3) Replace all toPromise usages
//    // OLD (deprecated/removed in v7)
//    const result = await obs$.toPromise();
//
//    // NEW
//    import { firstValueFrom, lastValueFrom } from 'rxjs';
//
//    // If you expect a single emission and want the first value:
//    const result = await firstValueFrom(obs$);
//
//    // If you want the final value after completion:
//    const final = await lastValueFrom(obs$);
//
//    // Provide timeout/fallback if necessary:
//    import { timeout } from 'rxjs/operators';
//    try {
//      const v = await firstValueFrom(obs$.pipe(timeout(5000)));
//    } catch (err) {
//      // handle timeout or other errors
//    }
//
// 4) Fix custom operators typing (RxJS 7 has stricter typings):
//    // OLD (looser, sometimes inferred incorrectly)
//    function log<T>(msg: string) {
//      return tap((v: T) => console.log(msg, v));
//    }
//
//    // NEW (explicit types; use OperatorFunction to preserve type inference)
///   import { OperatorFunction } from 'rxjs';
//
//    function log<T>(msg: string): OperatorFunction<T, T> {
//      return tap((v: T) => console.log(msg, v));
//    }
//
//    // If your operator transforms types, be explicit:
//    import { map, OperatorFunction } from 'rxjs';
//    function userToName(): OperatorFunction<User, string> {
//      return map(u => u.name);
//    }
//
// 5) Replace/adjust shareReplay usage to avoid memory leaks
//    // Problem: naive `shareReplay(1)` can keep the source subscription alive forever in some cases
//    // Recommended pattern (RxJS 7): use `share` with a ReplaySubject connector and reset behavior
//    import { share } from 'rxjs/operators';
//    import { ReplaySubject } from 'rxjs';
//
//    // safer replacement for shareReplay(1)
//    source$.pipe(
//      share({
//        connector: () => new ReplaySubject(1),
//        resetOnRefCountZero: true // ensures resources free when nobody is subscribed
//      })
//    )
//
//    // Alternatively, if you need the classic behavior and know the lifecycle, be explicit and document it.
//
// 6) Run TypeScript build and tests, fix type errors (often from stricter operator typings)
//
// 7) Remove `rxjs-compat` once migration is done and all imports/behaviors are updated.
//
// ---- Examples (RxJS 7 focused, not covered earlier) ----

// 1) Replacing toPromise with firstValueFrom / lastValueFrom
import { firstValueFrom, lastValueFrom, of, delay } from 'rxjs';

// Example: wait for the first emission and use async/await
async function fetchOnce() {
  const obs$ = of({ id: 1 }).pipe(delay(10));
  const value = await firstValueFrom(obs$); // resolves after first emission
  console.log('firstValueFrom ->', value);
}

// Example: wait for the last value after completion
async function waitForComplete() {
  const obs$ = of(1, 2, 3).pipe(delay(10));
  const last = await lastValueFrom(obs$); // resolves with 3 after completion
  console.log('lastValueFrom ->', last);
}

// 2) Safer shareReplay replacement using share with connector (recommended in v7)
import { Observable, ReplaySubject } from 'rxjs';
import { share } from 'rxjs/operators';

function createSharedSource(source$: Observable<number>) {
  return source$.pipe(
    share({
      connector: () => new ReplaySubject<number>(1),
      resetOnComplete: true,
      resetOnError: true,
      resetOnRefCountZero: true
    })
  );
}

// 3) Example of a typed custom operator (preserves Typescript inference)
import { OperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

interface User { id: number; name: string; }

function pluckName(): OperatorFunction<User, string> {
  return map(user => user.name);
}

// Usage:
// of({ id: 1, name: 'Alice' }).pipe(pluckName()).subscribe(console.log);

// ---- Differences (concise list, 6.x -> 7.8.1) ----
// - toPromise: removed. Use firstValueFrom / lastValueFrom.
// - Typings: much stricter; OperatorFunction/MonoTypeOperatorFunction distinctions matter more — be explicit in custom operators.
// - shareReplay: previous default usage could cause retained subscriptions; RxJS 7 encourages share({...}) with a ReplaySubject connector and explicit reset logic.
// - Some deprecated internals removed — code relying on deprecated private APIs may break.
// - Runtime behavior: largely same, but some corner cases (resource resets, refCount semantics) changed for correctness.
// - Tooling: migration lint rules are available historically (rxjs-tslint rules) — use them to find patterns to update.
//
// ---- Interview Questions (RxJS 7 focused) ----
// Q1: Why was toPromise removed and what should you use instead?
// A1: toPromise was deprecated because it conflated Observable semantics with Promises (single resolution). RxJS 7 removes it in favor of firstValueFrom (resolves with first emission) and lastValueFrom (waits until completion and resolves with last value). These are explicit about intent and easier to reason about with async/await.
//
// Q2: How do you convert an Observable to a Promise that resolves on the first emission?
// A2: Use firstValueFrom(obs$). Example: const val = await firstValueFrom(obs$);
//
// Q3: What typing changes should you expect when migrating custom operators to RxJS 7?
// A3: Typings are stricter. You should annotate custom operator functions with OperatorFunction<Input, Output> or MonoTypeOperatorFunction<T> when input and output types match. This preserves inference in pipe chains and avoids overload errors.
//
// Q4: What's the `shareReplay` pitfall and how do you avoid it in RxJS 7?
// A4: shareReplay(1) can keep the source observable subscribed even when there are no downstream subscribers (memory leak) depending on the refCount semantics. Instead, use share with a ReplaySubject connector and configure resetOnRefCountZero/resetOnComplete/resetOnError to free resources when appropriate. Example:
//    source$.pipe(share({ connector: () => new ReplaySubject(1), resetOnRefCountZero: true }))
//
// Q5: What TypeScript version considerations are there when upgrading to RxJS 7?
// A5: RxJS 7 leverages newer TS features; check RxJS release notes for exact minimum TypeScript version required. Many projects should be on TS >= 4.x. If your TS is too old, upgrade TypeScript first to avoid build/type errors.
//
// Q6: How do firstValueFrom and lastValueFrom behave when the Observable errors or completes without emission?
// A6: If the Observable errors before emitting, both functions will reject with that error. If you call lastValueFrom on an Observable that completes without emitting any value, it will reject (since there's no last value). Use firstValueFrom with a fallback (race with a timeout or default value) when necessary.
//
// Q7: Do you need rxjs-compat to migrate to 7.x?
// A7: rxjs-compat is a compatibility layer helpful for big codebases that can't migrate all at once. It's a temporary convenience — the long-term goal is to update imports/usages and remove rxjs-compat.
//
// Q8: What are common runtime regressions when moving to RxJS 7 and how to catch them?
// A8: Typical issues are memory leaks from naive shareReplay, type errors surfacing previously-ignored mismatches, and subtle change in refCount/reset behavior. Catch them with thorough unit tests, run lint/typechecks, check long-running integration flows, and monitor memory usage in staging.
//
// Q9: What should you check in a codebase that heavily uses custom RxJS operators before upgrading?
// A9: Ensure custom operators are correctly typed (OperatorFunction), examine any use of internal RxJS APIs (avoid private APIs), and verify code that relied on implicit any-type behavior still compiles under stricter typings.
//
// Q10: How to safely replace toPromise usage in async functions that awaited Observables?
// A10: Replace await obs$.toPromise() with await firstValueFrom(obs$) if you want the first emission. If previous code relied on last emission, use lastValueFrom. Also handle timeout/error cases explicitly to avoid hung awaits.
//
// ---- Practical migration example (before & after) ----
// Before (RxJS 6, toPromise & shareReplay naive):
// async load() {
//   const value = await this.http.get('/api/data').toPromise();
//   this.shared$ = this.http.get('/api/stream').pipe(shareReplay(1));
// }
//
// After (RxJS 7):
// import { firstValueFrom, ReplaySubject } from 'rxjs';
// import { share } from 'rxjs/operators';
//
// async load() {
//   const value = await firstValueFrom(this.http.get('/api/data'));
//   this.shared$ = this.http.get('/api/stream').pipe(
//     share({
//       connector: () => new ReplaySubject(1),
//       resetOnRefCountZero: true
//     })
//   );
// }
//
// ---- Final notes & tips ----
// - Start by upgrading dev environment (TypeScript) to the supported version for RxJS 7.
// - Run the type checker early — many issues are typing-related and fixable by adding OperatorFunction signatures or small API replacements.
// - Replace toPromise usages first (they are simple to find and change), then address shareReplay patterns.
// - Keep rxjs-compat only as a short-term bridge; remove it promptly once migration is completed.
// - Add unit/integration tests focused on long-running flows to catch refCount/resource issues.
