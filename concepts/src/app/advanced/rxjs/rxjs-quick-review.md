# RxJS – Simple to Senior-Level  Notes
> Goal: Understand RxJS in very simple language, but prepare enough for Senior Angular s.

# Table of Contents
## Part 1 – RxJS Fundamentals
1. What is RxJS?
2. What is a Stream?
3. Observable
4. Observer
5. Subscriber
6. Subscription
7. Observable Lifecycle
   - next
   - error
   - complete
8. Creating Observables
   - `of`
   - `from`
   - `interval`
   - `timer`
9. Cold Observable
10. Hot Observable
11. Unicast vs Multicast


## Part 2 – Subjects
12. Subject
13. BehaviorSubject
14. ReplaySubject
15. AsyncSubject
16. Subject vs BehaviorSubject
17. BehaviorSubject vs ReplaySubject
18. Subject vs Observable
19. Subject vs EventEmitter
20. BehaviorSubject vs Angular Signal

## Part 3 – Basic Operators
21. `pipe()`
22. `map()`
23. `filter()`
24. `tap()`
25. `startWith()`
26. `take()`
27. `first()`
28. `takeUntil()`
29. `takeUntilDestroyed()`

## Part 4 – Time-Based Operators
30. `debounceTime()`
31. `distinctUntilChanged()`
32. `throttleTime()`
33. Debounce vs Throttle

## Part 5 – Higher-Order Mapping Operators ⭐⭐⭐
34. What is Higher-Order Mapping?
35. `switchMap()`
36. `concatMap()`
37. `mergeMap()`
38. `exhaustMap()`
39. switchMap vs concatMap
40. switchMap vs mergeMap
41. concatMap vs mergeMap
42. switchMap vs exhaustMap
43. How to choose the correct operator

## Part 6 – Combining Observables
44. `forkJoin()`
45. `combineLatest()`
46. `withLatestFrom()`
47. `zip()`
48. forkJoin vs combineLatest
49. combineLatest vs withLatestFrom

## Part 7 – Error Handling
50. `catchError()`
51. Inner vs Outer `catchError`
52. `retry()`
53. Retry strategy
54. `finalize()`
55. Error handling in Angular API calls

## Part 8 – Sharing & Caching
56. Multiple subscriptions problem
57. `share()`
58. `shareReplay()`
59. `shareReplay(1)`
60. `shareReplay` vs BehaviorSubject
61. `shareReplay` caching behavior
62. `refCount`
63. When NOT to use `shareReplay`

## Part 9 – Subscription & Memory Management
64. Why unsubscribe?
65. Memory leaks
66. Which Observables need unsubscribe?
67. Which normally don't?
68. AsyncPipe
69. `takeUntilDestroyed()`
70. Manual unsubscribe
71. Nested subscription problem

## Part 10 – Angular + RxJS
72. HttpClient + RxJS
73. Reactive Forms + RxJS
74. Route Params + RxJS
75. Search / Autocomplete
76. Multiple API calls
77. Dependent API calls
78. Parallel API calls
79. Sequential API calls
80. Prevent duplicate submissions
81. Shared API data
82. Loading state
83. API error handling
84. Component destruction

## Part 11 – RxJS + Modern Angular
85. RxJS vs Signals
86. When to use Signals
87. When to use RxJS
88. Using both together
89. `toSignal()`
90. `toObservable()`
91. BehaviorSubject vs Signal
92. Does Signal replace RxJS?

## Part 12 – Senior-Level Concepts
93. Declarative vs Imperative RxJS
94. Avoiding nested subscriptions
95. Race conditions
96. Cancellation
97. Backpressure / fast emissions
98. Multicasting
99. Operator placement
100. Error boundaries
101. Observable composition
102. Subscription ownership
103. Side effects
104. RxJS performance considerations


# PART 1 – FUNDAMENTALS
# 1. What is RxJS?
Imagine a water pipe.
```text
💧 → 💧 → 💧 → 💧 → 💧
```

Water keeps coming over time.
In an application, instead of water, values keep coming:

```text
User typing
Button clicks
API responses
Route changes
WebSocket messages
Timer events
```

RxJS helps us:
```text
Receive
   ↓
Transform
   ↓
Filter
   ↓
Combine
   ↓
Cancel
   ↓
Handle
```

these values.
### Simple Definition
> RxJS is a JavaScript library used to work with asynchronous and event-based data using Observable streams.

### Angular Examples
```text
FormControl.valueChanges
HTTP requests
Router events
WebSockets
Button events
State changes
```

