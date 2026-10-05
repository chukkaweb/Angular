# RxJS Transformation Operators

## 1. What Are Transformation Operators?

Imagine we have values coming through a pipe:

```text
1 → 2 → 3
```

Sometimes we want to:

```text
Change the value
Call an API using the value
Run multiple API calls
Cancel an old API call
Run API calls one by one
```

Transformation operators help us do this.

Important operators:

```text
map()
tap()

mergeMap()
switchMap()
concatMap()
exhaustMap()
```

---

# 2. Quick Overview ⭐⭐⭐

| Operator | Simple Meaning | Common Angular Use |
|---|---|---|
| `map` | Change value | Transform API/data |
| `tap` | Look/do something without changing value | Logging/side effect |
| `switchMap` | Latest wins | Search/API |
| `mergeMap` | Run together | Parallel operations |
| `concatMap` | One by one | Ordered operations |
| `exhaustMap` | Ignore new while busy | Login/submit |

Easy memory:

```text
map
→ CHANGE

tap
→ LOOK / SIDE EFFECT

switchMap
→ LATEST

mergeMap
→ PARALLEL

concatMap
→ QUEUE

exhaustMap
→ IGNORE WHILE BUSY
```

---

# 3. `map()` ⭐⭐⭐

## Simple Meaning

Imagine a machine.

You put:

```text
1
```

Machine multiplies by 10.

You get:

```text
10
```

Then:

```text
1 → 10
2 → 20
3 → 30
```

That's `map()`.

> `map()` transforms every emitted value into another value.

---

# 4. Basic `map()` Example

```ts
import {
  from,
  map
} from 'rxjs';

from([1, 2, 3])
  .pipe(
    map(value => value * 2)
  )
  .subscribe(console.log);
```

Output:

```text
2
4
6
```

Flow:

```text
1 → map → 2
2 → map → 4
3 → map → 6
```

---

# 5. String Example

```ts
import {
  of,
  map
} from 'rxjs';

of('ganesh')
  .pipe(
    map(name =>
      name.toUpperCase()
    )
  )
  .subscribe(console.log);
```

Output:

```text
GANESH
```

---

# 6. Real Angular `map()` Example

API returns:

```ts
[
  {
    id: 1,
    name: 'Ganesh'
  },
  {
    id: 2,
    name: 'Ravi'
  }
]
```

But UI needs only names.

```ts
this.http
  .get<User[]>('/api/users')
  .pipe(
    map(users =>
      users.map(user => user.name)
    )
  );
```

Result:

```text
[
  'Ganesh',
  'Ravi'
]
```

---

# 7. Important `map()` Point

`map()` does not modify the original Observable itself.

It creates a **new Observable containing transformed values**.

```text
Original Observable

1 → 2 → 3

       ↓ map(x => x * 10)

New Observable

10 → 20 → 30
```

---

# 8. When to Use `map()`

Use it for:

```text
Transforming API response

Changing object shape

Extracting properties

Formatting values

Converting data for UI
```

### Easy Memory

```text
Need to CHANGE the value?

→ map()
```

---

# 9. `pluck()` – Older Approach

Your existing notes use:

```ts
pluck('name')
```

to extract a property. :chatgpt-content-reference{index="1"}

Conceptually:

```text
User object
   ↓
Take name
   ↓
Ganesh
```

For modern code, you can normally use `map()`:

```ts
map(user => user.name)
```

Example:

```ts
from([
  {
    name: 'Ganesh',
    id: 123
  },
  {
    name: 'Chukka',
    id: 456
  }
])
.pipe(
  map(user => user.name)
)
.subscribe(console.log);
```

Output:

```text
Ganesh
Chukka
```

For interview preparation, focus mainly on:

```text
map()
```

---

# 10. `tap()` ⭐⭐⭐

## Simple Meaning

Imagine chocolates moving on a conveyor belt:

```text
🍫 → 🍫 → 🍫
```

You look at each chocolate:

