// Observables are lazy Push collections of multiple values. They fill the missing spot in the following table:

//        Single	      Multiple
// Pull	  Function	    Iterator
// Push	  Promise	      Observable
	
// 
// Observable is a class . ( dhanikai mand object create chesi use chesukovachhu object is created usin new keyword) is a data source that can emit multiple values over time
//  if we want to use we have to create that time of object / instance
// 	Ex : let o = new observable()


// 	Observables (to easy do asynchronous calls)
// 	Data vachina pratisari notify cheyali anukunte at that case also we can use observables
//  ex youtube channel subscribe

// to create object of this type , we have provide a callback function 
// 	Let o = new observable (function(){})
// to that call back function we need to pass on argument 
// 	Let o = new observable (function(arg){})
// (arg will help to  data sending ki )

// 	This object emits some data continuously or error with the help of next(), error() methods
// 	Ex : let myobs = new Observable(function(observer){  observable is constructor function
//  observer - data emit .. 

// observer.next(1);  next is used for passing the data to whom subscribe
// observer.complete()  when we write the complete the it complete below statement wont execute
// observer.next(3);

// Observable can unsubscribe .  subscribe chesinapudu referacnce vastundho dhanni use chesi unsubscribe cheyali

// Core Observable concerns:
// Creating Observables
// Subscribing to Observables
// Executing the Observable
// three types of values an Observable Execution can deliver:
// "Next" notification: sends a value such as a Number, a String, an Object, etc.
// "Error" notification: sends a JavaScript Error or exception.
// "Complete" notification: does not send a value.
// Disposing Observables :
// When you subscribe, you get back a Subscription, which represents the ongoing execution. Just call unsubscribe() to cancel the execution.

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

    const obs$ = new Observable((subscriber) => { //manuvalu creation and sending the value 
      subscriber.next(1); // sending the values to subscribers
      subscriber.next(2); // 
      subscriber.error('Error'); // error unde error kuda send cheyali kadha so 
      subscriber.complete(); // complete also we can send to confirm , simply call this method dont send any argmument in complete method 
      subscriber.next(3);
    });

// here next(), error() and complete dhavra send chesina data obs$ store avuthundhi dhanni manadm subscribe chesukunte will get data
// error , complete method call cheyanathavararu / call avvanatha varaku next nunchi data we can get 
    obs$.subscribe({ // single argument we are giving object form lo estunnam, so its object so below key value based 
      next: (data) => console.log('Next: ' + data),
      error: (err) => console.error('Error: ' + err),
      complete: () => console.info('Completed') // this will help once process completed if we want to do anything then it will help 
    });


    // general tip : check the problem tab in vs code command lin if any warning or error are there and you can fix those 

  }

  ofObs() {
    const observable = of('Hello', 'World'); // with using methods 
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

  // What is the difference between an Observable and a function? Observables can "return" multiple values over time, something which functions cannot. You can't do this
   foo() {
    console.log('Hello');
    return 42;
    return 100; // dead code. will never happen
  }
  // obs ex basicObs()
}
