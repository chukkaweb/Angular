
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
  
      // Making API Calls in Sequence
      // Storing API Responses from `concat()` for UI Use
  
      // To store the responses from sequential API calls and use them in the UI, follow these steps:  
      
      // ### **Solution: Store Responses in Component Variables**
      // - Use **component properties** to store responses.  
      // - **Update UI** after each API call completes.  
  
        //import { Component } from '@angular/core';
        // import { concat, of, throwError } from 'rxjs';
        // import { delay, catchError, defaultIfEmpty } from 'rxjs/operators';
  
        // @Component({
        //   selector: 'app-root',
        //   template: `
        //     <h2>API Responses</h2>
        //     <p *ngIf="userData">User Data: {{ userData }}</p>
        //     <p *ngIf="userOrders">User Orders: {{ userOrders }}</p>
        //     <p *ngIf="errorMessage" style="color: red;">Error: {{ errorMessage }}</p>
        //   `
        // })
        // export class AppComponent {
        // userData: string | null = null;
        // userOrders: string | null = null;
      //   constructor() {
      //     this.fetchData();
      //   }
      //   fetchData() {
      //     const getUser = of('User Data: Ganesh Chukka').pipe( // Simulating empty response
      //       delay(2000),
      //       defaultIfEmpty('No User Data Found'), // Handle empty response
      //       catchError(err => {
      //         this.errorMessage = 'Failed to fetch user data';
      //         return of('Error in User API'); // Fallback value
      //       })
      //     );
      
      //     const getOrders = throwError(() => new Error('API Failed')).pipe( // Simulating error
      //       delay(1000),
      //       catchError(err => {
      //         this.errorMessage = 'Failed to fetch user orders';
      //         return of('Error in Orders API'); // Fallback value
      //       })
      //     );
      
      //     concat(getUser, getOrders).subscribe(response => {
      //       if (!this.userData) {
      //         this.userData = response; // Store user data
      //       } else {
      //         this.userOrders = response; // Store order data
      //       }
      //     });
      //   }
      // }  
      // ---
      
      // *How it Works?
      // 1. Calls **getUser API** (after 2 sec) → Stores response in `userData`.  
      // 2. Calls **getOrders API** (after 1 sec) → Stores response in `userOrders`.  
      // 3. The UI updates **automatically** with stored responses.  
    
  
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
  
      // Examples:
       // const api1 = of('Response 1').pipe(delay(2000)); // Simulating a delay
      // const api2 = of('Response 2').pipe(delay(3000)); // Simulating a delay
      // const api3 = of('Response 3').pipe(delay(1000)); // Simulating a delay
  
      // forkJoin([api1, api2, api3]).subscribe((results:any) => {
      //   console.log(results); // Output: ['Response 1', 'Response 2', 'Response 3'] (after 3 sec)
      // });

    //   forkJoin() {
    // const obs1$ = of(1, 2, 3).pipe(delay(100));
    // const obs2$ = of('1', '2', '3');
    // const obs3$ = of('a', 'b', 'c', 'd', 'e', 'f');
    // const srcThree = throwError(() => new Error('Something failed!'));
    // const cl = forkJoin([obs1$, obs2$, obs3$]);
    // cl.subscribe((values) => console.log(values));
  // }
  
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
  
      // | Feature                | `concat()`                                                                                    | `combineLatest()`                                                                      | `forkJoin()`                                                |
      // |------------------------|------------------------------------------------------------                                  |----------------------------------------------------------------                         |-------------------------------------------------------------|
      // Emission Timing          | Emits values sequentially, waiting for each observable to complete before starting the next. | Emits whenever any of the observables emits a new value.                                 | Emits only once when all observables complete.               |
      // Emission Values          | Emits all values from the first observable, then all from the next, in sequence.             | Emits the latest values from all observables as soon as all have emitted at least once.  | Emits the last values from all observables upon completion.  |
      // Frequency of Emission    | Emits multiple times, sequentially for each observable.                                      | Can emit multiple times as inputs change.                                                | Emits only once, at the end.                                 |
      // Dependency               | Observables are processed one after another.                                                 | Waits for all observables to emit at least once, then emits on any new value from any observable. | Waits for all observables to complete, then emits a single value. |
      // Use Case                 | Ideal for scenarios where you need to execute tasks one after another in sequence.           | Ideal for real-time data updates, such as combining UI inputs or streaming data.                  | Ideal for scenarios where you need final results from multiple asynchronous operations, like completing all HTTP requests before processing. |
  
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
  
  