```text
🍫 → 👀 → 🍫
```

But you don't change it.

That's `tap()`.

> `tap()` is mainly used for side effects without transforming the emitted value.

---

# 11. `tap()` Example

```ts
import {
  of,
  tap
} from 'rxjs';

of(1, 2, 3)
  .pipe(
    tap(value =>
      console.log(
        'Current:',
        value
      )
    )
  )
  .subscribe(value =>
    console.log(
      'Subscriber:',
      value
    )
  );
```

Output:

```text
Current: 1
Subscriber: 1

Current: 2
Subscriber: 2

Current: 3
Subscriber: 3
```

The values remain:

```text
1
2
3
```

---

# 12. Important `tap()` Example

This does NOT transform the stream:

```ts
of('ganesh')
  .pipe(
    tap(name => {
      return name.toUpperCase();
    })
  )
  .subscribe(console.log);
```

Output:

```text
ganesh
```

Not:

```text
GANESH
```

Why?

Because `tap()` ignores the returned transformed value.

---

# 13. `map()` vs `tap()` ⭐⭐⭐

Very common interview question.

## map

```ts
map(name =>
  name.toUpperCase()
)
```

Input:

```text
ganesh
```

Output:

```text
GANESH
```

It transforms data.

---

## tap

```ts
tap(name =>
  console.log(name)
)
```

Input:

```text
ganesh
```

Output remains:

```text
ganesh
```

---

## Easy Memory

```text
map
→ CHANGE DATA


tap
→ WATCH / SIDE EFFECT
```

---

# 14. When to Use `tap()`

Common uses:

```text
Logging

Debugging

Analytics

Updating some external state

Observing values

Simple side effects
```

### Interview Answer

> `map()` transforms emitted values, while `tap()` performs side effects without changing the stream's emitted value.

---

# 15. Higher-Order Mapping Operators ⭐⭐⭐

Now we come to the most important transformation operators for Angular interviews:

```text
switchMap
mergeMap
concatMap
exhaustMap
```

These are slightly different from normal `map()`.

---

# 16. Normal `map()` vs Higher-Order Mapping

Suppose we have:

```text
User ID = 10
```

Normal `map()`:

```text
10
 ↓
map
 ↓
20
```

Simple value → simple value.

---

But suppose:

```text
User ID = 10
```

needs to call:

```text
GET /users/10
```

which returns another Observable.

Now we have:

```text
Value
 ↓
API
 ↓
Observable
```

This is where operators such as:

```text
switchMap
mergeMap
concatMap
exhaustMap
```

are useful.

They:

```text
Take source value
      ↓
Create inner Observable
      ↓
Manage inner Observable
      ↓
Return flattened result
```

The difference is **how they manage multiple inner Observables**.

---

# 17. `switchMap()` ⭐⭐⭐

## Simple Meaning

Imagine you tell your mother:

```text
I want Pizza!
```

A few seconds later:

```text
No, Burger!
```

Then:

```text
No, Dosa!
```

Only your latest choice matters.

```text
Pizza  ❌
Burger ❌
Dosa   ✅
```

That's `switchMap()`.

### Easy Meaning

> Latest wins.

---

# 18. `switchMap()` Flow

```text
Source emits A
     ↓
Start API A

Source emits B
     ↓
Switch away from API A
     ↓
Start API B

Source emits C
     ↓
Switch away from API B
     ↓
Start API C
```

Result:

```text
Latest active inner Observable matters.
```

Your notes describe this as keeping only the latest inner Observable active. :chatgpt-content-reference{index="2"}

---

# 19. Search Example ⭐⭐⭐

User types:

```text
A
An
Ang
Angular
```

Without proper handling:

```text
A       → API 1
An      → API 2
Ang     → API 3
Angular → API 4
```

Old API results may arrive later and show stale data.

Use:

```ts
this.searchControl
  .valueChanges
  .pipe(
    debounceTime(300),

    distinctUntilChanged(),

    switchMap(search =>
      this.api.search(search)
    )
  )
  .subscribe(results => {
    console.log(results);
  });
```

