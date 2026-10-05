
# RxJS (Reactive Extensions for JavaScript):
### What is RxJS?
RxJS is a library for reactive programming using Observables, which allows asynchronous and event-based programs to be written in JavaScript. simple way
- It provides a powerful set of operators for handling asynchronous events, making it easier to manage complex data streams like HTTP requests, user input events, and real-time updates.

### Why RxJS?
- RxJS simplifies handling asynchronous data streams and enables developers to easily manage tasks like event handling, HTTP requests, and WebSocket connections.
- It provides comparability, allowing you to build data flows that are easy to understand and maintain.
- Ideal for complex Angular applications where components need to share state or respond to changes in a predictable way.

### Key Concepts:
Observable: represents the idea of an invokable collection of future values or events.
Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
Subject: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

1. Observable: Represents a stream of data/events that can be subscribed to. It's like a promise but can handle multiple values over time.
2. Observer: An object that subscribes to an observable to listen to the data it emits.
3. Operators: Functions that allow transforming, filtering, and combining observables (e.g., `map`, `filter`, `merge`, `switchMap`).
4. Subscription: This is what you get when you subscribe to an observable. You can use it to unsubscribe later to stop listening to the observable.
5. Subjects: A special type of observable that acts as both an observable and observer. It can multicast to multiple subscribers.

### How is RxJS used in Real-Time?
1. HTTP requests: Manage API calls in Angular applications, handling responses and error handling asynchronously.
2. Event streams: Handle UI events like clicks, scrolls, and typing with reactive operators like `debounceTime`, `throttleTime`.
3. WebSocket connections: Continuously listen to server updates or push notifications.
4. Form data: Manage changes in form inputs with real-time validation or suggestions.
5. State management: Used in combination with libraries like NgRx for handling state across complex Angular apps.

### Common Use Cases:
1. Real-time data: Stream live data (e.g., chat messages, notifications).
2. Auto-complete: Use operators like `debounceTime()` and `switchMap()` to fetch suggestions while a user types.
3. Polling APIs: Set intervals to fetch data periodically using `interval()` or `timer()` operators.
  
### Example:
import { of, fromEvent } from 'rxjs';
import { map, debounceTime, switchMap } from 'rxjs/operators';

Example: Handling user input with debounce (auto-suggestions)
const searchBox = document.getElementById('search-box');

fromEvent(searchBox, 'input').pipe(
  debounceTime(300),  // Wait 300ms pause in events
  map(event => event.target.value),
  switchMap(searchTerm => fetchResults(searchTerm))  // Switch to new observable (API call)
).subscribe(result => displayResults(result));

### Advantages:
- Helps write cleaner code for asynchronous tasks.
Declarative approach to handling streams of data/events.
- Simplifies error handling, retrying failed requests, and combining multiple streams.

RxJS is integral to Angular's ecosystem, but it can also be used in other JavaScript frameworks. By mastering RxJS, you can manage data flow and async operations more effectively. 

# RxJS Interview Notes (Angular Developers)
## 1. What is RxJS and why do we use it in Angular?
### Answer
**RxJS (Reactive Extensions for JavaScript)** is a library for **reactive programming using Observables** to handle asynchronous events.

### Why Angular uses RxJS

Angular uses RxJS for:
* HTTP calls (`HttpClient` returns Observables)
* Form control value changes
* Event handling
* Reactive programming patterns
* State streams

### Example

```ts
this.http.get('api/users').subscribe(data => console.log(data));
```

### Real-world Example

* Fetching user data from an API
* Listening to search input changes
* Managing WebSocket connections



# 2. What is an Observable? How is it different from a Promise?

### Observable
A **stream of data** that can emit **multiple values over time**.

### Difference Table

| Feature        | Observable        | Promise   |
| -- | -- |  |
| Emission       | Multiple values   | One value |
| Lazy Execution | Yes               | Yes       |
| Cancelable     | Yes (unsubscribe) | No        |
| Operators      | Rich operators    | No        |

### Example

```ts
of(1,2,3).subscribe(console.log);
```

Output

```
1
2
3
```

### Real-world Example

Live search input emits **multiple values**, so Observable is better than Promise.



# 3. What is the use of `takeUntil()` operator?

