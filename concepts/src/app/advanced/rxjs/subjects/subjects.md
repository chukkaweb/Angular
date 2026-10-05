# RxJS Subjects

## 1. What is a Subject?

Imagine a teacher making an announcement in a classroom:

```text
             → Student A
Teacher ──── → Student B
             → Student C
```

Teacher says:

```text
"Tomorrow is holiday!"
```

All students who are currently listening hear the same announcement.

This is similar to an RxJS `Subject`.

> A Subject is a special type of Observable that allows us to manually emit values and multicast those values to multiple subscribers.

---

# 2. Why Do We Use Subjects?

A common Angular use case is **sharing events/data between different parts of an application**.

Example:

```text
Component A
     ↓
Updates data
     ↓
   Service
  Subject
     ↓
Component B receives update
     ↓
Component C receives update
```

For example:

```text
Header Component
Product Component
Cart Component
```

Product component adds an item:

```text
Product Component
       ↓
   Cart Service
       ↓
    Subject
       ↓
Header Component
       ↓
Cart count updates
```

---

# 3. Important Subject Features

A Subject can:

```text
1. Emit values manually using next()

2. Have multiple subscribers

3. Send the same emitted value to current subscribers

4. Be used for multicasting

5. Work as both an Observable and an Observer
```

Basic syntax:

```ts
const subject =
  new Subject<number>();
```

Send data:

```ts
subject.next(10);
```

Receive data:

```ts
subject.subscribe(value => {
  console.log(value);
});
```

Easy memory:

```text
next()
↓
SEND


subscribe()
↓
RECEIVE
```

---

# 4. Observable vs Subject ⭐⭐⭐

This is an important interview question.

## Observable

Think:

```text
Netflix
```

Each subscriber can get their own execution.

```text
Subscriber A
     ↓
Execution A


Subscriber B
     ↓
Execution B
```

Many normal Observables are **cold**.

For example, Angular HTTP:

```ts
const users$ =
  this.http.get('/users');
```

Two subscriptions can cause:

```text
Subscriber A → HTTP Request 1

Subscriber B → HTTP Request 2
```

---

## Subject

Think:

```text
Live Cricket
```

One live source:

```text
               → Subscriber A
Subject ────── → Subscriber B
               → Subscriber C
```

Subscribers receive the same live emissions.

---

## Important Correction

Don't say:

> Observable cannot have multiple subscribers.

That's incorrect.

An Observable **can have multiple subscribers**.

The important difference is:

```text
Observable
→ normally values are produced by its producer
→ cold Observables may create separate execution per subscriber


Subject
→ multicast
→ values can be manually pushed using next()
→ current subscribers share those emissions
```

---

# 5. Subject Is Both Observer + Observable

This is another useful interview point.

## Observable Side

We can:

```ts
subject.subscribe(...)
```

## Observer Side

We can:

```ts
subject.next(...)
```

So:

```text
        Subject
       /       \
      /         \
 Observer       Observable
    ↓               ↓
 next()         subscribe()
```

Easy memory:

> Subject can both **receive/push values** and **send them to subscribers**.

---

# 6. Four Types of Subjects

Important types:

```text
Subject

BehaviorSubject

ReplaySubject

AsyncSubject
```

Easy memory:

```text
Subject
→ Remember nothing


BehaviorSubject
→ Remember current/latest value


ReplaySubject
→ Remember previous N values


AsyncSubject
→ Give final value after complete
```

---

# 7. `Subject` ⭐⭐⭐

## Simple Meaning

Imagine a teacher speaking in class.

Student A is already there.

Teacher says:

```text
1
```

Student A hears:

```text
1
```

Then Student B enters.

Teacher now says:

```text
2
```

Both hear:

```text
2
```

But Student B does NOT know about:

```text
1
```

because they weren't there earlier.

That's `Subject`.

---

# 8. Subject Example

```ts
import {
  Subject
} from 'rxjs';

const subject =
  new Subject<number>();

subject.subscribe(value => {
  console.log(
    'Observer 1:',
    value
  );
});

subject.next(1);

subject.subscribe(value => {
  console.log(
    'Observer 2:',
    value
  );
});

subject.next(2);
```

Output:

```text
Observer 1: 1

Observer 1: 2
Observer 2: 2
```

Notice:

```text
Observer 2
```

didn't receive:

```text
1
```

