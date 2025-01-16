// https://rxjs.dev/guide/overview
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
  mergeMap,
  combineLatest,
  debounceTime,
  switchMap,
  concat,
  timer,
} from 'rxjs';
import { delay } from 'rxjs/operators';
import { concat } from 'rxjs';

@Component({
  selector: 'app-operators',
  template: ` <p>operators works!</p> `,
})

export class OperatorsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    
    //------start -from and of operator ----------
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

    // from operator used to convert array and promises to observables
    const personPromise = Promise.resolve(person);
    const prmsObs = from(personPromise);
    prmsObs.subscribe((data) => console.log('promises to observable : ', data));

    //------end -from and of operator ----------

    // Transformation Operators:
    //2.) map , pluck  & tap operator
    const mapObservable = from([1, 2, 3]).pipe(map((value) => value * 2));
    mapObservable.subscribe((data) =>
      console.log('maniplated map data : ', data)
    );

    const pluckObservable = from([
      { name: 'Ganesh', id: 123 },
      { name: 'Chukka', id: 456 },
    ]).pipe(pluck('name'));
    pluckObservable.subscribe((data) => console.log('pluck method : ', data));

    const source = of('ganesh');
    source
      .pipe(map((data) => data.toUpperCase()))
      .subscribe((data) => console.log('mapped object', data));

    // tap does not make changes to actual stream when ever we dont want to change the data..
    // we can log the data..or may be want to send some signal to some service and we don't want to manipulate the data..
    const source2 = of('ganesh');
    source2
      .pipe(
        tap((data) => {
          console.log(data.toUpperCase());
          return data.toUpperCase();
        })
      )
      .subscribe((data) => console.log('tapped object', data));

    // Filtering Operators:
    // filter : Emits only those values from the source observable that pass a provided condition.
    const filterObs = from([1, 2, 5, 4, 6]).pipe(
      filter((value) => value % 2 !== 0)
    );
    filterObs.subscribe((data) => console.log('filter data : ', data));

    // take operator : take only n values emitted
    const takeObservable = from([1, 2, 3, 4, 5, 6]).pipe(take(2));
    takeObservable.subscribe((data) => console.log('take data : ', data));

    // Combination Operators:
    const obs1 = from([1, 2, 3, 4]);
    const obs2 = from([5, 6, 7, 8]);

    const combineObs = merge(obs1, obs2);
    combineObs.subscribe((data) => console.log('merged : ', data)); // 0/p [1, 2, 3, 4,5, 6, 7, 8]

    const zipObs = zip(obs1, obs2);
    zipObs.subscribe((data) => console.log('zip : ', data)); // [1,5],[2,6],[3,7].[4,8]

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
  const obs3$ = of('a', 'b', 'c','d','e','f');
  const combined$ = combineLatest([obs1$, obs2$,obs3$]);
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
  const obs3$ = of('a', 'b', 'c','d','e','f');
  const combined$ = concat(obs1$, obs2$,obs3$); // not using array 
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
// - `concat()`: Use when you need to run observables in sequence, emitting all values from one before starting the next.
// - `combineLatest()`: Use when you need to combine the latest values from multiple observables and get updates whenever any emits.
// - `forkJoin()`: Use when you need to wait for all observables to complete and get their last emitted values together.


}