### Purpose

`takeUntil()` unsubscribes when another observable emits.

### Example

```ts
ngOnInit() {
  interval(1000)
    .pipe(takeUntil(this.destroy$))
    .subscribe(console.log);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### Real-world Use

Automatically unsubscribe when component is destroyed to prevent **memory leaks**.



# 4. What is `forkJoin()` in RxJS?

### Purpose
`forkJoin()` is used to execute multiple observables in parallel and get the final values after all complete.
Runs **multiple observables in parallel** and emits result when **all complete**.

### Example

```ts
forkJoin([
  this.userService.getUser(),
  this.orderService.getOrders()
]).subscribe(([user, orders]) => {
  console.log(user, orders);
});
```

### Real-world Example

Fetch:

* User profile
* User orders

and show UI after both APIs finish.



# 5. What is the difference between `tap()` and `map()`?

Topic: tap vs map
```
This structure ensures you always get:
* Concept
* Difference
* Example
* Interview explanation

# 📘 Now the Answer (tap vs map)

# 1️⃣ map() – Used to Transform Data
### Simple Meaning
`map()` is used when you want to **change the value emitted by an observable**.

It **transforms the data**.
👉 Input → Modify → Output

### Example

```ts
import { of, map } from 'rxjs';

of(1,2,3)
.pipe(
  map(x => x * 2)
)
.subscribe(console.log);
```
Output:
```
2
4
6
```

Here `map()` **changes the emitted value**.

### Real-Time Angular Example
API returns user data:
```
{
 id: 1,
 firstName: "Ganesh",
 lastName: "Chukka"
}
```

You want **full name**.
```ts
this.http.get('/api/user')
.pipe(
  map(user => `${user.firstName} ${user.lastName}`)
)
.subscribe(name => console.log(name));
```

Now UI receives:
```
Ganesh Chukka
```
### Interview Explanation
You can say:
> `map()` is used to transform the data emitted by an observable. For example, when an API returns user details, I can use map to transform the response into the required format for the UI.



### Angular Real Example

```ts
this.http.get('/api/user')
.pipe(
  map(user => `${user.firstName} ${user.lastName}`)
)
.subscribe(console.log);
```



## tap() – Side Effects

### Meaning

Used for:

* Logging
* Debugging
* Analytics
* Loading indicators

### Example

```ts
of(1,2,3)
.pipe(
  tap(x => console.log("Value:", x))
)
.subscribe(console.log);
```

Output

```
Value:1
1
Value:2
2
Value:3
3
```

### Angular Real Example

```ts
this.http.get('/api/products')
.pipe(
  tap(res => console.log(res))
)
.subscribe();
```



### Key Difference

| Feature       | map()          | tap()        |
| - | -- |  |
| Purpose       | Transform data | Side effects |
| Changes value | Yes            | No           |
| Return value  | Modified       | Same         |



### Perfect Interview Answer

> map() transforms the data emitted by an observable, while tap() is used for side effects like logging or debugging without modifying the data stream.



# 6. Cancel HTTP Requests using RxJS

Use **switchMap**.

### Example

```ts
this.searchInput.valueChanges.pipe(
  debounceTime(300),
  switchMap(value =>
    this.http.get(`api/search?q=${value}`)
  )
).subscribe(console.log);
```

### Real-world Example

User typing in search bar cancels previous API call.

# 7. combineLatest()

### Purpose

Emits whenever **any observable emits**, using latest values.

### Example

```ts
combineLatest([
  this.currencyService.getRates(),
  this.userService.getPreferences()
]).subscribe(([rates, prefs]) => {
  console.log(rates, prefs);
});
```

### Real-world

Update UI when:

* currency changes
* user preferences change

# 8. Error Handling in RxJS

### Operators
* `catchError`
* `retry`

### Example

```ts
this.http.get('api/data')
.pipe(
  retry(2),
  catchError(err => of([]))
)
.subscribe(console.log);
```

# 9. Managing Complex Observable Chains

Best Practices:

* Move logic into services
* Use `async` pipe
* Create custom operators
* Use state streams

# 10. mergeMap vs concatMap vs switchMap