# 2. What is a Stream?
Imagine watching cars on a road.
```text
🚗 → 🚙 → 🚕 → 🚌
```
Cars arrive over time.
That is similar to a stream.
In RxJS:

```text
10 → 20 → 30 → 40
```
or:

```text
"A" → "An" → "Ang" → "Angular"
```

### Easy Memory

> Stream = values/events arriving over time.

# 3. Observable
Imagine a YouTube channel.

```text
YouTube Channel
      ↓
Video 1
      ↓
Video 2
      ↓
Video 3
```

The channel can produce videos.

Similarly:

```text
Observable
    ↓
Value
    ↓
Value
    ↓
Value
```

### Example

```ts
const numbers$ = of(1, 2, 3);
```

### Easy Definition

> Observable is something that can produce values over time.

# 4. Observer
Now imagine somebody watching the YouTube channel.

They can react to:

```text
New video
Problem
Channel finished
```

RxJS Observer can react to:

```ts
{
  next: value => {},
  error: error => {},
  complete: () => {}
}
```

### Easy Memory

```text
Observable = gives
Observer   = receives
```



# 5. Subscription
YouTube channel exists.

But you don't automatically receive its content.

You:

```text
SUBSCRIBE
```

Same with RxJS:

```ts
observable$.subscribe(value => {
  console.log(value);
});
```

### Easy Memory

```text
Observable
     ↓
 Subscribe
     ↓
 Receive values
```

# 6. Observable Lifecycle
Observable can send:

```text
next(1)
next(2)
next(3)
complete()
```

Or:

```text
next(1)
next(2)
error(...)
```

### Three Important Notifications

```text
next      → Here's a value
error     → Something failed
complete  → I'm finished
```

### Important  Point

After:

```text
error
```

or:

```text
complete
```

that Observable execution does not continue emitting values.


# 7. `of()`
Imagine putting three chocolates into a box:

```text
🍫 🍫 🍫
```
RxJS emits them one by one.
```ts
of(1, 2, 3)
```

Output:

```text
1
2
3
```

### Use

Create an Observable from known values.



# 8. `from()`
Suppose we already have:

```ts
[1, 2, 3]
```

We want:

```text
1 → 2 → 3
```

Use:

```ts
from([1, 2, 3])
```

It can also create Observables from things such as Promises and other iterable/Observable-compatible inputs.



# 9. Cold Observable ⭐
Imagine Netflix.

You start a movie.

Your friend starts the same movie.

```text
You
↓
Movie starts from beginning

Friend
↓
Another playback starts
```

Each person gets their own execution.

That's similar to a **Cold Observable**.

### Angular Example

```ts
this.http.get('/users')
```

Two subscriptions can trigger two HTTP requests.

```text
Subscriber A → API Call 1
Subscriber B → API Call 2
```

###  Definition

> A cold Observable creates an independent execution for each subscriber.



# 10. Hot Observable ⭐
Imagine live cricket.

```text
              → Ganesh
Live Match →  → Ravi
              → Shiva
```

Everybody watches the same ongoing match.

The match doesn't restart when Ravi starts watching.
That's the basic idea of a **Hot Observable**.

Examples can include:

```text
Subjects
DOM event streams
WebSockets
shared streams
```

### Easy Difference
```text
Cold → Each subscriber gets own execution

Hot → Subscribers share an ongoing source
```



# PART 2 – SUBJECTS

# 11. Subject ⭐⭐⭐
Imagine a teacher speaking to students.

```text
             → Student A
Teacher →    → Student B
             → Student C
```

Teacher says:
```text
"Tomorrow is holiday!"
```

All currently listening students hear it.
That's like a Subject.

### Example

```ts
const subject = new Subject<string>();
subject.subscribe(value => console.log(value));
subject.next('Angular');
```

### Important
Subject is both:

```text
Observable
+
Observer
```

We can subscribe to it.

And we can manually send values using:

```ts
next()
```

# 12. BehaviorSubject ⭐⭐⭐
Imagine a classroom whiteboard.
```text
Today's Topic:

Angular
```

A student enters late.

They immediately see:

```text
Angular
```

That's BehaviorSubject.

It remembers the **current/latest value**.

### Example

```ts
const user$ = new BehaviorSubject<User | null>(null);
```

Later:

```ts
user$.next(currentUser);
```

New subscribers immediately receive the latest value.

### Common Uses
```text
Current user
Selected item
Theme
Simple shared state
Authentication state
```

# 13. ReplaySubject ⭐⭐
Imagine the teacher keeps the last 3 announcements.
```text
Announcement A
Announcement B
Announcement C
```

