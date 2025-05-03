
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
  