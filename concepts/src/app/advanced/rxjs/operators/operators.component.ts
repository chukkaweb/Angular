// https://rxjs.dev/guide/overview

// Operators are the essential pieces that allow complex asynchronous code to be easily composed in a declarative manner
// Operators are functions. There are two kinds of operators:
// Pipeable Operators are the kind that can be piped to Observables using the syntax observableInstance.pipe(operator)
// Operator factory functions include, filter(...), and mergeMap(...).
// When Pipeable Operators are called, they do not change the existing Observable instance.
// Instead, they return a new Observable, whose subscription logic is based on the first Observable.
//  A Pipeable Operator is essentially a pure function which takes one Observable as input and generates another Observable as output.
//  Subscribing to the output Observable will also subscribe to the input Observable.

//  creation operators are functions that can be used to create an Observable with some common predefined behavior or by joining other Observables.

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  distinct,
  distinctUntilChanged,
  filter,
  from,
  map,
  merge,
  Observable,
  of,
  take,
  tap,
  zip,
  pluck,
  catchError,
  forkJoin,
  concat,
  mergeMap,
  combineLatest,
  debounceTime,
  switchMap,
  timer,
  interval,
  defer,
  fromEvent,
} from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export class Person {
  name: string | undefined;
}

@Component({
  selector: 'app-operators',
  template: ` <p>operators works!</p> `,
})

export class OperatorsComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    // Categories of operators
    // Creation Operators
    // Join Creation Operators
    // Transformation Operators
    // Filtering Operators
    // Join Operators
    // Multicasting Operators
    // Error Handling Operators
    // Utility Operators
    // Conditional and Boolean Operators
    // Mathematical and Aggregate Operators

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.

    // Real-Time Use Case: Fetching a list of items from an API and processing them one by one.
}

  Great topic! Here are **real-time, simple examples** of
👉 `mergeMap`, `concatMap`, and `switchMap` (RxJS), with **use cases** 👇
https://www.linkedin.com/posts/kishor-dhokade_rxjs-angular-frontenddevelopment-activity-7418195345035313152-2vKO?utm_source=share&utm_medium=member_android&rcm=ACoAACuTRegBxXpHmDLzARonGNh0lhX9ZNhSdbg

## 🔹 1. `mergeMap` – Run all requests in parallel

### 🧠 Use Case:

User clicks multiple buttons → You want **all API calls** to run at the same time.

### ✅ Example:

```ts
from([1, 2, 3]).pipe(
  mergeMap(id => this.api.getUser(id))
).subscribe(console.log);
```

👉 All API calls happen **together**.
👉 Order is **not guaranteed**.


## 🔹 2. `concatMap` – Run requests one by one (in order)

### 🧠 Use Case:

Upload multiple files → Must upload **one after another**, not in parallel.

### ✅ Example:

```ts
from(files).pipe(
  concatMap(file => this.api.uploadFile(file))
).subscribe(console.log);
```

👉 Next upload starts **only after** previous finishes.
👉 Order is **maintained**.


## 🔹 3. `switchMap` – Cancel previous request and use the latest

### 🧠 Use Case:

Search input box → User types quickly → You only want the **latest search result**.

### ✅ Example:

```ts
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  switchMap(text => this.api.search(text))
).subscribe(console.log);
```

👉 Old API calls are **cancelled** when a new value comes.
👉 Only the **latest result** is processed.



## 🟢 Simple Comparison Table:

| Operator    | Behavior                | Real Example          |
| -- | -- |  |
| `mergeMap`  | Parallel requests       | Load multiple users   |
| `concatMap` | Sequential requests     | Upload files in order |
| `switchMap` | Cancel old, keep latest | Search box API        |