A new student arrives.
Teacher repeats:
```text
A
B
C
```

That's ReplaySubject.
Example:

```ts
new ReplaySubject(3);
```

### Difference
```text
Subject
→ remembers nothing

BehaviorSubject
→ remembers latest/current value

ReplaySubject
→ can replay multiple previous values
```



# 14. AsyncSubject
Imagine a race.
During the race:

```text
Runner A leading
Runner B leading
Runner C leading
```
But you only announce the **final winner after the race finishes**.
That's the basic idea of AsyncSubject.
It emits its latest value when it completes.
Less common in normal Angular application code.

###  Priority

🟢 Awareness is usually enough.



# PART 3 – BASIC OPERATORS
# 15. `pipe()`
Imagine water moving through several machines.

```text
Water
  ↓
Machine 1
  ↓
Machine 2
  ↓
Machine 3
```

RxJS:

```ts
observable$.pipe(
  operator1(),
  operator2(),
  operator3()
)
```

### Easy Memory

> `pipe()` connects operators together.

# 16. `map()` ⭐

Input:

```text
1 → 2 → 3
```

We want:

```text
10 → 20 → 30
```

Use:

```text
map
```

### Easy Meaning

> Change each value into another value.

Angular example:

```text
API Users
   ↓
map
   ↓
User Names
```

# 17. `filter()` ⭐
Basket contains:
```text
🍎 🍌 🍎 🍊 🍎
```

We only want apples.

```text
filter
   ↓
🍎 🍎 🍎
```

### Easy Meaning

> Allow only values matching a condition.



# 18. `tap()` ⭐
Packages move on a belt.

```text
Package → 👀 → Package
```

You look at the package.

You don't change it.

That's `tap()`.

Useful for:

```text
Logging
Debugging
Analytics
Side effects
```

###  Question

### `map` vs `tap`?

```text
map
→ transform/change value

tap
→ perform side effect without transforming the stream value
```



# PART 4 – TIME OPERATORS
# 19. `debounceTime()` ⭐⭐⭐
Child keeps shouting:

```text
Mom!
Mom!
Mom!
Mom!
```

Mom waits until the child stops for a moment.

Then responds.

Search:

```text
A
An
Ang
Angu
Angular
       ↓
Wait 300ms
       ↓
API
```

### Easy Meaning

> Wait until the events become quiet.

### Real Use

```text
Search
Autocomplete
Filter input
```


# 20. `distinctUntilChanged()` ⭐⭐⭐
Values:

```text
Angular
Angular
Angular
React
React
Vue
```

Output:

```text
Angular
React
Vue
```

### Easy Meaning

> Ignore the same consecutive value.

Search:

```ts
valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged()
)
```

# 21. `throttleTime()`
Imagine someone repeatedly ringing your bell:

```text
🔔 🔔 🔔 🔔 🔔 🔔
```

You decide:

> "I'll respond at most once during each time window."
That's similar to throttle.
Useful for fast events such as:

```text
Scroll
Mouse movement
Resize
Repeated clicks
```



# 22. Debounce vs Throttle ⭐
### Debounce

```text
Wait until activity stops.
```

Example:

```text
Search box
```

### Throttle

```text
Allow limited events during continuous activity.
```

Example:

```text
Scroll event
```

Easy:

```text
Search → debounce

Scroll → throttle
```



# PART 5 – THE BIG FOUR ⭐⭐⭐
These are extremely important.

```text
switchMap
concatMap
mergeMap
exhaustMap
```

Think:
```text
LATEST
QUEUE
PARALLEL
IGNORE
```



# 23. `switchMap()` ⭐⭐⭐
You tell your mother:

```text
I want pizza.
```

Then:

```text
No, burger.
```

Then:

```text
No, dosa.
```

Only latest choice matters.

```text
Pizza  ❌
Burger ❌
Dosa   ✅
```

That's switchMap.

### Easy Meaning

> Latest wins.

### Best Uses

```text
Search
Autocomplete
Route parameter → API
Filters
```

### Search Example

```text
"A"       → API 1 ❌
"Ang"     → API 2 ❌
"Angular" → API 3 ✅
```

### Senior Cross Question
**Why switchMap instead of mergeMap for search?**
Because old search results are no longer useful.

With mergeMap, requests may complete in a different order:

```text
Angular API → completes first
Ang API     → completes later
```

Old results could overwrite newer results.

`switchMap` avoids that by switching away from the previous inner stream.


# 24. `concatMap()` ⭐⭐⭐
Imagine a queue.

```text
👦
👧
👦
👧
```

One person finishes.
Then next.

