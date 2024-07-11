// 	Observable is a class . is a data source that can emit multiple values over time
//  if we want to use we have to create that time of object / instance
// 	Ex : let o = new obserbale()

// 	Observables (to easy do asynchronous calls)
// 	Data vachina pratisari notify cheyali anukunte at that case also we can use observables
//  ex youtube channel subscribe

// 	To create object of this type takes a call back function
// 	Let o = new observable (function(){})
// 	This object emits some data continuously or error with the help of next(), error() methods
// 	Ex : let myobs =new Observable(function(observer){  observable is constructor function
//  observer - data emit ..

// observer.next(1);  next is used for passing the data to whom subscribe
// observer.complete()  when we write the complete the it complete below statement wont execute
// observer.next(3);

// Observable can unsubscribe .  subscribe chesinapudu referacnce vastundho dhanni use chesi unsubscribe cheyali

import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-observables',
  template: ` <p>observables works!</p> `,
})
export class ObservablesComponent implements OnInit {
  ngOnInit(): void {
    this.basicObs();
    this.ofObs();
    this.unsubScribe();
  }

  basicObs() {
    const obs$ = new Observable((subscriber) => {
      subscriber.next(1); // sending the values to subscribers
      subscriber.next(2);
      subscriber.error('Error');
      subscriber.complete();
      subscriber.next(3);
    });

    obs$.subscribe({
      next: (x) => console.log('Next: ' + x),
      error: (err) => console.error('Error: ' + err),
      complete: () => console.log('Completed'),
    });
  }

  ofObs() {
    const observable = of('Hello', 'World');
    observable.subscribe({
      next: (x) => console.log('Next: ' + x),
      error: (err) => console.error('Error: ' + err),
      complete: () => console.log('Completed'),
    });
  }

  unsubScribe() {
    const observable = of('Ganesh', 'Chukka');
    const subscription = observable.subscribe((x) => console.log('Next: ' + x));
    // Unsubscribe after a certain time
    setTimeout(() => {
      subscription.unsubscribe();
      console.log('Unsubscribed');
    }, 2000);
  }
}