| Operator  | Behavior             | Use Case      |
|  | -- | - |
| mergeMap  | Parallel execution   | Multiple APIs |
| concatMap | Sequential execution | Order matters |
| switchMap | Cancel previous      | Search        |

### Example

```ts
from(users)
.pipe(
  mergeMap(user => this.getOrders(user.id))
)
```

# 11. Cold vs Hot Observables
## 1️⃣ Cold Observable
### Definition
A **Cold Observable creates a new execution for each subscriber**.

👉 Every subscriber gets **its own independent data stream**.

### Simple Example

```ts
const observable = new Observable(observer => {
  console.log('API called');
  observer.next(Math.random());
});

observable.subscribe(val => console.log('User 1:', val));
observable.subscribe(val => console.log('User 2:', val));
```

### Output

```
API called
User 1: 0.52

API called
User 2: 0.91
```

✔ API executed **twice**
✔ Each subscriber gets **separate data**

### Real Angular Example

```ts
this.http.get('/api/users')
```

Every subscription triggers **a new HTTP request**.
Example:
```ts
this.service.getUsers().subscribe();
this.service.getUsers().subscribe();
```

➡ API called **2 times**


## 2️⃣ Hot Observable

### Definition
A **Hot Observable shares the same execution among multiple subscribers**.

👉 Data is produced **once and shared**.

### Simple Example

```ts
const subject = new Subject<number>();

subject.subscribe(val => console.log('User 1:', val));
subject.subscribe(val => console.log('User 2:', val));

subject.next(Math.random());
```

### Output

```
User 1: 0.74
User 2: 0.74
```

✔ One execution
✔ Both subscribers receive same value

### Real Angular Example
Using `shareReplay`

```ts
users$ = this.http.get('/api/users').pipe(
  shareReplay(1)
);
```

Now:

```ts
this.users$.subscribe();
this.users$.subscribe();
```

➡ API called **only once**

# Easy Way to Remember (Interview Tip)

| Cold Observable              | Hot Observable              |
| - |  |
| New execution per subscriber | Shared execution            |
| Independent streams          | Shared stream               |
| Example: HTTP request        | Example: Subject, WebSocket |
| API called multiple times    | API called once             |

# Real-Time Example (Best for Interview)

### Cold Example
```
YouTube video recording
```

Every viewer starts video **from beginning**.
### Hot Example

Live cricket match

Everyone watches **same live stream**.

# One-Line Interview Answer
> Cold Observables create a new execution for each subscriber, like HTTP calls. Hot Observables share the same execution among subscribers, like Subjects or live streams.

# 12. Subject Types

| Type              | Description                           | Emits to new subscriber  |
| `Subject`         | Only new emissions                    | No previous value        |
| `BehaviorSubject` | Stores last emitted value             | Emits latest immediately |
| `ReplaySubject`   | Stores N previous values              | Replays N values         |
| `AsyncSubject`    | Emits only the last value on complete | One value on complete    |


# 13. Avoid Memory Leaks
Methods
* Use `takeUntil()` on component destroy.
* Use `async` pipe in templates.
* Manually `unsubscribe()` in `ngOnDestroy`.

Example

```ts
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

# 14. Higher Order Observable

Observable that emits **other Observables**.

Example

```ts
from([1,2,3]).pipe(
  map(id => this.http.get(`/api/data/${id}`))
)
```

Flatten using
* switchMap
* mergeMap
* concatMap


# 15. Explain custom RxJS operator creation
Answer:
Custom operators are functions that return `MonoTypeOperatorFunction`.

Example

```ts
function log<T>(msg:string):MonoTypeOperatorFunction<T>{
 return tap(val => console.log(msg,val));
}