Flow:

```text
User types
    ↓
Wait 300ms
    ↓
Same value?
    ↓
No
    ↓
switchMap
    ↓
Latest API
```

---

# 20. Why `switchMap()` for Search?

Because:

```text
Old search
→ no longer important

Latest search
→ important
```

### Easy Memory

```text
LATEST matters?

→ switchMap()
```

---

# 21. Does `switchMap()` Cancel HTTP?

Better interview answer:

> `switchMap()` unsubscribes from the previous inner Observable when a new source value arrives.

With Angular HttpClient, unsubscribing from an in-flight request can abort the client-side HTTP request.

But don't say:

> It reverses whatever already happened on the server.

If the server already processed something, switching away from the client Observable doesn't automatically undo it.

---

# 22. When NOT to Use `switchMap()`

Suppose:

```text
Save Order 1
Save Order 2
Save Order 3
```

Every save matters.

If we use:

```text
switchMap
```

a newer emission can unsubscribe from previous work.

That may not match our requirement.

So don't blindly use `switchMap()` for every API.

---

# 23. `mergeMap()` ⭐⭐⭐

## Simple Meaning

Imagine three children each have a bicycle.

```text
Child A ─────────→

Child B ───→

Child C ──────→
```

Everybody can ride at the same time.

That's `mergeMap()`.

### Easy Meaning

> Run inner work in parallel/concurrently.

Your notes correctly describe `mergeMap` as mapping values to inner Observables and allowing them to execute concurrently, where result order may not be preserved. :chatgpt-content-reference{index="3"}

---

# 24. `mergeMap()` Example

```ts
from([1, 2, 3])
  .pipe(
    mergeMap(id =>
      this.http.get(
        `/api/user/${id}`
      )
    )
  )
  .subscribe(console.log);
```

Flow:

```text
1 → API 1 ─────────→

2 → API 2 ───→

3 → API 3 ──────→
```

All can be active concurrently.

---

# 25. Important `mergeMap()` Rule

Completion order is not guaranteed.

Suppose:

```text
API 1 → takes 5 sec

API 2 → takes 1 sec

API 3 → takes 2 sec
```

Results may arrive:

```text
API 2
API 3
API 1
```

Not necessarily:

```text
API 1
API 2
API 3
```

---

# 26. When to Use `mergeMap()`

Good examples:

```text
Independent API calls

Multiple file uploads

Independent save operations

Background operations

Tasks where all operations matter
and order doesn't matter
```

### Easy Memory

```text
Can everyone work together?

→ mergeMap()
```

---

# 27. `concatMap()` ⭐⭐⭐

## Simple Meaning

Imagine only one bicycle.

Children stand in a queue:

```text
👦
👧
👦
👧
```

First child rides.

After finishing:

```text
Next child rides.
```

That's `concatMap()`.

### Easy Meaning

> One by one, in order.

Your notes describe it as waiting for each inner Observable to complete before processing the next one. :chatgpt-content-reference{index="4"}

---

# 28. `concatMap()` Example

```ts
from([1, 2, 3])
  .pipe(
    concatMap(id =>
      this.saveStep(id)
    )
  )
  .subscribe(console.log);
```

Flow:

```text
1
↓
API 1
↓
COMPLETE
↓
2
↓
API 2
↓
COMPLETE
↓
3
↓
API 3
```

---

# 29. When to Use `concatMap()`

Examples:

```text
Ordered saves

Sequential uploads

Queue processing

Operations where order matters
```

### Easy Memory

```text
ORDER matters?

→ concatMap()
```

---

# 30. Important Senior Clarification

Sometimes people say:

> Use `concatMap()` when API B depends on API A.

That can be too broad.

For a direct dependency like:

```text
Get User
   ↓
Use user.id
   ↓
Get Orders
```

you might simply use:

```ts
getUser().pipe(
  switchMap(user =>
    getOrders(user.id)
  )
)
```

`concatMap()` is especially useful when the **source emits multiple values and each resulting operation must be queued and processed in order**.

---

# 31. `exhaustMap()` ⭐⭐⭐

This operator wasn't covered in the main transformation section of your pasted notes, but it belongs with the other higher-order mapping operators for interview comparison.

## Simple Meaning

Imagine an elevator button.

You press:

```text
CLICK
CLICK
CLICK
CLICK
```

The elevator is already coming.

Only the first click matters.

```text
Click 1 → Accept ✅

Click 2 → Ignore ❌
Click 3 → Ignore ❌
Click 4 → Ignore ❌
```

After the current work finishes:

```text
Next click
→ accepted
```

That's `exhaustMap()`.

---

# 32. Real Angular Example – Login

```ts
loginClick$
  .pipe(
    exhaustMap(() =>
      this.authService.login()
    )
  )
  .subscribe();
```

Flow:

```text
Click 1
↓
LOGIN API running

Click 2 ❌
Click 3 ❌
Click 4 ❌

API complete

Click 5
↓
Accepted
```

---

# 33. When to Use `exhaustMap()`

Examples:

```text
Login

Submit button

Prevent repeated form submission

Operations where repeated clicks
should be ignored while busy
```

### Easy Memory

```text
Already BUSY?

Ignore new request.

→ exhaustMap()
```

---

# 34. THE BIG FOUR ⭐⭐⭐

This is one of the most important RxJS interview areas.

```text
switchMap
mergeMap
concatMap
exhaustMap
```

Don't memorize definitions.

Ask what behavior you need.

---

# 35. Big Four – Child-Simple Comparison

Imagine children asking to use something.

## `switchMap`

```text
New child comes
↓
Forget previous
↓
Latest child gets it
```

### LATEST

---

## `mergeMap`

```text
Everyone has their own bicycle
↓
Everyone rides together
```

### PARALLEL

---

## `concatMap`

```text
Only one bicycle
↓
Everyone waits in queue
```

### QUEUE

---

## `exhaustMap`

```text
One child is riding
↓
Ignore everyone else until finished
```

### IGNORE WHILE BUSY

---

# 36. Big Four Comparison ⭐⭐⭐

| Operator | Previous Work | New Work | Order | Best Example |
|---|---|---|---|---|
| `switchMap` | Switch away/unsubscribe | Start latest | Latest matters | Search |
| `mergeMap` | Keep running | Start too | Not guaranteed | Parallel tasks |
| `concatMap` | Keep running | Queue | Preserved | Ordered saves |
| `exhaustMap` | Keep running | Ignore | First active wins | Login |

---

# 37. Super-Easy Memory

```text
LATEST?
↓
switchMap


PARALLEL?
↓
mergeMap


QUEUE?
↓
concatMap


IGNORE WHILE BUSY?
↓
exhaustMap
```

---

# 38. `merge` vs `mergeMap` ⭐⭐

Your notes also compare these two. :chatgpt-content-reference{index="5"}

## `merge()`

We already have Observables:

```text
Observable A
Observable B
```

We combine them:

```ts
merge(
  observableA$,
  observableB$
);
```

Think:

```text
Existing streams
↓
Combine
```

---

## `mergeMap()`

We have values:

```text
1
2
3
```

Each value creates an Observable:

```text
1 → API 1
2 → API 2
3 → API 3
```

Then they run concurrently.

Think:

```text
Value
↓
Create Observable
↓
Run concurrently
```

### Memory

```text
merge
→ combine existing streams

mergeMap
→ map values to inner streams + merge
```

---

# 39. `concat` vs `concatMap` ⭐⭐

## `concat()`

Already have:

```text
Observable A
Observable B
Observable C
```

Run:

```text
A
↓ complete
B
↓ complete
C
```

---

## `concatMap()`

Source gives:

```text
1
2
3
```

Each value creates an operation:

```text
1 → API
2 → API
3 → API
```

Process:

```text
API 1
↓
API 2
↓
API 3
```

### Memory

```text
concat
→ existing Observables sequentially

concatMap
→ source values → Observables → sequentially
```

---

# 40. `map` vs `switchMap` ⭐⭐⭐

Another important interview question.

## `map`

Use when function returns a normal value.

```ts
map(user =>
  user.name
)
```

```text
User
↓
string
```

---

## `switchMap`

Use when function returns an Observable and latest work matters.

```ts
switchMap(user =>
  this.http.get(
    `/orders/${user.id}`
  )
)
```

```text
User
↓
HTTP Observable
↓
API result
```

### Easy Memory

```text
Normal value transformation?
→ map


Observable/API transformation
where latest matters?
→ switchMap
```

---

# 41. Nested Observable Problem ⭐⭐⭐

Suppose:

```ts
map(id =>
  this.http.get(
    `/users/${id}`
  )
)
```

Conceptually we can end up with:

```text
Observable
   ↓
Observable<Observable<User>>
```

We don't usually want to manually subscribe inside subscribe.

Instead:

```ts
switchMap(id =>
  this.http.get(
    `/users/${id}`
  )
)
```

gives us a flattened stream of results.

---

# 42. Avoid Nested Subscriptions ⭐⭐⭐

Avoid:

```ts
this.route.params
  .subscribe(params => {

    this.api
      .getUser(params['id'])
      .subscribe(user => {

        // ...

      });

  });
```

Prefer composition:

```ts
this.route.params
  .pipe(
    switchMap(params =>
      this.api.getUser(
        params['id']
      )
    )
  )
  .subscribe(user => {

    // ...

  });
```

Benefits:

```text
Cleaner

Easier cancellation

Better error handling

Easier testing

Easier maintenance
```

---

# 43. Real-Time Scenario – Search ⭐⭐⭐

Requirement:

```text
User types quickly

Don't call immediately

Ignore same text

Old request shouldn't matter
```

Solution:

```ts
this.searchControl
  .valueChanges
  .pipe(

    debounceTime(300),

    distinctUntilChanged(),

    switchMap(search =>
      this.api.search(search)
    )

  )
  .subscribe();
```

Memory:

```text
Typing
↓
debounceTime

Duplicate?
↓
distinctUntilChanged

Latest API?
↓
switchMap
```

---

# 44. Real-Time Scenario – Multiple Uploads

Requirement:

```text
File A
File B
File C

All can upload concurrently.
```

Use:

```text
mergeMap
```

Example:

```ts
from(files)
  .pipe(
    mergeMap(file =>
      this.upload(file)
    )
  )
  .subscribe();
```

---

# 45. Real-Time Scenario – Ordered Saves

Requirement:

```text
Save 1
then
Save 2
then
Save 3
```

Use:

```text
concatMap
```

---

# 46. Real-Time Scenario – Login

Requirement:

```text
User clicks Login 5 times.

While first login is running,
ignore remaining clicks.
```

Use:

```text
exhaustMap
```

---

# 47. Senior Interview Questions

## Q1. What does `map()` do?

> `map()` transforms every emitted value and returns a new Observable containing the transformed values.

---

## Q2. `map()` vs `tap()`?

> `map()` transforms the emitted value, while `tap()` is used for side effects without changing the emitted value.

---

## Q3. Why use `switchMap()` for search?

Because only the latest search is relevant.

```text
Old search → irrelevant

Latest search → important
```

It also prevents stale earlier responses from being the active inner stream.

---

## Q4. `switchMap()` vs `mergeMap()`?

```text
switchMap
→ latest inner Observable

mergeMap
→ all inner Observables concurrently
```

Example:

```text
Search
→ switchMap

Independent parallel work
→ mergeMap
```

---

## Q5. `mergeMap()` vs `concatMap()`?

```text
mergeMap
→ concurrent
→ order not guaranteed

concatMap
→ sequential
→ order preserved
```