```text
A → Finish
    B → Finish
        C → Finish
```

### Easy Meaning

> One by one, in order.

### Use

```text
Ordered saves
Sequential operations
Operations where order matters
```

Example:

```text
Save Step 1
↓
Save Step 2
↓
Save Step 3
```



# 25. `mergeMap()` ⭐⭐⭐
Four children have four bicycles.
Everyone can start together.
```text
A ───────────→
B ─────→
C ─────────→
D ───→
```

### Easy Meaning
> Run work in parallel.
### Use

```text
Independent requests
Parallel uploads
Operations where every request matters
and order doesn't matter
```

### Important

Completion order is not guaranteed.



# 26. `exhaustMap()` ⭐⭐⭐

Imagine an elevator button.

You press:

```text
CLICK
CLICK
CLICK
CLICK
```

Elevator is already coming.

Extra clicks are ignored.

```text
Click 1 → Accepted ✅

Click 2 → Ignore ❌
Click 3 → Ignore ❌
Click 4 → Ignore ❌
```

After first operation finishes:

```text
Next click → Accepted
```

### Easy Meaning

> I'm busy. Ignore new requests.

### Best Examples

```text
Login
Submit
Payment
Prevent duplicate action
```



# 27. BIG FOUR – EASY MEMORY ⭐⭐⭐

| Operator | Kid Meaning | Real Example |
||||
| `switchMap` | Latest wins | Search |
| `concatMap` | Queue | Ordered saves |
| `mergeMap` | Everyone works together | Parallel requests |
| `exhaustMap` | Busy, ignore others | Login/Submit |

###  Trick

When er gives a scenario, ask yourself:

```text
Do I need latest?
→ switchMap

Do I need order?
→ concatMap

Can everything run together?
→ mergeMap

Should I ignore repeated action while busy?
→ exhaustMap
```



# PART 6 – COMBINING OBSERVABLES
# 28. `forkJoin()` ⭐⭐⭐

Mother says:

> Dinner starts when everyone reaches home.

```text
Dad ───────────┐
Mom ────────┐  │
Child ──────────┤
Ganesh ─────┐   │
             ↓
           DINNER
```

Everyone must finish/arrive.

That's `forkJoin`.

### Angular

Dashboard needs:

```text
User API ───────┐
Orders API ─────┤
Reports API ────┤
Settings API ───┘
                ↓
          Show dashboard
```

### Important

`forkJoin` waits for all sources to **complete**.

If one never completes:

```text
forkJoin
→ keeps waiting
```

If one errors and the error isn't handled:

```text
forkJoin
→ errors
```

# 29. `combineLatest()` ⭐⭐⭐

Price:
```text
₹100
```

Quantity:

```text
2
```

Result:

```text
₹200
```

Quantity changes:

```text
3
```

Result:

```text
₹300
```

Price changes:

```text
₹120
```

Result:

```text
₹360
```

### Easy Meaning

> Whenever one changes, combine the latest values.

Important:

Each source normally needs to emit at least once before `combineLatest` can produce its first combined value.



# 30. forkJoin vs combineLatest ⭐⭐⭐

```text
forkJoin

Wait until everything COMPLETES
↓
Give final combined result
```

Good:

```text
Multiple HTTP requests
```



```text
combineLatest

Wait until everyone gives at least one value
↓
Whenever ANY changes
↓
Give latest combination
```

Good:

```text
Filters
Form values
Reactive state
```



# 31. `withLatestFrom()`

Imagine Dad says:

> "Whenever I leave the house, tell me the current weather."

Weather changing alone doesn't trigger Dad leaving.

```text
Dad leaves
    +
Latest weather
    ↓
Result
```

That's the idea of `withLatestFrom`.

One stream is the **main trigger**.

When it emits, take the latest values from other streams.

### Difference

```text
combineLatest
→ any source can trigger

withLatestFrom
→ main/source Observable triggers
```



# PART 7 – ERROR HANDLING

# 32. `catchError()` ⭐⭐⭐

You're riding a bicycle.

```text
Ride
 ↓
Fall ❌
```

Instead of giving up:

```text
Handle problem
↓
Continue with fallback
```

That's `catchError`.

Example:

```ts
this.api.getUsers().pipe(
  catchError(error => {
    console.error(error);
    return of([]);
  })
)
```



# 33. Inner vs Outer `catchError` ⭐⭐⭐

Very important senior question.

Imagine:

```text
Search stream
   ↓
switchMap
   ↓
API
```

If one API fails, do we want the entire search box to die?

Usually:

```text
NO
```

We may handle the API error inside the inner operation so the outer search stream can continue listening for future searches.