---

# 9. Subject Memory

```text
Subject remembers:

0 previous values
```

Flow:

```text
Subject emits 1
      ↓
Subscriber A receives 1


Subscriber B joins later
      ↓
Does NOT receive 1


Subject emits 2
      ↓
A receives 2
B receives 2
```

---

# 10. When to Use Subject?

Good for:

```text
Events

Notifications

Triggering actions

Communication through a service

Cases where previous value isn't required
```

Example:

```text
Refresh button clicked
      ↓
Subject
      ↓
Other component refreshes
```

---

# 11. `BehaviorSubject` ⭐⭐⭐

## Simple Meaning

Imagine a classroom whiteboard.

It currently says:

```text
Today's topic:

Angular
```

A new student enters late.

They immediately see:

```text
Angular
```

They don't need to wait for the teacher to say it again.

That's `BehaviorSubject`.

> BehaviorSubject always has a current value and immediately gives that latest value to a new subscriber.

---

# 12. BehaviorSubject Requires Initial Value

Example:

```ts
const subject =
  new BehaviorSubject<number>(0);
```

Here:

```text
0
```

is the initial value.

---

# 13. BehaviorSubject Example

```ts
import {
  BehaviorSubject
} from 'rxjs';

const subject =
  new BehaviorSubject<number>(0);

subject.subscribe(value => {
  console.log(
    'Observer 1:',
    value
  );
});

subject.next(1);

subject.subscribe(value => {
  console.log(
    'Observer 2:',
    value
  );
});

subject.next(2);
```

Output:

```text
Observer 1: 0

Observer 1: 1

Observer 2: 1

Observer 1: 2
Observer 2: 2
```

Why does Observer 2 immediately receive:

```text
1
```

?

Because `1` is the current/latest value.

---

# 14. BehaviorSubject Flow

```text
Initial value = 0

Subscriber A joins
↓
Gets 0


next(1)
↓
A gets 1


Subscriber B joins
↓
Immediately gets latest value 1


next(2)
↓
A gets 2
B gets 2
```

---

# 15. When to Use BehaviorSubject?

Historically/common RxJS use cases:

```text
Current logged-in user

Current selected item

Current theme

Cart count

Current application state

Current filter value
```

Example:

```text
Cart count = 5
```

New component loads.

It immediately needs:

```text
5
```

BehaviorSubject can provide that current value.

---

# 16. `Subject` vs `BehaviorSubject` ⭐⭐⭐

This is a very common interview question.

## Subject

```text
No initial value

Doesn't remember previous value

New subscriber waits for next emission
```

---

## BehaviorSubject

```text
Requires initial value

Keeps current/latest value

New subscriber immediately receives latest value
```

---

## Example

Subject:

```text
next(10)

New subscriber joins

→ receives nothing yet
```

BehaviorSubject:

```text
next(10)

New subscriber joins

→ immediately receives 10
```

---

# 17. Easy Memory

```text
Subject
→ Live announcement


BehaviorSubject
→ Whiteboard showing current value
```

---

# 18. `ReplaySubject` ⭐⭐⭐

## Simple Meaning

Imagine a teacher keeps the last two announcements.

Teacher says:

```text
1
2
3
```

A new student enters.

Teacher repeats the last two:

```text
2
3
```

That's `ReplaySubject`.

---

# 19. ReplaySubject Example

```ts
import {
  ReplaySubject
} from 'rxjs';

const subject =
  new ReplaySubject<number>(2);

subject.subscribe(value => {
  console.log(
    'Observer 1:',
    value
  );
});

subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe(value => {
  console.log(
    'Observer 2:',
    value
  );
});

subject.next(4);
```

Observer 2 immediately gets:

```text
2
3
```

Then both receive:

```text
4
```

---

# 20. Why Only `2` and `3`?

Because:

```ts
new ReplaySubject<number>(2)
```

means:

```text
Buffer size = 2
```

It remembers the last:

```text
2 values
```

Before Observer 2 joined:

```text
1
2
3
```

Last two are:

```text
2
3
```

---

# 21. ReplaySubject Flow

```text
Buffer = 2

next(1)
next(2)
next(3)

Memory:
[2, 3]

New Subscriber
      ↓
Immediately receives

2
3
```

Then:

```text
next(4)
```

Both current subscribers receive:

```text
4
```