source$.pipe(log("Value")).subscribe();
```


# 16. How does `distinctUntilChanged()` work and where would you use it?
Answer:
Prevents emitting value if the new value is same as the previous.

Example

```ts
this.searchInput.valueChanges
.pipe(
  distinctUntilChanged()
)
.subscribe(console.log);
```
Real-world:
Avoid redundant API calls if user typed same value again.

# 17. debounce vs throttle

| Operator     | Behavior                      |
|  | -- |
| debounceTime | Waits until user stops typing |
| throttleTime | Emits once per interval       |

Example

```ts
this.searchInput.valueChanges.pipe(
 debounceTime(300),
 distinctUntilChanged(),
 switchMap(v => this.searchAPI(v))
)
```

# 18. How do you delay retrying after a failed HTTP call using RxJS?
Answer:
Use `retryWhen()` with `delay`.

```ts
this.http.get('api/data')
.pipe(
 retryWhen(errors =>
   errors.pipe(
     delay(2000),
     take(3)
   )
 )
)
```
# 19. What is finalize() in RxJS and when should you use it?
finalize() runs a callback when observable completes or errors. Great for loading indicators or cleanup.

Example

```ts
this.http.get('api/data')
.pipe(
 finalize(() => this.loading = false)
)
.subscribe();
```

Used for **loading indicators cleanup**.

# 20. How to handle multiple dependent HTTP calls?
Answer:
Use switchMap or concatMap to chain them.
Real-time:
Fetch user → then get orders for that user.

Example

```ts
this.getUser()
.pipe(
 switchMap(user =>
   this.getOrders(user.id)
 )
)
.subscribe();
```

# 21. Testing Observables
Use done() callback, fakeAsync + tick, or marble testing.

Example

```ts
it('should emit value',(done)=>{
 of(1).subscribe(val=>{
   expect(val).toBe(1);
   done();
 })
});
```

# 22. How to use RxJS in Angular Reactive Forms?
Answer:
Use formControl.valueChanges with RxJS operators.

Example

```ts
this.searchControl.valueChanges.pipe(
 debounceTime(300),
 distinctUntilChanged(),
 switchMap(value =>
   this.api.search(value)
 )
).subscribe();
```


# RxJS 7 Migration Notes

## Major Changes

- `toPromise()` is removed/unsupported.
  - Replace it with `firstValueFrom()` or `lastValueFrom()`.

- Improved and stricter TypeScript typings for operators and creation functions.
  - Custom operators often need explicit `OperatorFunction` types.

- `shareReplay` pitfalls:
  - Prefer `share()` with a `ReplaySubject(1)` connector and explicit reset behavior.
  - Or use `shareReplay` with explicit `refCount` patterns to avoid memory leaks.

- Some deprecated internals were removed.
  - RxJS is stricter and may expose previously silent typing issues.

- Minor API additions, improvements, and performance fixes.
  - Overall behavior is mostly compatible, but typing and some edge cases changed.

- RxJS 7 requires newer TypeScript versions.
  - Check the RxJS documentation for the exact supported TypeScript version for your RxJS release.



# Migration Checklist

## 1. Upgrade RxJS

Using npm:

```bash
npm install rxjs@^7.8.1
```

Using Yarn:

```bash
yarn add rxjs@^7.8.1
```



## 2. Replace `toPromise()`

### Old

```ts
const result = await obs$.toPromise();
```

### New

Import:

```ts
import {
  firstValueFrom,
  lastValueFrom
} from 'rxjs';
```

### Get the First Value

Use `firstValueFrom()` when you want the first emission.

```ts
const result = await firstValueFrom(obs$);
```

### Get the Last Value

Use `lastValueFrom()` when you want the final value after the Observable completes.

```ts
const final = await lastValueFrom(obs$);
```

### With Timeout

```ts
import { firstValueFrom, timeout } from 'rxjs';

try {
  const value = await firstValueFrom(
    obs$.pipe(
      timeout(5000)
    )
  );
} catch (error) {
  // Handle timeout or another error
}
```

### Simple Memory

```text
firstValueFrom()
      ↓
First value
      ↓
Promise resolves


lastValueFrom()
      ↓
Wait for completion
      ↓
Last value
      ↓
Promise resolves
```



# 3. Fix Custom Operator Typing

RxJS 7 has stricter TypeScript typings.

## Old

```ts
function log<T>(msg: string) {
  return tap((value: T) => {
    console.log(msg, value);
  });
}
```

## New

Use `OperatorFunction` explicitly.

```ts
import {
  OperatorFunction,
  tap
} from 'rxjs';

function log<T>(
  msg: string
): OperatorFunction<T, T> {

  return tap((value: T) => {
    console.log(msg, value);
  });
}
```

### Simple Meaning

```text
Input T
  ↓
