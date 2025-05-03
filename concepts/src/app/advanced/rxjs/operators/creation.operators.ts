
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
      const personObs: Observable<Person> = of(person);
      personObs.subscribe((data) => console.log('object to observable : ', data));
  
      //converting a string to observable
      const strObs: Observable<string> = of('chukka');
      strObs.subscribe((data) => console.log('string to observable : ', data));
  
      // Emitting a series of status messages
      const status$ = of('Loading', 'Success', 'Error');
      status$.subscribe(status => console.log(status));
      // Output: "Loading" "Success" "Error"
      // Real-Time Use Case: Emitting a sequence of UI status messages or configurations.
  
      // Feature.        	of	                               from
      // Emits	          Values passed to it	               Values from array/promise/iterable
      // of([1,2,3])	    Emits one item: [1,2,3]	           Emits: 1, 2, 3
      // Handles Promises	Emits the whole promise object	   Resolves and emits the result
      // ✅ Real-time use:
      // Use of when you just want to wrap data as an observable.
      // Use from when you're working with async data (like promises or arrays).
  
      // from operator 
      // used to convert array and promises to observables
      // Use Case: Converts an array, promise, or iterable into an observable stream. 
      // Useful when you need to process items from an array or handle promises in a reactive way.
  
      // Converting an array of user names to an observable stream.
      const users = ['Alice', 'Bob', 'Charlie'];
      const users$ = from(users);
  
      users$.subscribe(user => console.log(user));
      // Output: "Alice" "Bob" "Charlie"
  
      const personPromise:Promise<Person> = Promise.resolve(person);
      const prmsObs = from(personPromise);
      prmsObs.subscribe((data) => console.log('promises to observable : ', data));


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
    // Use Case: Emitting an error. // throwError is a function from RxJS used to create an Observable that immediately errors out
    // Commonly used in Angular services when you want to simulate or handle an error.
    
    const errorObservable = throwError(() => new Error('This is an error'));
    errorObservable.subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Error caught:', err.message)
    });

    // Example: Simulating or handling errors in a stream for testing purposes.
    import { HttpClient } from '@angular/common/http';
    import { catchError, throwError } from 'rxjs';
    @Injectable({ providedIn: 'root' })
    export class UserService {
      constructor(private http: HttpClient) {}

      getUser() {
        return this.http.get('/api/user').pipe(
          catchError(error => {
            console.error('Server error:', error);
            return throwError(() => new Error('Failed to fetch user data'));
          })
        );
      }
    }

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


