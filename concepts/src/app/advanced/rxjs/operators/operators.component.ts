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
  debounceTime,
  switchMap,
} from 'rxjs';

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
}
