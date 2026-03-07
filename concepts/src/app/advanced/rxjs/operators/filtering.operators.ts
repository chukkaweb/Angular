
    // Filtering Operators:
    filter : Emits only those values from the source observable that pass a provided condition.
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
     // In RxJS, the distinctUntilChanged operator filters a stream by only emitting a value if it is different from the immediately preceding value. It is primarily used to prevent redundant processing of consecutive identical data. [1, 2, 3, 4] 
      // Key Features
      // * Consecutive Filtering: It only compares the current value to the last emitted value, not the entire history of the stream.
      // * Default Comparison: Uses strict equality (===) by default.
      // * Custom Logic: You can provide a custom comparator function to define what "different" means for your specific data. [1, 2, 4, 5, 6, 7] 

      // Usage Examples1. Basic Primitive Values
      // Consecutive duplicates are ignored, but non-consecutive duplicates will still emit. [8, 9] 

      // import { of, distinctUntilChanged } from 'rxjs';
      // of(1, 1, 2, 2, 2, 1, 3)
      //   .pipe(distinctUntilChanged())
      //   .subscribe(console.log); // Output: 1, 2, 1, 3

      // 2. Working with Objects
      // Because the default is a reference check (===), two different object instances with the same content will still trigger an emission unless a custom comparator is used. [10, 11] 

      // // Using a custom comparator to check a specific propertyconst users$ = of(
      //   { id: 1, name: 'Alice' },
      //   { id: 1, name: 'Alice' },
      //   { id: 2, name: 'Bob' }
      // );

      // users$.pipe(
      //   distinctUntilChanged((prev, curr) => prev.id === curr.id)
      // ).subscribe(console.log);// Output: {id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}

      // Common Real-World Use Case: Search Input
      // It is frequently paired with debounceTime to optimize search bars. If a user types "apple", deletes the "e", and then quickly re-types "e", distinctUntilChanged prevents a second, identical API call. [12, 13, 14, 15, 16] 
      // Comparison with Related Operators

      // | Operator [1, 5, 6, 17, 18, 19] | Comparison Scope | Comparison Method |
      // |---|---|---|
      // | distinctUntilChanged | Only the previous value | === or custom comparator |
      // | distinct | The entire history of the stream | Internal Set for uniqueness |
      // | distinctUntilKeyChanged | Only the previous value | Compares a specific property (key) |

      // For more advanced object comparisons, many developers use the Lodash isEqual function as the comparator for deep equality. You can find full technical details in the [official RxJS documentation](https://rxjs.dev/api/operators/distinctUntilChanged). [10, 20, 21, 22] 
      // Would you like to see how to implement a deep-equality check for nested objects using this operator?


// First clarify one important thing:
// 👉 **`distinctUntilChanged()` does NOT block the API call in your scenario.**
// It only prevents **consecutive duplicate values**.
// Example stream:
// ```
// a
// ap
// app
// appl
// apple
// appl
// apple
// ```

// `distinctUntilChanged()` output:
// ```
// a
// ap
// app
// appl
// apple
// appl
// apple
// ```

// Why?
// Because **previous value ≠ current value**.
// So **API will be called again** for `"apple"`.

// # The Real Issue (304 Not Modified)
// Your problem is actually related to **HTTP caching**, not `distinctUntilChanged()`.

// Flow:
// 1️⃣ User types **apple**
// API returns results

// 2️⃣ User deletes **e → appl**
// API returns different results

// 3️⃣ User types **apple again**
// Browser sends cached request with:

// ```
// If-None-Match
// If-Modified-Since
// ```

// Server responds:
// ```
// 304 Not Modified
// ```

// Meaning:
// > "Data did not change. Use cached response."

// But **Angular HttpClient does not automatically give previous cached data**, so you may see **empty results**.

// # Real Production Solutions
// ## Solution 1 — Disable browser cache for search API
// Backend should return header:

// ```
// Cache-Control: no-cache
// ```

// or

// ```
// Cache-Control: no-store
// ```

// Then every search calls API normally.

// ## Solution 2 — Maintain last results locally

// Store results in component/service.

// Example:

// ```ts
// lastResults: string[] = [];

// results$ = this.searchControl.valueChanges.pipe(
//   debounceTime(300),
//   distinctUntilChanged(),
//   switchMap(query => this.searchApi(query))
// );

// searchApi(query: string) {
//   return this.http.get<string[]>(`/api/search?q=${query}`).pipe(
//     tap(res => this.lastResults = res)
//   );
// }
// ```

// If 304 happens → use `lastResults`.

// ## Solution 3 — Use `shareReplay` caching (Best RxJS way)
// ```ts
// searchApi(query: string) {
//   return this.http
//     .get<string[]>(`/api/search?q=${query}`)
//     .pipe(shareReplay(1));
// }
// ```

// Now the **last successful response is cached in stream**.

// # Interview Answer (Short Version)
// If interviewer asks:
// **"Does distinctUntilChanged cause issue in search?"**
// Answer:
// > No. `distinctUntilChanged()` only prevents consecutive duplicate values.
// > If the user types `apple → appl → apple`, the API will still be triggered because the previous value is different.
// > Issues like empty results usually come from **HTTP 304 caching**, not from `distinctUntilChanged`. In production we handle this by disabling cache headers or caching results using `shareReplay`.


  
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
  