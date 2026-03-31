# 🧠 1️⃣ filter()

### 👉 Simple Meaning

Pass only values that match a condition
### ✅ Real-time Example
👉 Show only active users in UI

```ts
users$.pipe(
  filter(user => user.isActive)
)
```
### ⚠️ Edge Cases

1. ❌ No values pass → UI empty
   👉 Always handle empty state

2. ❌ Filtering too early
   👉 You may lose required data

### 🚫 When NOT to use

* When you need all data later (don’t filter too early)

### 🎯 Interview Answer

> I use filter to show only required data like active users or valid records before rendering UI.


# 🧠 2️⃣ take(n)

### 👉 Simple Meaning

Take only first `n` values and stop

### ✅ Real-time Example

👉 One-time API call

```ts
this.http.get('/api').pipe(take(1))
```

### ⚠️ Edge Cases

1. 🔴 Stream completes early
   👉 Future updates ignored

2. 🔴 WebSocket / live data
   👉 You will miss updates

### 🚫 When NOT to use

* Real-time apps (chat, stock updates)

### 🎯 Interview Answer

> I use take(1) for one-time API calls to auto unsubscribe and avoid memory leaks.


# 🧠 3️⃣ distinct()

### 👉 Simple Meaning

Remove all duplicate values (full history)

### ✅ Real-time Example

👉 Unique categories list

```ts
from(['A', 'B', 'A', 'C']).pipe(distinct())
```

### ⚠️ Edge Cases

1. 🔴 Memory issue
   👉 Tracks all past values

2. 🔴 Large streams
   👉 Can slow down app

### 🚫 When NOT to use

* Large or infinite streams

### 🎯 Interview Answer

> distinct ensures uniqueness across the entire stream but may increase memory usage.

# 🧠 4️⃣ distinctUntilChanged()

### 👉 Simple Meaning

Emit only if value changed from previous


### ✅ Real-time Example

👉 Search input optimization

```ts
valueChanges.pipe(distinctUntilChanged())
```

### ⚠️ Edge Cases

1. ❗ Not full duplicate check

```
apple → appl → apple
```

👉 API called again

2. ❗ Object comparison issue

```ts
{ id: 1 } !== { id: 1 }
```

👉 Emits again

✔ Fix:

```ts
distinctUntilChanged((a, b) => a.id === b.id)
```

### 🚫 When NOT to use

* When you need global uniqueness
### 🎯 Interview Answer

> It prevents consecutive duplicates but does not track full history.


# 🧠 5️⃣ debounceTime()

### 👉 Simple Meaning

Wait before emitting value

### ✅ Real-time Example

👉 Search input

```ts
debounceTime(300)
```

### ⚠️ Edge Cases

1. 🔴 Delay too high → slow UI
2. 🔴 Delay too low → too many API calls

### 🚫 When NOT to use

* Instant actions (button clicks, payments)



### 🎯 Interview Answer

> debounceTime reduces unnecessary API calls by waiting until the user stops typing.


# 🧠 6️⃣ switchMap()

### 👉 Simple Meaning

Cancel previous request, use latest

### ✅ Real-time Example

👉 Search API

```ts
switchMap(q => this.http.get(`/search?q=${q}`))
```

### ⚠️ Edge Cases (CRITICAL)

1. ❗ Cancels previous API
   👉 Data may be lost

2. ❗ Late response ignored
   👉 Can confuse debugging

### 🚫 When NOT to use

* Payment APIs
* Order submission
* File uploads

### 🎯 Interview Answer

> switchMap cancels previous requests, making it ideal for search but unsafe for critical operations.


# 🧠 7️⃣ forkJoin()

### 👉 Simple Meaning

Run multiple APIs in parallel and wait for all

### ✅ Real-time Example

👉 Dashboard loading

```ts
forkJoin([
  this.getUser(),
  this.getOrders(),
  this.getSettings()
])
```
### ⚠️ Edge Cases (VERY IMPORTANT)
1. ❗ One API fails → whole fails
2. ❗ One never completes → no response

### ✅ Fix

```ts
forkJoin([
  api1.pipe(catchError(() => of(null))),
  api2.pipe(catchError(() => of([])))
])
```

### 🚫 When NOT to use

* Live streams
* Infinite observables

### 🎯 Interview Answer

> forkJoin is used for parallel calls but fails completely if one API fails unless handled.

# 🧠 8️⃣ mergeMap()

### 👉 Simple Meaning

Run multiple inner observables in parallel

### ✅ Real-time Example

👉 Fetch orders for multiple users

```ts
from(users).pipe(
  mergeMap(user => this.getOrders(user.id))
)
```

### ⚠️ Edge Cases

1. 🔴 Too many parallel calls
   👉 API overload

2. 🔴 No control over order

### 🚫 When NOT to use

* Sequential tasks required

### 🎯 Interview Answer

> mergeMap is used for parallel execution but should be controlled to avoid performance issues.


# 🧠 9️⃣ catchError()

### 👉 Simple Meaning
Handle errors and return fallback

### ✅ Real-time Example
👉 Show empty list instead of crash

```ts
catchError(() => of([]))
```
### ⚠️ Edge Cases
1. ❗ Must return observable
2. ❗ Wrong placement can stop stream early
### 🎯 Interview Answer

> catchError is used to handle failures and provide fallback data to keep the app stable.



# 🧠 🔟 shareReplay()

### 👉 Simple Meaning

Cache last value and share



### ✅ Real-time Example

👉 Avoid multiple API calls

```ts
this.users$ = this.http.get('/api').pipe(shareReplay(1));
```
### ⚠️ Edge Cases (VERY IMPORTANT)

1. 🔴 Memory leak risk
2. 🔴 Stale data


### ✅ Better Pattern

```ts
share({
  connector: () => new ReplaySubject(1),
  resetOnRefCountZero: true
})
```
### 🚫 When NOT to use

* Frequently changing data
### 🎯 Interview Answer

> shareReplay caches API responses but must be used carefully to avoid memory leaks.

# 🔥 FINAL REAL-WORLD FLOW (IMPORTANT)

```ts
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query =>
    this.http.get(`/api?q=${query}`).pipe(
      catchError(() => of([]))
    )
  )
)
```
### 🎯 How to Explain in Interview

> I use debounceTime to reduce API calls, distinctUntilChanged to avoid duplicate inputs, switchMap to cancel previous requests, and catchError to handle failures gracefully.
# 🧠 FINAL CRITICAL THINKING (Senior Level)

👉 Always decide based on:

| Scenario         | Operator             |
| - | -- |
| Search           | debounce + switchMap |
| Parallel API     | forkJoin             |
| Sequential API   | concatMap            |
| Cancel previous  | switchMap            |
| Cache            | shareReplay          |
| Avoid duplicates | distinctUntilChanged |