Operator
  ↓
Output T
```

The type doesn't change.



## Operator That Changes the Type

Suppose:

```text
User
 ↓
Operator
 ↓
string
```

Example:

```ts
import {
  map,
  OperatorFunction
} from 'rxjs';

interface User {
  id: number;
  name: string;
}

function userToName(): OperatorFunction<User, string> {
  return map(user => user.name);
}
```

### Easy Memory

```text
OperatorFunction<Input, Output>
```

Example:

```text
OperatorFunction<User, string>
```

means:

```text
User → Operator → string
```



# 4. `shareReplay()` and Memory Leaks

## Problem

Naive usage such as:

```ts
shareReplay(1)
```

can keep a source subscription alive depending on its lifecycle/ref-count behavior.

This can cause unnecessary retained resources for long-running sources.



## Safer Explicit Pattern

Use `share()` with a `ReplaySubject`.

```ts
import {
  ReplaySubject,
  share
} from 'rxjs';

source$.pipe(
  share({
    connector: () => new ReplaySubject(1),
    resetOnRefCountZero: true
  })
);
```

### Simple Flow

```text
Source
  ↓
share()
  ↓
ReplaySubject(1)
  ↓
 ┌─────────────┐
 ↓             ↓
Subscriber A   Subscriber B
```

When nobody is subscribed:

```text
Subscribers = 0
      ↓
resetOnRefCountZero
      ↓
Release/reset source resources
```



## More Explicit Example

```ts
import {
  Observable,
  ReplaySubject,
  share
} from 'rxjs';

function createSharedSource(
  source$: Observable<number>
) {

  return source$.pipe(
    share({
      connector: () =>
        new ReplaySubject<number>(1),

      resetOnComplete: true,
      resetOnError: true,
      resetOnRefCountZero: true
    })
  );
}
```

### Meaning

```text
resetOnComplete
→ reset after completion

resetOnError
→ reset after error

resetOnRefCountZero
→ reset when nobody is listening
```



# 5. Run TypeScript Build and Tests

After upgrading:

```text
Upgrade RxJS
    ↓
Run TypeScript build
    ↓
Find type errors
    ↓
Fix operator typings
    ↓
Run unit tests
    ↓
Run integration tests
```

Common problems may come from:

- Custom operators
- Old APIs
- Deprecated APIs
- Incorrect type assumptions
- Sharing/refCount behavior



# 6. Remove `rxjs-compat`

Once migration is complete:

```text
Old compatibility code
        ↓
Update imports/usages
        ↓
Verify application
        ↓
Remove rxjs-compat
```

`rxjs-compat` should only be a temporary migration bridge.



# Examples

## Example 1: `firstValueFrom()`

```ts
import {
  firstValueFrom,
  of,
  delay
} from 'rxjs';

async function fetchOnce() {

  const obs$ = of({
    id: 1
  }).pipe(
    delay(10)
  );

  const value =
    await firstValueFrom(obs$);

  console.log(
    'firstValueFrom ->',
    value
  );
}
```

### Flow

```text
Observable
   ↓
First value arrives
   ↓
firstValueFrom()
   ↓
Promise resolves
```



# Example 2: `lastValueFrom()`

```ts
import {
  lastValueFrom,
  of,
  delay
} from 'rxjs';

async function waitForComplete() {

  const obs$ = of(
    1,
    2,
    3
  ).pipe(
    delay(10)
  );

  const last =
    await lastValueFrom(obs$);

  console.log(
    'lastValueFrom ->',
    last
  );
}
```

Output:

```text
3
```

### Why?

```text
1
↓
2
↓
3
↓
Complete
↓
Return 3
```



# Example 3: Shared Source

```ts
import {
  Observable,
  ReplaySubject,
  share
} from 'rxjs';

function createSharedSource(
  source$: Observable<number>
) {

  return source$.pipe(
    share({
      connector: () =>
        new ReplaySubject<number>(1),

      resetOnComplete: true,
      resetOnError: true,
      resetOnRefCountZero: true
    })
  );
}
```



# Example 4: Typed Custom Operator

```ts
import {
  OperatorFunction,
  map,
  of
} from 'rxjs';

interface User {
  id: number;
  name: string;
}