and the replay buffer becomes:

```text
[3, 4]
```

---

# 22. When to Use ReplaySubject?

Use when a new subscriber needs **multiple previous values**.

Examples:

```text
Recent notifications

Recent events

Small history of values

Replay previous states/events
```

Be careful with large/unbounded replay buffers because they can retain many values in memory.

---

# 23. BehaviorSubject vs ReplaySubject ⭐⭐⭐

## BehaviorSubject

Think:

```text
Current score
```

Example:

```text
India = 250
```

New subscriber needs current score.

---

## ReplaySubject

Think:

```text
Last few scores/events

230
240
250
```

New subscriber needs history.

---

## Comparison

| Feature | BehaviorSubject | ReplaySubject |
|---|---|---|
| Initial value | Required | Not required |
| Remembers | Current/latest value | Configured previous values |
| New subscriber | Gets latest value | Gets buffered values |
| Best use | Current state | Recent history |

---

# 24. `AsyncSubject` ⭐

## Simple Meaning

Imagine a running race.

During the race:

```text
Ganesh leading

Ravi leading

John leading
```

But you don't announce anything yet.

Race finishes.

Final winner:

```text
John
```

Now you announce only:

```text
John
```

That's `AsyncSubject`.

> AsyncSubject emits only the last value when the Subject completes.

---

# 25. AsyncSubject Example

```ts
import {
  AsyncSubject
} from 'rxjs';

const subject =
  new AsyncSubject<number>();

subject.subscribe(value => {
  console.log(
    'Observer 1:',
    value
  );
});

subject.next(1);
subject.next(2);

subject.subscribe(value => {
  console.log(
    'Observer 2:',
    value
  );
});

subject.next(3);

subject.complete();
```

Before:

```ts
subject.complete();
```

Output:

```text
Nothing
```

After completion:

```text
Observer 1: 3
Observer 2: 3
```

---

# 26. AsyncSubject Flow

```text
next(1)
   ↓
Remember 1


next(2)
   ↓
Replace with 2


next(3)
   ↓
Replace with 3


complete()
   ↓
Emit 3
```

Easy memory:

```text
AsyncSubject
→ LAST VALUE
→ ONLY AFTER COMPLETE
```

---

# 27. Four Subjects Comparison ⭐⭐⭐

| Type | Initial Value | Remembers | New Subscriber Gets | When It Emits |
|---|---|---|---|---|
| `Subject` | No | Nothing | Future values only | Immediately on `next()` |
| `BehaviorSubject` | Yes | Latest/current | Latest value | Immediately |
| `ReplaySubject` | No | Previous N values | Buffered values | Immediately/replays |
| `AsyncSubject` | No | Last value | Final value | On completion |

---

# 28. Child-Simple Memory ⭐⭐⭐

## Subject

Teacher announcement:

```text
If you are present
→ you hear it
```

---

## BehaviorSubject

Whiteboard:

```text
Come late
→ see current value
```

---

## ReplaySubject

Recorded announcements:

```text
Come late
→ hear previous N announcements
```

---

## AsyncSubject

Race result:

```text
Wait until race finishes
→ get final winner
```

---

# 29. Angular Data Sharing with Subject

One common pattern is using a service.

Why service?

Because an Angular service provided at an appropriate shared scope can provide a shared service instance to components.

```text
Component A
      ↓
Shared Service
      ↓
Component B
```

---

# 30. Basic Angular Service Example

```ts
import {
  Injectable
} from '@angular/core';

import {
  Subject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSubject =
    new Subject<string>();

  message$ =
    this.messageSubject.asObservable();

  sendMessage(message: string) {
    this.messageSubject.next(message);
  }

}
```

Component A:

```ts
this.messageService
  .sendMessage('Hello');
```

Component B:

```ts
this.messageService
  .message$
  .subscribe(message => {

    console.log(message);

  });
```

Flow:

```text
Component A
    ↓
sendMessage()
    ↓
Subject.next()
    ↓
Service
    ↓
message$
    ↓
Component B
```

---

# 31. Why Use `asObservable()`? ⭐⭐⭐

Notice:

```ts
private messageSubject =
  new Subject<string>();

message$ =
  this.messageSubject.asObservable();
```

Why not expose the Subject directly?

Because if we expose:

```ts
public subject
```

another component could do:

```ts
subject.next(...)
```

from anywhere.