### Easy Memory

```text
Catch inside
→ handle that inner operation

Catch outside
→ may terminate/replace the larger pipeline
```

Operator placement matters.



# 34. `retry()`

Doorbell:

```text
Ring ❌

Try again ❌

Try again ✅
```

That's retry.

Good for some temporary failures.

But:

```text
Wrong password ❌
retry
Wrong password ❌
retry
```

doesn't make sense.

### Senior Point

Don't blindly retry every error or every operation.



# 35. `finalize()` ⭐

API starts:

```text
Loading = true
```

Then either:

```text
SUCCESS
```

or:

```text
ERROR
```

Finally:

```text
Loading = false
```

`finalize()` is useful for cleanup that should happen when the observable terminates/unsubscribes.



# PART 8 – SHARING / CACHING



# 36. Multiple Subscription Problem ⭐⭐⭐

Suppose:

```ts
users$ = this.http.get('/users');
```

Component A subscribes:

```text
API Call 1
```

Component B subscribes:

```text
API Call 2
```

Because HttpClient Observables are normally cold.

Sometimes we don't want duplicate work.



# 37. `shareReplay()` ⭐⭐⭐

Imagine three children want the same movie.

Bad:

```text
Child A → Buy movie
Child B → Buy movie
Child C → Buy movie
```

Better:

```text
              → Child A
One source →  → Child B
              → Child C
```

`shareReplay` can share the source and replay previous values to later subscribers.

Example:

```ts
users$ = this.http.get('/users').pipe(
  shareReplay({
    bufferSize: 1,
    refCount: true
  })
);
```

### `bufferSize: 1`

Remember/replay:

```text
latest 1 value
```

### `refCount: true`

Source subscription can be tied to whether subscribers are present.

### Important

This is:

```text
RxJS in-memory sharing/replay
```

It is NOT:

```text
localStorage
sessionStorage
database
server cache
```



# 38. `shareReplay` vs BehaviorSubject ⭐⭐⭐

Both can provide a latest value to subscribers.

But they're different.

### BehaviorSubject

```text
We own the state.

We manually do:
subject.next(value)
```

### shareReplay

```text
An Observable source already produces data.

We share/replay that source.
```

Easy:

```text
BehaviorSubject
→ push/manage state

shareReplay
→ share/replay an Observable result
```



# PART 9 – MEMORY MANAGEMENT
# 39. Why Unsubscribe?

Imagine leaving home while the tap remains open.

```text
🚰

💧
💧
💧
💧
```

Nobody needs the water.

But it continues.

A long-running subscription can similarly remain active after a component is destroyed.

This can cause:

```text
Memory leaks
Unexpected logic
Extra work
```



# 40. Do All Observables Need Manual Unsubscribe?
NO.

Very important  point.

### HttpClient

Usually:

```text
Request
↓
Response
↓
Complete
```

Normally no manual unsubscribe is required just to prevent a long-lived subscription after completion.

### Long-Lived Streams

Be careful with:

```text
FormControl.valueChanges
interval
WebSockets
Subjects
DOM/event streams
custom long-running Observables
```



# 41. `takeUntilDestroyed()` ⭐⭐⭐

Modern Angular gives a convenient way to tie a subscription to component/directive destruction.

```ts
this.form.valueChanges.pipe(
  takeUntilDestroyed()
).subscribe();
```

Easy:

```text
Component alive
→ listen

Component destroyed
→ stop
```



# 42. AsyncPipe ⭐⭐⭐

Instead of manually subscribing:

```ts
users$.subscribe(...)
```

template can use:

```html
{{ users$ | async }}
```

AsyncPipe manages its subscription lifecycle for the template.

### Senior Preference

Where practical:

```text
Observable
↓
AsyncPipe
↓
Template
```

can be cleaner than unnecessary manual subscriptions.



# 43. Nested Subscription Problem ⭐⭐⭐
Avoid code like:

```ts
user$.subscribe(user => {

  this.api.getOrders(user.id).subscribe(orders => {

    this.api.getPayments(user.id).subscribe(payments => {

    });

  });

});
```

Think:

```text
subscribe
   ↓
 subscribe
    ↓
  subscribe
```

This becomes difficult to:

```text
Read
Cancel
Handle errors
Test
Maintain
```

Prefer composition.

For dependent latest-value work:

```text
user
 ↓
switchMap
 ↓
orders
```

### Senior Rule

> Prefer composing Observables over nested subscriptions.



# PART 10 – REAL ANGULAR SCENARIOS
# 44. Search Box ⭐⭐⭐