function pluckName():
  OperatorFunction<User, string> {

  return map(user => user.name);
}
```

Usage:

```ts
of({
  id: 1,
  name: 'Alice'
})
.pipe(
  pluckName()
)
.subscribe(console.log);
```

Output:

```text
Alice
```



# RxJS 6 vs RxJS 7

| Topic | RxJS 6 | RxJS 7 |
||||
| Promise conversion | `toPromise()` | `firstValueFrom()` / `lastValueFrom()` |
| Typings | Looser | Stricter |
| Custom operators | Often inferred | Explicit typing may be needed |
| Sharing | `shareReplay()` commonly used | More explicit sharing/reset patterns available |
| Deprecated internals | Some remained | More removed |
| TypeScript | Older versions possible | Newer TypeScript required |
| Runtime | Existing behavior | Mostly compatible with some edge-case changes |



# Interview Questions

## Q1. Why was `toPromise()` removed, and what should we use?

### Answer

`toPromise()` was deprecated because converting an Observable to a Promise could be ambiguous about which Observable value should be used.

RxJS provides explicit alternatives:

```text
firstValueFrom()
→ First emission

lastValueFrom()
→ Last emission after completion
```

Example:

```ts
const first =
  await firstValueFrom(obs$);

const last =
  await lastValueFrom(obs$);
```



# Q2. How do you convert an Observable to a Promise using the first emission?

### Answer

Use:

```ts
const value =
  await firstValueFrom(obs$);
```

### Easy Memory

```text
Observable
↓
First value
↓
Promise
```



# Q3. What typing changes should we expect when migrating custom operators?

### Answer

RxJS 7 has stricter TypeScript typings.

For custom operators, explicitly defining the operator type can help preserve correct type inference.

Example:

```ts
OperatorFunction<Input, Output>
```

If input and output are the same type, `MonoTypeOperatorFunction<T>` can also be appropriate.



# Q4. What is the `shareReplay()` pitfall?

### Answer

Depending on how it is configured and the source lifecycle, a shared/replayed source may remain subscribed longer than intended.

For long-running sources, this can retain resources.

An explicit sharing pattern is:

```ts
source$.pipe(
  share({
    connector: () =>
      new ReplaySubject(1),

    resetOnRefCountZero: true
  })
)
```

### Easy Memory

```text
Nobody listening
      ↓
Reset source
      ↓
Release resources
```



# Q5. What TypeScript considerations exist when upgrading RxJS?

### Answer

RxJS 7 uses newer TypeScript features and stricter typings.

Before migration:

```text
Check RxJS version
      ↓
Check supported TypeScript version
      ↓
Upgrade TypeScript if required
      ↓
Upgrade RxJS
```

Then run the TypeScript build and fix errors.



# Q6. What happens if `firstValueFrom()` or `lastValueFrom()` receives an error?

### Answer

If the Observable errors:

```text
Observable
↓
Error ❌
↓
Promise rejects
```

Both can reject with the Observable error.



## What if the Observable completes without emitting?

There is no value available.

The Promise can reject because no value was emitted.

If needed, design an appropriate:

```text
Default value
Timeout
Error handling
```

strategy.



# Q7. Do we need `rxjs-compat`?

### Answer

It may be useful temporarily during migration of a large legacy application.

But:

```text
rxjs-compat
     ↓
Temporary bridge
     ↓
Migrate old code
     ↓
Remove rxjs-compat
```

It should not normally be the final solution.



# Q8. What problems should we watch for after upgrading?

### Answer

Check for:

```text
TypeScript errors
Custom operator errors
Deprecated API usage
Sharing/refCount behavior
Long-running subscriptions
Memory/resource issues
```

Use:

```text
Type checking
Unit tests
Integration tests
Application testing
Memory monitoring
```



# Q9. What should we check if the project has many custom RxJS operators?

### Answer

Check:

1. Operator typings
2. `OperatorFunction`
3. `MonoTypeOperatorFunction`
4. Deprecated APIs
5. Internal/private RxJS APIs
6. Type inference
7. Unit tests



# Q10. How do you safely replace `toPromise()`?

First understand what the old code expects.

### Need first emission?

```ts
await firstValueFrom(obs$);
```

### Need final emission?

```ts
await lastValueFrom(obs$);
```

Don't blindly replace everything with the same function.

Ask:

```text
Do I need FIRST?
       ↓
