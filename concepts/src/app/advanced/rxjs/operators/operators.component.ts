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

    // Creation Operators 
    // from interval, of , range, timer
    // from 
    // Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.
    // interval
    // Creates an Observable that emits sequential numbers every specified interval of time, on a specified SchedulerLike.

    // of
    // Converts the arguments to an observable sequence
    // Use Case: Emits the arguments provided to it as separate values. Useful for creating simple streams of static data
    // converting an object to observable
    //  converting it to an observable allows you to handle state changes reactively
    const person = {
      name: 'Ganesh chukka',
    };
    const personObs = of(person);
    personObs.subscribe((data) => console.log('object to observable : ', data));

    //converting a string to observable
    const strObs: Observable<string> = of('chukka');
    strObs.subscribe((data) => console.log('string to observable : ', data));

    // Emitting a series of status messages
    const status$ = of('Loading', 'Success', 'Error');
    status$.subscribe(status => console.log(status));
    // Output: "Loading" "Success" "Error"
    // Real-Time Use Case: Emitting a sequence of UI status messages or configurations.


    // from operator 
    // used to convert array and promises to observables
    // Use Case: Converts an array, promise, or iterable into an observable stream. 
    // Useful when you need to process items from an array or handle promises in a reactive way.

    // Converting an array of user names to an observable stream.
    const users = ['Alice', 'Bob', 'Charlie'];
    const users$ = from(users);

    users$.subscribe(user => console.log(user));
    // Output: "Alice" "Bob" "Charlie"

    const personPromise = Promise.resolve(person);
    const prmsObs = from(personPromise);
    prmsObs.subscribe((data) => console.log('promises to observable : ', data));
    // Real-Time Use Case: Fetching a list of items from an API and processing them one by one.

    // range
    // Creates an Observable that emits a sequence of numbers within a specified range. 
    // range(1,10) o/p 1,2,3,4...10

    // interval Operator
    // Use Case: Creates an observable that emits a sequence of numbers at specified time intervals. 
    // Useful for periodic updates like polling or countdowns.
    // ex
    const interval$ = interval(1000);
    interval$.subscribe(count => console.log(count));
    // Output: 0, 1, 2, 3, ... (every second)
    // Real-Time Use Case: Implementing a timer or periodic polling of data from an API.

    // timer
    // Use Case: Emitting a value after a delay or at regular intervals.
    // Used to emit a notification after a delay.
    // Example: Displaying a message after a few seconds or triggering periodic tasks.
    // Ex
    // Wait 3 seconds and start another observable
    // You might want to use timer to delay subscription to an observable by a set amount of time.
    // Here we use a timer with concatMapTo or concatMap in order to wait a few seconds and start a subscription to a source.

    const source$ = of(1, 2, 3);
    timer(3000)
      .pipe(concatMap(() => source$))
      .subscribe(console.log);

    // limitations : The asyncScheduler uses setTimeout which has limitations for how far in the future it can be scheduled

    // throwError
    // Use Case: Emitting an error.
    // Example: Simulating or handling errors in a stream for testing purposes.

    // defer
    // Use Case: Deferring the creation of an observable until subscription time.
    // Example: Fetching fresh data each time a user performs an action.
    // Scenario: Fetching fresh data from an API every time a user clicks a button, ensuring the data is not cached and is up-to-date.
    // Explanation:
    // defer` allows the creation of a new observable at the time of subscription. 
    // This is useful when you want to ensure that fresh data is fetched every time the observable is subscribed to, instead of reusing a potentially stale observable.
    // API call function
    const fetchData = () => ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1');
    // Observable created with defer
    const fetchDataObservable = defer(fetchData);
    // Button click event
    const button$ = document.getElementById('fetchButton');
    fromEvent(button$, 'click')
      .pipe(
        switchMap(() => fetchDataObservable) // Switch to the new observable on each click
      )
      .subscribe(
        data => console.log('Fetched Data:', data),
        error => console.error('Error:', error)
      );


    // Real-Time Use Case:
    // - Use Case: In a real-time application, users may need to refresh data by clicking a button. 
    // Using `defer` ensures that each click triggers a fresh API call, fetching the most recent data instead of using a cached observable that might return stale information.
    // Steps:
    // 1. Button Click: User clicks a button to fetch data.
    // 2. `defer`: Ensures a new API call is made each time the button is clicked.
    // 3. Fresh Data: Each subscription triggers a new, fresh data fetch, ensuring the user always sees the latest information.


    // Join Creation Operators

    // =======`combineLatest()` in RxJS

    // `combineLatest()` is a function ( previously it operator(deprecated)) that combines multiple observables and emits the latest values from each observable whenever any of them emits a new value.
    //  It waits for all observables to emit at least one value before emitting the first combined set of values.
    // if any Observable errors, combineLatest will error immediately as well, and all other Observables will be unsubscribed
    // if some input Observable does not emit any value and never completes,combineLatest will also never emit and never complete, since, again, it will wait for all streams to emit some value.
    // whenever any Observable emits, collecting an array of the most recent values from each Observable.
    // So if you pass n Observables to this operator, the returned Observable will always emit an array of n values, in an order corresponding to the order of the passed Observables (the value from the first Observable will be at index 0 of the array and so on).
    // Simple Steps to Use `combineLatest()`
    // 1. Import `combineLatest`: Import the function from `rxjs`.
    // 2. Provide Observables: Pass the observables you want to combine as arguments to `combineLatest`.
    // 3. Subscribe: Subscribe to the combined observable to receive the emitted values.

    // Example1
    testCombineLatest() {
      const obs1$ = of(1, 2, 3).pipe(delay(1000));
      const obs2$ = of('1', '2', '3');
      const obs3$ = of('a', 'b', 'c', 'd', 'e', 'f');
      const combined$ = combineLatest([obs1$, obs2$, obs3$]);
      combined$.subscribe((values) => {
        console.log(values);
      });
    }
    // example2
    // const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
    //     const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
    //     const combinedTimers = combineLatest([firstTimer, secondTimer]);
    //     combinedTimers.subscribe((value) => console.log(value));
    // Example 3
    // const names$ = of('Alice', 'Bob', 'Charlie').pipe(delay(1000)); // Emits names with a delay
    // const ages$ = of(25, 30, 35).pipe(delay(2000)); // Emits ages with a delay


    //  #Step 3: Combine Observables

    // const combined$ = combineLatest([this.names$, this.ages$]);
    // #Step 4: Subscribe to Combined Observable
    // combined$.subscribe(([name$, age$]:any) => {
    //   console.log(`Name: ${name$}, Age: ${age$}`);
    // });
    // Output
    // Name: Alice, Age: 25
    // Name: Bob, Age: 30
    // Name: Charlie, Age: 35

    // Explanation:
    // 1. Observables: `names$` and `ages$` emit strings and numbers respectively.
    // 2. combineLatest: Combines the latest values from both observables.
    // 3. Subscription: The combined observable emits an array of the latest values from each input observable whenever either of them emits a new value.

    // Key Points:
    // Waits for all observables: `combineLatest` waits until all input observables have emitted at least one value before emitting the first combined result.
    // Emits whenever any observable emits: After the initial emission, it emits new combined values whenever any of the input observables emits a new value.
    // Order of emissions matters: The order in the array passed to `combineLatest` determines the order of the emitted values in the combined array.

    // This method is useful for scenarios where you need to work with the most recent values from multiple sources together, such as combining user input fields or synchronizing data streams.

    // `concat()` in RxJS
    // `concat()` is a function that concatenates multiple observables and emits values sequentially, one after the other.
    // It waits for each observable to complete before moving on to the next.
    // You can pass either an array of Observables, or put them directly as arguments.
    // Passing an empty array will result in Observable that completes immediately.
    // concat will subscribe to first input Observable and emit all its values, without changing or affecting them in any way. When that Observable completes
    // Simple Points about `concat()`:
    // 1. Sequential Execution: It subscribes to the next observable only after the current one completes.
    // 2. Order Preservation: Emits all values from the first observable, then from the second, and so on, preserving the order of observables.
    // 3. Completion Requirement: Each observable must complete before moving on to the next.
    // 4. Use Case: Best when you need to execute observables in sequence, such as processing tasks that depend on the previous task's completion.

    testConcat() {
      const obs1$ = of(1, 2, 3, 4, 5, 6, 7);
      const obs2$ = new Observable((obs) => {
        obs.next(1);
        obs.next(1); // until here obs1$ will get output, because all observable will complete
        obs.complete(); // once it is will execute all obs
      });
      const obs3$ = of('a', 'b', 'c', 'd', 'e', 'f');
      const combined$ = concat(obs1$, obs2$, obs3$); // not using array 
      combined$.subscribe((values) => {
        console.log(values);
      });
    }

    // `forkJoin()` in RxJS
    // `forkJoin()` is a function that combines multiple observables and emits a single array containing the last values from each observable once all observables complete.
    // Simple Points about `forkJoin()`:
    // 1. Completion Requirement: It waits for all observables to complete and emits the last emitted value from each observable as an array.
    // 2. Single Emission: It emits only once, after all observables have completed.
    // 3. Error Handling: If any observable errors out, `forkJoin` will not emit any values and will propagate the error.
    // 4. Use Case: Best for combining results of multiple HTTP requests that depend on each other and should be processed together once all are completed.

    // Example:

    testForkJoin() {
      const observable = forkJoin({
        foo: of(1, 2, 3, 4),
        bar: Promise.resolve(8),
        baz: timer(4000)
      });
      observable.subscribe({
        next: value => console.log(value),
        complete: () => console.log('This is how it ends!'),
      });

      const obs1$ = of(1, 2, 3, 4, 5, 6, 7);
      const obs2$ = new Observable((obs) => {
        obs.next(1);
        obs.next(1);
        obs.complete();
      });
      const obs3$ = of('a', 'b', 'c', 'd', 'e', 'f');
      const combinded$ = forkJoin([obs1$, obs2$, obs3$]);
      combinded$.subscribe((values) => {
        console.log(values);
      });
    }

    // Difference between `concat()`, `combineLatest()`, and `forkJoin()`:

    // | Feature                | `concat()`                                                 | `combineLatest()`                                              | `forkJoin()`                                                |
    // |------------------------|------------------------------------------------------------|----------------------------------------------------------------|-------------------------------------------------------------|
    // Emission Timing     | Emits values sequentially, waiting for each observable to complete before starting the next. | Emits whenever any of the observables emits a new value.       | Emits only once when all observables complete.               |
    // Emission Values     | Emits all values from the first observable, then all from the next, in sequence. | Emits the latest values from all observables as soon as all have emitted at least once. | Emits the last values from all observables upon completion.  |
    // Frequency of Emission | Emits multiple times, sequentially for each observable.    | Can emit multiple times as inputs change.                      | Emits only once, at the end.                                 |
    // Dependency          | Observables are processed one after another.                | Waits for all observables to emit at least once, then emits on any new value from any observable. | Waits for all observables to complete, then emits a single value. |
    // Use Case            | Ideal for scenarios where you need to execute tasks one after another in sequence. | Ideal for real-time data updates, such as combining UI inputs or streaming data. | Ideal for scenarios where you need final results from multiple asynchronous operations, like completing all HTTP requests before processing. |

    // Summary:
    // concat()`: Use when you need to run observables in sequence, emitting all values from one before starting the next.
    // combineLatest()`: Use when you need to combine the latest values from multiple observables and get updates whenever any emits.
    // forkJoin()`: Use when you need to wait for all observables to complete and get their last emitted values together.

    // merge
    // used to merge multiple observables into a single observable
    // merge the observables as soon as they are emitted.
    // not wait for the previous observable to complete
    // merge the observables in parallel
    // merge the observables in the order they are passed.


    const obs1 = from([1, 2, 3, 4]);
    const obs2 = from([5, 6, 7, 8]);

    const combineObs = merge(obs1, obs2);
    combineObs.subscribe((data) => console.log('merged : ', data)); // 0/p [1, 2, 3, 4,5, 6, 7, 8]

    // zip operator : zip operator is used to combine multiple observables into a single observable
    // zip operator will combine the observables in a sequence

    // Example 1
    const age$ = of(27, 25, 29);
    const name$ = of('Foo', 'Bar', 'Beer');
    const isDev$ = of(true, true, false);
    zip(age$, name$, isDev$)
      .pipe(map(([age, name, isDev]) => ({ age, name, isDev })))
      .subscribe((x) => console.log(x));

    // Outputs
    // { age: 27, name: 'Foo', isDev: true }
    // { age: 25, name: 'Bar', isDev: true }
    // { age: 29, name: 'Beer', isDev: false }

    const zipObs = zip(obs1, obs2);
    zipObs.subscribe((data) => console.log('zip : ', data)); // [1,5],[2,6],[3,7].[4,8]


    // | Feature                | `merge`                                         | `concat`                                       | `zip`                                          |
    // |------------------------|-------------------------------------------------|------------------------------------------------|------------------------------------------------|
    // | Emissions              | Concurrent (emits as data is available)         | Sequential (waits for each observable to complete) | Paired (emits combined values as tuples)     |
    // | Order                  | No guarantee of order                           | Preserves the order                            | Emits in pairs based on the order of emissions |
    // | Completion             | Completes when all observables complete         | Completes after the last observable finishes   | Completes when the shortest observable completes|
    // | Combining Logic        | Emits values from all sources independently     | Emits all values from one source before the next | Combines values based on position (index)   |
    // | Use Case               | When you need data as soon as possible          | When order of execution is crucial             | When you need related data from multiple sources|
    // | Example                | `merge(obs1, obs2)`                             | `concat(obs1, obs2)`                           | `zip(obs1, obs2)`                             |
    // | Output Example         | `1, 4, 2, 5, 3, 6` (order may vary)             | `1, 2, 3, 4, 5, 6` (order is preserved)        | `[1, 4], [2, 5], [3, 6]`                      |
    // | Parallel Execution     | Yes, all observables emit independently         | No, waits for each observable in sequence      | Yes, emits paired values simultaneously      |

    // Example Scenarios:
    // merge`: Handling multiple asynchronous events like API calls or user inputs.
    // concat`: Executing multiple dependent tasks in sequence.
    // zip`: Combining related datasets, such as merging user IDs with corresponding user details.


    // Transformation Operators:
    //2.) map , pluck  & tap operator
    // map operator  used to manipulate the data emitted by an observable.
    //  does not change the actual data emitted by an observable.
    // creates a new observable with the manipulated data.
    // Use Case: Transforming data emitted by an observable into a different format.
    // Example: Converting a list of numbers to their squared
    // Example: Mapping a list of user objects to their names.
    // Example: Converting a list of strings to uppercase.
    // Example: Extracting a specific property from an object.

    const mapObservable = from([1, 2, 3]).pipe(map((value) => value * 2));
    mapObservable.subscribe((data) =>
      console.log('maniplated map data : ', data)
    );

    const source = of('ganesh');
    source
      .pipe(map((data) => data.toUpperCase()))
      .subscribe((data) => console.log('mapped object', data));



    // pluck operator : pluck operator is used to extract a particular property from an object.
    const pluckObservable = from([
      { name: 'Ganesh', id: 123 },
      { name: 'Chukka', id: 456 },
    ]).pipe(pluck('name'));
    pluckObservable.subscribe((data) => console.log('pluck method : ', data));

    // tap operator 
    //     The `tap` operator in RxJS is used for side effects — it allows you to observe the emissions of an observable without modifying the emitted values.
    // It is commonly used for logging, debugging, or triggering side effects like API calls, without affecting the data flow.
    // Key Points:
    //     Purpose: Performs side effects, like logging or updating variables, but does not change the stream.
    //       Non - invasive: It does not alter the emitted values of the observable.
    // Common Use: Debugging, logging, or triggering actions that are not part of the data flow.

    const observable = of(1, 2, 3, 4);
    observable.pipe(
      tap(value => console.log('Before modification:', value))  // Log before value is emitted
    )
      .subscribe(value => console.log('Received value:', value));  // Actual consumption of value
    //     Output
    // Before modification: 1
    // Received value: 1
    // Before modification: 2
    // Received value: 2
    // Before modification: 3
    // Received value: 3
    // Before modification: 4
    // Received value: 4

    //     Explanation:
    //     tap` logs each value before it’s received by the subscriber.
    // subscribe` logs the actual received values.
    // No modification happens to the emitted values.

    // When to Use:
    //     - Logging values for debugging.
    // - Triggering side effects like tracking analytics, sending requests, etc., without affecting the observable data flow.

    // Transformation Operators
    //     mergeMap

    // The mergeMap` operator in RxJS is used to transform each emitted value into a new observable and then merge all the resulting observables into a single observable stream.

    // - It maps each value to an observable (could be any asynchronous operation) and merges those observables' emissions into one.
    // mergeMap` does this in parallel, meaning it does not wait for one observable to complete before subscribing to the next one.

    // Key Points:
    // Purpose: Maps values to observables and merges their emissions.
    // Asynchronous Handling: Works well for parallel asynchronous tasks.
    // Order: The order of emissions may not be preserved.
    // Example function that returns an observable (simulating async operation)
    function fetchData(value: number) {
      return of(`Data for value: ${value}`); // Simulating async data fetching
    }

    const observable3 = of(1, 2, 3);

    observable3.pipe(
      mergeMap(value => fetchData(value))  // Maps each emitted value to an observable
    )
      .subscribe(result => console.log(result));  // Outputs the results


    // Output:
    // Data for value: 1
    // Data for value: 2
    // Data for value: 3

    // Explanation:
    // 1. of(1, 2, 3)`: Emits values `1`, `2`, and `3`.
    // 2. mergeMap(fetchData)`: For each emitted value (`1`, `2`, `3`), it calls the `fetchData` function, which returns an observable. These observables are merged into one stream.
    // 3. subscribe`: The merged result is logged as the final output.

    // When to Use:
    // Parallel asynchronous operations: When you need to start multiple operations at the same time, like making several HTTP requests concurrently.
    // When the result is an observable: If your transformations or side effects return observables and you need them all to merge into one stream.


    // switchMap

    // The switchMap` operator in RxJS is used to map each emitted value to a new observable. However, unlike mergeMap`, switchMap` switches to the most recent observable and cancels any previous ones that are still running.

    // Purpose: Maps emitted values to observables but only keeps the latest observable active. If a new value is emitted, it cancels the previous one.
    // Use Case: Great for scenarios where only the latest value matters, such as when handling user input (e.g., search suggestions), where earlier requests are no longer relevant once a new input comes in.

    // Key Points:
    // Cancels previous emissions: Only the latest emitted observable is kept active.
    // Keeps the latest observable active: When a new value arrives, the previous observable is discarded.
    // Order: The order of emissions is based on the most recent emission.

    // Example:

    // Example function that returns an observable (simulating async operation)
    function fetchData(value: number) {
      return of(`Data for value: ${value}`); // Simulating async data fetching
    }

    const observable = of(1, 2, 3);

    observable.pipe(
      switchMap(value => fetchData(value))  // Switches to the latest observable
    )
      .subscribe(result => console.log(result));  // Outputs the results


    // Output:
    // Data for value: 3
    // Explanation:
    // 1. of(1, 2, 3)`: Emits values `1`, `2`, and `3`.
    // 2. switchMap(fetchData)`: Each emitted value is mapped to the `fetchData` function, which returns an observable. However, if a new value arrives, any previously active observable is cancelled.
    // 3. subscribe`: The result from the most recent observable is logged. In this case, only the result for `3` is shown because the previous observables were cancelled when `3` was emitted.

    // When to Use:
    // Search input or typeahead: When handling user input, such as a search field, where previous search results are irrelevant once the user starts typing a new query.
    // Canceling previous requests: When making API calls where only the latest response is relevant, and previous ones should be canceled.

    // Comparison with `mergeMap`:
    // mergeMap`: All observables are executed concurrently, and their emissions are merged.
    // switchMap`: Only the most recent observable is active; previous ones are canceled.



    concatMap

    // The concatMap` operator in RxJS is used to map each emitted value to an observable and then concatenate all the resulting observables into a single observable.
    //  Unlike mergeMap`, concatMap` waits for each observable to complete before moving on to the next one, maintaining the order of emissions.

    // Purpose: Maps values to observables and concatenates them one after another, ensuring that each observable completes before starting the next one.
    // Use Case: Useful when you need to handle sequential operations where each step must wait for the previous one to complete, such as making HTTP requests that depend on each other.

    // Key Points:
    // Sequential execution: Waits for one observable to complete before moving to the next.
    // Order is preserved: Emits values in the same order they were received.
    // No parallelism: Unlike `mergeMap`, the observables are processed one by one.

    // Example:

    // Example function that returns an observable (simulating async operation)
    function fetchData(value: number) {
      return of(`Data for value: ${value}`); // Simulating async data fetching
    }

    const observable$ = of(1, 2, 3);

    observable$.pipe(
      concatMap(value => fetchData(value))  // Concatenates observables sequentially
    )
      .subscribe(result => console.log(result));  // Outputs the results


    // Output:

    // Data for value: 1
    // Data for value: 2
    // Data for value: 3

    // Explanation:
    // 1. of(1, 2, 3)`: Emits values `1`, `2`, and `3`.
    // 2. concatMap(fetchData)`: Each emitted value is mapped to the `fetchData` function, which returns an observable. The observables are processed sequentially, ensuring that the result for `1` is emitted before `2`, and so on.
    // 3. subscribe`: The results are logged in the order they are emitted, ensuring sequential processing.

    // When to Use:
    // Sequential operations: When operations need to occur in sequence, such as making a series of dependent API calls where each call depends on the result of the previous one.
    // Preserving order: When the order of the emitted values must be preserved, and each operation should wait for the previous one to complete.

    // Comparison with `mergeMap` and `switchMap`:
    // mergeMap`: Executes all observables concurrently, merging their results as they arrive.
    // switchMap`: Cancels previous observables when a new value arrives, and only the most recent observable is active.
    // concatMap`: Executes observables sequentially, one after the other, preserving the order.

    // Filtering Operators:
    // filter : Emits only those values from the source observable that pass a provided condition.
    const filterObs = from([1, 2, 5, 4, 6]).pipe(
      filter((value) => value % 2 !== 0)
    );
    filterObs.subscribe((data) => console.log('filter data : ', data));

    // take operator : take only n values emitted
    const takeObservable = from([1, 2, 3, 4, 5, 6]).pipe(take(2));
    takeObservable.subscribe((data) => console.log('take data : ', data));


    // distinct ---> duplicate values emitted by an observable.
    const arr1 = [1, 2, 3, 4, 1, 4, 5, 3, 2, 5, 6, 5, 7, 8, 9, 0, 9, 0];
    const uniqueObs = from(arr1).pipe(distinct());
    uniqueObs.subscribe((data) =>
      console.log('distinct unique values  : ', data)
    );

    // distinctUntilChanged ---> the next same value  emitted by an observable
    const arr2 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
    const uniqueObs1 = from(arr2).pipe(distinctUntilChanged()); // if next value is same it skip
    uniqueObs1.subscribe((data) =>
      console.log('distinctUntillChanges unique values  : ', data)
    );

    // error handle
    this.errorHandle();

    // parallel call (forkJoin) and mergeMap
    this.parallelCall();
  }

  errorHandle() {
    this.http
      .get<any[]>('https://fakestoreapi.com/product')
      .pipe(
        map((response) => response.slice(0, 2)), // Take the first 2 items from the array
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      )
      .subscribe((response) => console.log(response));
  }

  parallelCall() {
    forkJoin([
      this.http.get('https://fakestoreapi.com/products/1'),
      this.http.get('https://fakestoreapi.com/products/2'),
      this.http.get('https://fakestoreapi.com/products/3'),
    ])
      .pipe(
        mergeMap(([data1, data2, data3]) => {
          console.log('dat1 : ', [data1]);
          console.log('dat2 : ', data2);
          console.log('dat3 : ', data3);
          return [];
        })
      )
      .subscribe();
  }

  debounceTimeSwitchMap() {
    // debounceTime ---> Use Case: Handling search input from a user without making an API call on every keystroke.
    // SwitchMap ---> Use Case: Canceling previous HTTP requests if a new one is initiated.

    // <input [formControl]="searchControl" placeholder="Search">
    // searchControl = new FormControl();
    // results: any[] = [];
    // searchControl.valueChanges.pipe(
    //   debounceTime(300),
    //   switchMap(value => this.http.get<any[]>(`https://api.example.com/search?q=${value}`))
    // ).subscribe(data => results = data);

  }


}