Problem:

User types:

```text
A
An
Ang
Angular
```

Don't call API every time.

Don't show old results.

Solution:

```text
valueChanges
     ↓
debounceTime(300)
     ↓
distinctUntilChanged()
     ↓
switchMap()
     ↓
API
```

### Why?

```text
debounceTime
→ reduce rapid requests

distinctUntilChanged
→ avoid repeated same value

switchMap
→ latest search wins
```



# 45. Login Button ⭐⭐⭐

Problem:

User clicks:

```text
Login
Login
Login
Login
```

We don't want multiple requests.

Solution:

```text
exhaustMap
```

Meaning:

```text
First login → accepted

while running:

other clicks → ignored
```



# 46. Sequential Save ⭐⭐⭐

Need:

```text
Save A
then
Save B
then
Save C
```

Solution:

```text
concatMap
```

Because:

```text
order matters
```

# 47. Independent Parallel Work ⭐⭐⭐

Need to process independent items.

```text
Upload A
Upload B
Upload C
```

They can run concurrently.

Solution:

```text
mergeMap
```

In real applications, we may also control concurrency if needed.



# 48. Multiple Dashboard APIs ⭐⭐⭐

Need:

```text
Profile API
Orders API
Stats API
Settings API
```

Show page when all one-time requests complete.

Solution:

```text
forkJoin
```



# 49. Dependent APIs ⭐⭐⭐

Example:

First get user.

Then use user ID to get orders.

```text
Get User
   ↓
User ID
   ↓
Get Orders
```

Use a flattening operator based on required behavior.

Often:

```text
switchMap
```

for latest-dependent request flows.



# 50. Shared API Data ⭐⭐⭐

Three components need same configuration.

Without sharing:

```text
A → API
B → API
C → API
```

Potential solution:

```text
API
 ↓
shareReplay
 ↙ ↓ ↘
A  B  C
```

But caching/lifetime requirements should be considered before using it blindly.



# PART 11 – SIGNALS + RXJS
# 51. Signals vs RxJS ⭐⭐⭐

Imagine cricket.
## Signal = Scoreboard

```text
INDIA: 250
```

It represents the **current value/state**.

## RxJS = Commentary
```text
Ball 1
Ball 2
FOUR
Ball 3
WICKET
Ball 4
```

It's a stream of events over time.

### Easy Rule

```text
Signal
→ synchronous reactive state

RxJS
→ asynchronous/event streams
```



# 52. When to Use Signals?
Examples:
```text
Current selected tab
Counter
UI state
Derived total
Show/hide state
Component state
```



# 53. When to Use RxJS?
Examples:

```text
Search
API orchestration
WebSockets
Route streams
Form value changes
Debouncing
Cancellation
Combining event streams
Retries
```



# 54. Can We Use Both?

YES.

Modern Angular applications often use both.

Example:

```text
API / RxJS
    ↓
toSignal()
    ↓
Signal
    ↓
Template
```

Or:

```text
Signal
   ↓
toObservable()
   ↓
RxJS operators
```



# 55. Does Signal Replace RxJS?

NO.

Good  answer:

> Signals are excellent for synchronous reactive state and Angular UI updates. RxJS remains very useful for asynchronous streams, cancellation, event composition and time-based operations. I use them together depending on the problem.



# PART 12 – SENIOR-LEVEL PROBLEMS
# 56. Race Condition ⭐⭐⭐

Imagine:

```text
Search "Angular"
↓
API A

Search "React"
↓
API B
```

API B finishes first:

```text
React results ✅
```

Then old API A finishes:

```text
Angular results ❌
```

Now old data may replace new data.

That's a race-condition style problem.

For search:

```text
switchMap
```

helps because only the latest request matters.



# 57. Cancellation ⭐⭐⭐
Senior question:

> Does switchMap cancel the previous API?

Better answer:

`switchMap` unsubscribes from the previous inner Observable when a new source value arrives.

With Angular HttpClient, unsubscribing from an in-flight request can abort the client-side request.

But don't say:

> "It definitely reverses whatever happened on the server."

If the server already received/performed an operation, client cancellation doesn't automatically undo it.



# 58. Operator Placement ⭐⭐⭐

Order matters.

Example:

```text
valueChanges
↓
debounceTime
↓
distinctUntilChanged
↓
switchMap
↓
API
```

Changing operator placement can change behavior.

Same for:

```text
catchError
```

inside vs outside `switchMap`.

Senior developers should understand not only:

```text
Which operator?
```

but:

```text
Where should the operator be placed?
```



# 59. Side Effects ⭐⭐
Try to keep transformation pipelines predictable.