firstValueFrom()


Do I need LAST after completion?
       ↓
lastValueFrom()
```



# Scenario-Based Questions

## Scenario 1

You have:

```ts
const user =
  await user$.toPromise();
```

You only need the first user emitted.

### Solution

```ts
const user =
  await firstValueFrom(user$);
```



# Scenario 2

Observable emits:

```text
10
20
30
40
Complete
```

You need:

```text
40
```

### Solution

```ts
const value =
  await lastValueFrom(obs$);
```



# Scenario 3

You have a long-running shared Observable.

When all components are destroyed, you don't want the source to remain unnecessarily active.

### Possible Solution

Use explicit sharing/reset behavior:

```ts
source$.pipe(
  share({
    connector: () =>
      new ReplaySubject(1),

    resetOnRefCountZero: true
  })
)
```



# Scenario 4

Custom operator accepts:

```text
User
```

and returns:

```text
string
```

### Type

```ts
OperatorFunction<User, string>
```



# Cross Questions

## `firstValueFrom()` vs `lastValueFrom()`?

```text
firstValueFrom
→ resolves on first emission

lastValueFrom
→ waits for completion
→ resolves with last emission
```



## What happens if `lastValueFrom()` is used with an Observable that never completes?

It keeps waiting.

Example:

```text
WebSocket
↓
Never completes
↓
lastValueFrom()
↓
Keeps waiting
```

This is why you should understand the source before using `lastValueFrom()`.



## Can `firstValueFrom()` also wait forever?

Yes.

If the Observable:

```text
Doesn't emit
AND
doesn't complete
```

then it can keep waiting.

A timeout may be appropriate:

```ts
await firstValueFrom(
  obs$.pipe(
    timeout(5000)
  )
);
```



## Is `shareReplay(1)` always a memory leak?

No.

The problem depends on:

```text
Source type
Source lifetime
Subscriber lifetime
Configuration
```

Don't say in an interview:

> `shareReplay(1)` always causes memory leaks.

Better:

> For long-lived sources, I pay attention to subscription lifetime and refCount/reset behavior when sharing and replaying values.



# Migration Flow

```text
Check Angular / TypeScript compatibility
              ↓
          Upgrade RxJS
              ↓
        Find toPromise()
              ↓
 firstValueFrom / lastValueFrom
              ↓
      Run TypeScript build
              ↓
       Fix typing errors
              ↓
   Review custom operators
              ↓
 Review share/shareReplay usage
              ↓
          Run tests
              ↓
Check long-running subscriptions
              ↓
      Remove rxjs-compat
```



# Quick Interview Cheat Sheet

```text
toPromise()
    ↓
Removed / migrate away

Need first value?
    ↓
firstValueFrom()

Need final value?
    ↓
lastValueFrom()


Custom operator?
    ↓
OperatorFunction<Input, Output>


Input = Output?
    ↓
MonoTypeOperatorFunction<T>


Need shared latest value?
    ↓
shareReplay / share + ReplaySubject


Long-running shared source?
    ↓
Think about refCount/reset/lifecycle


Nobody subscribed?
    ↓
Consider whether source should disconnect/reset


Migration?
    ↓
Upgrade
→ Compile
→ Fix types
→ Test
→ Check subscriptions
→ Remove compatibility code
```



# Final Notes

- Replace `toPromise()` with `firstValueFrom()` or `lastValueFrom()` based on the required behavior.
- Don't blindly replace all `toPromise()` usages with one function.
- Run the TypeScript compiler early during migration.
- Explicitly type custom operators when necessary.
- Review `shareReplay` and long-running shared Observables carefully.
- Check subscription/resource lifecycle.
- Use `rxjs-compat` only as a temporary migration bridge.
- Run unit and integration tests after migration.

## Most Important Interview Topics

Focus especially on:

```text
toPromise
      ↓
firstValueFrom / lastValueFrom

Custom operator typing
      ↓
OperatorFunction

shareReplay
      ↓
refCount / lifecycle / memory

Migration
      ↓
Type checking + testing
```