That gives too much control.

Better:

```text
Service
↓
Owns Subject
↓
Can call next()


Components
↓
Receive Observable
↓
Can subscribe
```

This is a common encapsulation pattern.

---

# 32. BehaviorSubject Angular Example

Suppose we need current cart count.

```ts
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartCountSubject =
    new BehaviorSubject<number>(0);

  cartCount$ =
    this.cartCountSubject.asObservable();

  updateCartCount(count: number) {

    this.cartCountSubject.next(count);

  }

}
```

Header component:

```ts
cartCount$ =
  this.cartService.cartCount$;
```

Template:

```html
{{ cartCount$ | async }}
```

Flow:

```text
Product Component
       ↓
updateCartCount(5)
       ↓
BehaviorSubject
       ↓
Current value = 5
       ↓
Header receives 5
```

---

# 33. Subject vs EventEmitter / Angular Output ⭐⭐⭐

Important interview question.

For parent-child component communication:

```text
Child
↓
Parent
```

prefer Angular output APIs.

Example conceptually:

```text
output()
```

For general RxJS streams/service communication:

```text
Subject
```

### Easy Rule

```text
Component output
→ Angular output API


General RxJS event stream
→ Subject
```

Don't use `EventEmitter` as a general service-level state management replacement.

---

# 34. BehaviorSubject vs Signal ⭐⭐⭐

Very important for modern Angular interviews.

Both can represent current state.

## BehaviorSubject

```text
RxJS
↓
Observable stream
↓
subscribe / operators
```

Example:

```ts
const count$ =
  new BehaviorSubject(0);
```

---

## Signal

```text
Angular reactive state
↓
Read current value directly
```

Example:

```ts
const count =
  signal(0);
```

---

# 35. When to Use Signal?

For simple synchronous Angular UI state:

```text
Selected tab

Counter

Show/hide

Current UI state

Derived UI values
```

Signal may be simpler.

---

# 36. When to Use BehaviorSubject / RxJS?

When the state is part of a larger RxJS stream or needs operators such as:

```text
switchMap

debounceTime

combineLatest

retry

catchError

WebSocket/event composition
```

RxJS remains useful.

---

# 37. Does Signal Replace BehaviorSubject?

Not completely.

Good interview answer:

> For simple synchronous UI state in modern Angular, I often prefer Signals. BehaviorSubject is still useful when the state is naturally part of an RxJS stream or needs RxJS operators and stream composition.

---

# 38. Subject vs BehaviorSubject – Scenario

Requirement:

```text
Button clicked
↓
Notify another component
```

We don't care about old clicks.

Use:

```text
Subject
```

---

Requirement:

```text
Current logged-in user
```

A new component should immediately know the current user.

Use:

```text
BehaviorSubject
```

or consider a Signal for modern synchronous Angular state depending on architecture.

---

# 39. ReplaySubject Scenario

Requirement:

New subscriber should receive:

```text
Last 3 notifications
```

Use:

```ts
new ReplaySubject(3);
```

---

# 40. AsyncSubject Scenario

Requirement:

Many values may occur:

```text
10
20
30
40
```

But subscribers only need:

```text
40
```

after completion.

Use:

```text
AsyncSubject
```

This is less common in normal Angular application code.

---

# 41. Senior Interview Questions

## Q1. What is a Subject?

> A Subject is a special RxJS Observable that supports multicasting and allows values to be pushed manually using `next()`.

---

## Q2. Why do we use Subject?

Common reasons:

```text
Event communication

Multicasting

Sharing emissions

Service-based communication

Manually pushing values
```

---

## Q3. Observable vs Subject?

### Observable

```text
Can have multiple subscribers

Cold Observables may create
independent execution per subscriber
```

### Subject

```text
Multicast

Same emission shared with
current subscribers

Can manually call next()
```

---

## Q4. Subject vs BehaviorSubject?

```text
Subject
→ no current value
→ new subscriber waits


BehaviorSubject
→ has current/latest value
→ new subscriber gets it immediately
```

---

## Q5. BehaviorSubject vs ReplaySubject?

```text
BehaviorSubject
→ current/latest value


ReplaySubject
→ configured number of previous values
```

---

## Q6. What does AsyncSubject do?

> It emits its last value to subscribers only when it completes.

---

## Q7. Why create Subject inside a service?