Use:

```text
map
```

for transformation.

Use:

```text
tap
```

for side effects.

Avoid hiding lots of business-state mutation inside operators without a clear reason.



# 60. Declarative vs Imperative RxJS ⭐⭐

Imperative style:

```text
Subscribe
↓
Set variable
↓
Subscribe again
↓
Call another method
```

Declarative style:

```text
Source
 ↓
Operators
 ↓
Combined Observable
 ↓
Template / final consumer
```

Senior Angular code often benefits from composing the stream rather than creating many scattered subscriptions.



# SENIOR  QUESTIONS

## Q1. What is RxJS?

> RxJS is a library for reactive programming using Observables. It helps us handle asynchronous and event-based streams such as HTTP requests, form changes, route parameters and WebSockets.

## Q2. Observable vs Promise?

Simple:
```text
Promise
→ usually one eventual result

Observable
→ can emit zero, one or many values
→ supports rich operator composition
→ can be unsubscribed
```

Angular HttpClient uses Observables.


## Q3. Subject vs BehaviorSubject?
```text
Subject
→ no initial/current value requirement
→ new subscriber receives future emissions

BehaviorSubject
→ has current value
→ new subscriber immediately receives latest value
```

## Q4. BehaviorSubject vs ReplaySubject?
```text
BehaviorSubject
→ current/latest one value
→ requires initial value

ReplaySubject
→ can replay N previous values
```



## Q5. Why switchMap for search?

Because:

```text
Only latest search matters.
```

It switches away from previous inner requests when a newer search arrives.



## Q6. Why not switchMap for every API?

Because sometimes every operation matters.

Example:

```text
Save transaction A
Save transaction B
```

We shouldn't automatically discard/switch away from A just because B arrives.

Operator depends on required behavior.



## Q7. mergeMap vs concatMap?

```text
mergeMap
→ parallel
→ completion order may differ

concatMap
→ one by one
→ preserves order
```

## Q8. exhaustMap use case?

```text
Login
Submit
Payment
```

Ignore repeated source emissions while current inner work is active.

## Q9. forkJoin vs combineLatest?
```text
forkJoin
→ waits for completion
→ final values
→ common with multiple one-time HTTP requests

combineLatest
→ continuous combination
→ emits whenever a source changes after all have emitted once
```



## Q10. How do you prevent memory leaks?

Possible approaches:

```text
AsyncPipe
takeUntilDestroyed()
proper subscription ownership
unsubscribe where appropriate
avoid unnecessary manual subscriptions
```



## Q11. Does HttpClient require manual unsubscribe?

Normally an ordinary HttpClient request completes after its response, so manual unsubscribe isn't usually required just for cleanup after completion.

However, cancellation may still be useful depending on the workflow.



## Q12. What is shareReplay?

> It allows subscribers to share a source and replay previous emissions to later subscribers.

Common example:

```text
API
↓
shareReplay(1)
↓
Multiple subscribers
```

## Q13. shareReplay vs BehaviorSubject?

```text
BehaviorSubject
→ manually manage/push state

shareReplay
→ share/replay values produced by another Observable
```



## Q14. How do you avoid nested subscriptions?
Instead of:

```text
subscribe
  ↓
 subscribe
```

compose streams using operators such as:

```text
switchMap
concatMap
mergeMap
forkJoin
combineLatest
```

depending on the requirement.



## Q15. What is a cold Observable?

> Every subscriber gets an independent execution.

Common example:

```text
HttpClient
```



## Q16. What is a hot Observable?

> Subscribers observe a shared/ongoing source rather than each creating an independent execution.

Examples can include Subjects, event streams and WebSocket-style streams.



# SENIOR SCENARIO QUESTIONS

## Scenario 1

User types quickly in search.

### Requirements
- Don't call API for every key.
- Same value shouldn't call again.
- Old API results shouldn't overwrite latest.

### Answer

```text
debounceTime
+
distinctUntilChanged
+
switchMap
```



## Scenario 2

User repeatedly clicks Login.

### Answer

```text
exhaustMap
```

## Scenario 3
Three saves must happen in exact order.

### Answer

```text
concatMap
```



## Scenario 4

Five independent uploads can happen concurrently.

### Answer

```text
mergeMap
```

possibly with controlled concurrency.



## Scenario 5

Dashboard requires 5 independent HTTP requests and waits for all.

### Answer

```text
forkJoin
```

## Scenario 6
Country and language can both change.

Whenever either changes, reload data.

### Answer

```text
combineLatest
```



## Scenario 7

Route ID changes.