---

## Q6. `switchMap()` vs `exhaustMap()`?

This is an excellent interview question.

### switchMap

```text
New request arrives
↓
Switch to new request
```

### exhaustMap

```text
Current request running
↓
Ignore new request
```

Examples:

```text
Search
→ switchMap

Login
→ exhaustMap
```

---

## Q7. Why shouldn't we use `switchMap()` for every API?

Because sometimes every operation matters.

Example:

```text
Save transaction A
Save transaction B
Save transaction C
```

We may not want a newer source emission to unsubscribe from previous work.

Choose based on business requirement.

---

## Q8. Does `mergeMap()` preserve order?

No.

Operations can complete in different order.

---

## Q9. Does `concatMap()` run requests in parallel?

No.

It queues inner Observables and processes them sequentially.

---

## Q10. What happens if an inner `concatMap()` Observable never completes?

The next queued operation cannot start.

```text
API 1
↓
Never completes
↓
API 2 waits
↓
API 3 waits
```

---

# 48. Cross Questions / Traps

## Search API: `switchMap` or `mergeMap`?

```text
switchMap
```

Because latest search matters.

---

## Parallel uploads?

```text
mergeMap
```

---

## Ordered saves?

```text
concatMap
```

---

## Prevent duplicate login?

```text
exhaustMap
```

---

## Change API response shape?

```text
map
```

---

## Log API response without changing it?

```text
tap
```

---

# 49. How to Choose the Big Four ⭐⭐⭐

When interviewer gives a scenario, ask:

```text
Do I need only the LATEST?
        ↓
    switchMap
```

```text
Does EVERY operation matter
and can they run concurrently?
        ↓
     mergeMap
```

```text
Does EVERY operation matter
and must order be preserved?
        ↓
    concatMap
```

```text
Should I IGNORE new events
while current work is running?
        ↓
    exhaustMap
```

---

# 50. Quick Interview Cheat Sheet

```text
Change data
    ↓
   map


Side effect / logging
    ↓
   tap


Latest wins
    ↓
 switchMap


Parallel
    ↓
 mergeMap


Queue / sequential
    ↓
 concatMap


Ignore while busy
    ↓
 exhaustMap
```

---

# 51. Senior Angular Priority

## 🔴 Must Know Deeply

```text
map

tap

switchMap

mergeMap

concatMap

exhaustMap
```

Especially:

```text
switchMap vs mergeMap

mergeMap vs concatMap

switchMap vs exhaustMap

map vs switchMap

map vs tap
```

---

## 🟡 Should Know

```text
merge vs mergeMap

concat vs concatMap

Nested Observable

Nested subscription problem
```

---

## 🟢 Low Priority

```text
pluck
combineLatestAll
rare transformation operators
```

Don't spend much preparation time here unless an interview exposes a gap.

---

# 52. Final 30-Second Revision

```text
                TRANSFORMATION
                     │
          ┌──────────┴──────────┐
          │                     │
      Simple Value          Inner Observable
          │                     │
      ┌───┴───┐       ┌─────────┼─────────┐
      │       │       │         │         │
     map     tap   switchMap  mergeMap  concatMap
      │       │       │         │         │
   Change   Watch   Latest   Parallel    Queue
                                         
                               exhaustMap
                                   │
                             Ignore while busy
```

## One-Line Memory

> **`map` = change, `tap` = watch, `switchMap` = latest, `mergeMap` = parallel, `concatMap` = queue, `exhaustMap` = ignore while busy.**

---

# 53. Best Interview Thinking Pattern

Don't first ask:

> "Which operator did I memorize?"

Ask:

```text
What is the business requirement?
          ↓
Does latest matter?
          ↓
Does every request matter?
          ↓
Can requests run concurrently?
          ↓
Does order matter?
          ↓
Should repeated requests be ignored?
          ↓
Choose operator
```

That's the senior-level way to choose RxJS operators.
