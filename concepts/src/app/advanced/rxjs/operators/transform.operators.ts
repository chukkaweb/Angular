
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
       // tap does not make changes to actual stream when ever we dont want to change the data.. 
       // we can log the data..or may be want to send some signal to some servce and we dont want to maipulate the data..

    // The `tap` operator in RxJS is used for side effects — it allows you to observe the emissions of an observable without modifying the emitted values.
    // It is commonly used for logging, debugging, or triggering side effects like API calls, without affecting the data flow.

    // Key Points:
    //     Purpose: Performs side effects, like logging or updating variables, but does not change the stream.
    //       Non - invasive: It does not alter the emitted values of the observable.
    // Common Use: Debugging, logging, or triggering actions that are not part of the data flow.

    const source2 = of('david');
    source2
      .pipe(
        tap((data) => {
          console.log(data.toUpperCase());
          return data.toUpperCase();
        })
      )
      .subscribe((data) => {
        console.log('tapped object', data);
      });

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

// # 1️⃣ `merge` vs `mergeMap`

// ## 🔹 merge

// **Definition:**
// `merge` **combines multiple Observables and emits values as they arrive.**

// 👉 It does **NOT transform values**, it just combines streams.

// ### Example

// ```ts
// import { merge, interval } from 'rxjs';

// const obs1 = interval(1000);
// const obs2 = interval(2000);

// merge(obs1, obs2).subscribe(console.log);
// ```

// **Output**

// ```
// 0
// 0
// 1
// 2
// 1
// 3
// ```

// ### Real Angular Example

// Combine **user clicks + timer events**

// ```ts
// merge(buttonClick$, timer$).subscribe(data => {
//   console.log(data);
// });
// ```

// 

// ## 🔹 mergeMap

// **Definition:**
// `mergeMap` **maps each value to a new Observable and merges all results simultaneously.**

// 👉 Used when **each value triggers an API call**

// ### Example

// ```ts
// source$.pipe(
//   mergeMap(id => this.http.get(`/api/user/${id}`))
// )
// ```

// ### Real Angular Example

// Load **multiple users in parallel**

// ```ts
// from([1,2,3]).pipe(
//   mergeMap(id => this.http.get(`/api/user/${id}`))
// )
// ```

// All **3 API calls run in parallel**.

// 

// # 2️⃣ `concat` vs `concatMap`

// ## 🔹 concat

// **Definition:**
// `concat` **runs Observables one after another (sequentially).**

// 👉 Next starts **only after previous completes**

// ### Example

// ```ts
// import { concat, of } from 'rxjs';

// concat(
//   of('A'),
//   of('B'),
//   of('C')
// ).subscribe(console.log);
// ```

// Output

// ```
// A
// B
// C
// ```

// 

// ## 🔹 concatMap

// **Definition:**
// `concatMap` **maps values to Observables but executes them one by one.**

// 👉 Used when **order matters**

// ### Example

// ```ts
// source$.pipe(
//   concatMap(id => this.http.get(`/api/order/${id}`))
// )
// ```

// ### Real Angular Example

// Submit **form requests sequentially**

// Example:

// ```
// Save Step1
// Save Step2
// Save Step3
// ```

// ```ts
// from([1,2,3]).pipe(
//   concatMap(id => this.saveStep(id))
// )
// ```

// Requests run **one by one**.

// 

// # 3️⃣ `combineLatest` vs `combineLatestAll`

// ## 🔹 combineLatest

// **Definition:**
// `combineLatest` **combines latest values from multiple Observables.**

// 👉 Emits when **any Observable changes**

// ### Example

// ```ts
// combineLatest([
//   user$,
//   settings$
// ]).subscribe(([user, settings]) => {
//   console.log(user, settings);
// });
// ```

// ### Real Angular Example

// Combine **filters + search**

// ```ts
// combineLatest([
//   searchText$,
//   category$
// ]).subscribe(([search, category]) => {
//   this.loadProducts(search, category);
// });
// ```

// 

// ## 🔹 combineLatestAll

// **Definition:**
// `combineLatestAll` **combines latest values from multiple inner Observables emitted by a source Observable.**

// 👉 Used when **source emits Observables**

// ### Example

// ```ts
// source$.pipe(
//   combineLatestAll()
// )
// ```

// Example scenario

// ```
// Observable -> emits multiple Observables
// combineLatestAll -> combine their latest values
// ```

// 

// # 🧠 Easy Interview Trick (Very Important)

// | Operator         | Meaning                          |
// | - | -- |
// | merge            | combine streams                  |
// | mergeMap         | parallel API calls               |
// | concat           | sequential Observables           |
// | concatMap        | sequential API calls             |
// | combineLatest    | combine latest values            |
// | combineLatestAll | combine latest inner Observables |

// 

// # 🎯 Super Simple Interview Answer (Best)

// **mergeMap vs concatMap**

// > mergeMap executes Observables in **parallel**, while concatMap executes them **one after another in order**.

// Example:

// * **mergeMap → load users in parallel**
// * **concatMap → process payments sequentially**

// 

// # 💡 Senior Angular Interview Tip

// Most used operators in **real Angular apps**

// ```
// switchMap  → API calls (search)
// mergeMap   → parallel requests
// concatMap  → sequential requests
// combineLatest → filters/search forms
// ```
