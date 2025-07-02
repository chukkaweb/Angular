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
// Answer:
// * `tap()`: Used for side-effects, does not modify data.
// * `map()`: Transforms the emitted data.
// Example:
// this.http.get('api/data')
//   .pipe(
//     tap(() => console.log('Request made')),
//     map(data => data['items']) // transform data
//   )
//   .subscribe(console.log);

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
// this.search.valueChanges.pipe(
//   debounceTime(300),
//   switchMap(query => this.searchAPI(query))
// )




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