Get latest user's details.

### Answer

```text
route params
↓
switchMap
↓
API
```



## Scenario 8

Three components use the same configuration API.

### Possible Answer

```text
shareReplay
```

after considering how long the data should remain cached/shared and how it should be refreshed.



## Scenario 9
Component uses `interval()` and gets destroyed.

### Answer

Use proper subscription lifecycle management, for example:

```text
takeUntilDestroyed()
```



## Scenario 10
API fails but search box should continue working.
### Answer

Handle error appropriately in the inner API stream.

```text
Search
 ↓
switchMap
 ↓
API
 ↓
catchError
```

This prevents one request failure from unnecessarily killing the outer search interaction.



# CROSS QUESTIONS /  TRAPS

## Does `switchMap` always mean HTTP cancellation?

No.

More precisely:

> It unsubscribes from the previous inner Observable.

For Angular HttpClient, that can abort an in-flight client request.



## Does `shareReplay(1)` save data permanently?

No.

It is not:

```text
Database
localStorage
sessionStorage
```

It is RxJS sharing/replay behavior in application memory.



## Should we always use BehaviorSubject for state?

No.

Modern Angular Signals can often be simpler for synchronous UI state.

RxJS remains useful for stream-based problems.



## Should we unsubscribe every subscription?

No.

Understand the lifecycle of the Observable.

```text
HttpClient
→ normally completes

interval / WebSocket / valueChanges
→ potentially long-lived
```



## Is RxJS replaced by Signals?

No.

```text
Signals + RxJS
```

work well together.



# MOST IMPORTANT  CHEAT SHEET

```text
Transform value
→ map

Side effect
→ tap

Filter values
→ filter

Wait for typing to stop
→ debounceTime

Ignore same consecutive value
→ distinctUntilChanged


LATEST wins
→ switchMap

QUEUE / order
→ concatMap

PARALLEL
→ mergeMap

IGNORE while busy
→ exhaustMap


Wait for all to COMPLETE
→ forkJoin

React whenever ANY changes
→ combineLatest

Main stream triggers + get other latest value
→ withLatestFrom


Handle error
→ catchError

Try again
→ retry

Cleanup / loader reset
→ finalize


Share/replay result
→ shareReplay


Component destroyed
→ takeUntilDestroyed

Template subscription
→ AsyncPipe
```



# THE 4 QUESTIONS TO ASK BEFORE CHOOSING AN OPERATOR

Whenever an er gives a scenario, don't immediately guess an operator.

Ask yourself:

```text
1. Do I need only the LATEST?
   → switchMap

2. Must EVERYTHING happen IN ORDER?
   → concatMap

3. Can EVERYTHING happen IN PARALLEL?
   → mergeMap

4. Should NEW requests be IGNORED while busy?
   → exhaustMap
```

This solves many RxJS  scenarios.



# FINAL LEARNING PRIORITY

## 🔴 Must Know Deeply

```text
Observable
Subscription
Cold vs Hot

Subject
BehaviorSubject
ReplaySubject

map
filter
tap

debounceTime
distinctUntilChanged

switchMap
concatMap
mergeMap
exhaustMap

forkJoin
combineLatest

catchError
retry
finalize

shareReplay

AsyncPipe
takeUntilDestroyed

Nested subscription problems
Race conditions
RxJS vs Signals
```



## 🟡 Should Know

```text
of
from
interval
timer

take
takeUntil
startWith

withLatestFrom
zip

throttleTime

share
AsyncSubject
```



## 🟢 Awareness Is Enough Initially

```text
Schedulers
Advanced multicasting internals
ConnectableObservable
Custom operators
Complex marble testing
Advanced backpressure patterns
```



# One-Line Memory
```text
RxJS = values flowing over time.

Observable = gives values.
Subscriber = receives values.
Subject = I can also push values.

switchMap = latest.
concatMap = queue.
mergeMap = parallel.
exhaustMap = ignore while busy.

forkJoin = wait for everyone to finish.
combineLatest = react when anyone changes.

catchError = handle problem.
shareReplay = share and remember.
takeUntilDestroyed = stop when component dies.

Signals = current reactive state.
RxJS = streams/events over time.
```



#  Preparation Rule
Don't try to memorize 100 RxJS operators.
For a senior , focus on:

```text
What problem do I have?
        ↓
What stream behavior do I need?
        ↓
Which operator fits?
        ↓
Why this operator?
        ↓
What happens on error?
        ↓
What happens on destroy?
        ↓
Could requests overlap?
        ↓
Could data become stale?
```

That is more important than memorizing operator definitions.