Because multiple components can communicate through a shared service instance.

```text
Component A
      ↓
Service
      ↓
Component B
```

The exact lifetime depends on where the service is provided.

---

## Q8. Why keep Subject private?

To prevent outside components from calling:

```ts
next()
```

directly.

Expose:

```ts
asObservable()
```

for read-only subscription access.

---

## Q9. Can an Observable have multiple subscribers?

Yes.

This is an important correction.

The distinction is not:

```text
Observable = one subscriber ❌
Subject = many subscribers ✅
```

Instead:

```text
Cold Observable
→ each subscriber may get independent execution


Subject
→ multicast same emissions to current subscribers
```

---

## Q10. Does Subject store old values?

No.

Normal Subject:

```text
remembers 0 values
```

Use:

```text
BehaviorSubject
```

for latest/current value.

Use:

```text
ReplaySubject
```

for multiple previous values.

---

# 42. Cross Questions / Interview Traps

## New subscriber needs current value?

```text
BehaviorSubject
```

---

## New subscriber needs last 3 values?

```text
ReplaySubject(3)
```

---

## Only current subscribers should receive future events?

```text
Subject
```

---

## Only final value after completion?

```text
AsyncSubject
```

---

## Simple Angular UI state?

Consider:

```text
Signal
```

---

## Complex async/event stream?

Consider:

```text
RxJS
```

---

# 43. Common Mistakes ⭐⭐⭐

### Mistake 1

Saying:

```text
Observable cannot have multiple subscribers.
```

❌ Incorrect.

---

### Mistake 2

Using BehaviorSubject for every state.

Not always necessary.

Modern Angular Signals may be simpler for synchronous UI state.

---

### Mistake 3

Making Subject public.

Avoid:

```ts
subject =
  new Subject();
```

when external code shouldn't control emissions.

Prefer:

```ts
private subject =
  new Subject();

public data$ =
  this.subject.asObservable();
```

---

### Mistake 4

Using ReplaySubject with an unnecessarily huge/unbounded buffer.

That can retain too much data.

---

### Mistake 5

Forgetting subscription cleanup.

Long-lived Subject subscriptions can remain active if their lifecycle isn't handled correctly.

Consider:

```text
AsyncPipe

takeUntilDestroyed()
```

where appropriate.

---

# 44. Quick Comparison ⭐⭐⭐

```text
Subject
↓
I remember NOTHING.


BehaviorSubject
↓
I remember CURRENT value.


ReplaySubject
↓
I remember PREVIOUS N values.


AsyncSubject
↓
I remember LAST value,
but give it only after COMPLETE.
```

---

# 45. Interview Priority

## 🔴 Must Know Deeply

```text
Subject

BehaviorSubject

Subject vs Observable

Subject vs BehaviorSubject

BehaviorSubject vs Signal

Service data sharing

Multicasting

next() vs subscribe()

asObservable()
```

---

## 🟡 Should Know

```text
ReplaySubject

ReplaySubject vs BehaviorSubject

Subscription lifecycle
```

---

## 🟢 Awareness Is Enough

```text
AsyncSubject
```

Don't spend too much interview-preparation time on `AsyncSubject`.

---

# 46. Final 30-Second Revision

```text
                   SUBJECTS
                      │
       ┌──────────────┼───────────────┐
       │              │               │
       ▼              ▼               ▼

    Subject      BehaviorSubject   ReplaySubject
       │              │               │
 Remembers 0      Latest 1        Previous N
       │              │               │
   Events         Current state      History


                 AsyncSubject
                      │
                Last value only
                      │
                 On complete
```

---

# 47. One-Line Memory

> **Subject = live event, BehaviorSubject = current value, ReplaySubject = history, AsyncSubject = final value after completion.**

---

# 48. Best Senior-Level Answer

If interviewer asks:

### "How do you share data between Angular components using RxJS?"

You can answer:

> I can create a Subject or BehaviorSubject in a shared service and expose it as an Observable. Components can subscribe to that Observable, while the service controls updates through `next()`. I use Subject when I only need future events and BehaviorSubject when new subscribers also need the current value. In modern Angular, for simple synchronous UI state, I also consider Signals instead of automatically using BehaviorSubject.

That answer covers:

```text
RxJS
+
Angular architecture
+
Encapsulation
+
Subject vs BehaviorSubject
+
Modern Signals
```
