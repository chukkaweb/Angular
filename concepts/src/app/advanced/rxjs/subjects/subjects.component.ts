// For data sharing multiple components and if update any one component that should be reflect to other components
// To implement sharing the data we can use this 

// subjects are advanced to the observables 
// these are 4 types subject , behavior subject , replay subject, async subject

// subject is class we have to create the object
// let s = new Subject();  just we have create then we can send the data where ever we want using next()
// But in observable while creation time only we need to send the data.

// Subject can subscribe multiple places but observable subscribing multiple places not possible.
// So because of this feature (any place data can emit and get) we are using subjects.

// Data sending through the next method and getting through the subscribe method.
// This means that multiple Observers can subscribe to it and receive the same values
// you can also push values into a Subject by calling its next() method.

// Subjects enable multicasting, meaning that multiple subscribers can listen to the same stream of data and receive the same values
// Service file subject create chesi component share chestam 

// Why service means for creating subject in service file we have only single accurance / object will create then we can use the subject data where ever we want .
// Data different places use chesyli  

import { Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  template: `
    <p>
      subjects works!
    </p>
  `
})

export class SubjectsComponent {

  constructor() {
    this.subject();
    this.behaviorSubject();
    this.replaySubject();
    this.asyncSubject();
  }

  subject() {
    // Description: A Subject is a multicast observable that doesn't hold a value. It emits values to its subscribers only when next is called.
    // Use Case: When you need a simple multicast mechanism without storing any previous values.

    const subject = new Subject<number>();
    subject.subscribe(value => console.log('Observer 1:', value));
    subject.next(1); // Emits 1 to Observer 1
    subject.subscribe(value => console.log('Observer 2:', value));
    subject.next(2); // Emits 2 to Observer 1 and Observer 2
  }

  behaviorSubject() {
    // Description: A BehaviorSubject holds a single value and emits that value immediately to any new subscribers. It requires an initial value.
    // Use Case: When you need to provide an initial value and ensure new subscribers receive the most recent value.

    const behaviorSubject = new BehaviorSubject<number>(0); // Initial value is 0
    behaviorSubject.subscribe(value => console.log('behaviorSubject Observer 1:', value));
    behaviorSubject.next(1); // Emits 1 to Observer 1
    behaviorSubject.subscribe(value => console.log('behaviorSubject Observer 2:', value)); // Emits 1 immediately to Observer 2
    behaviorSubject.next(2); // Emits 2 to Observer 1 and Observer 2

  }

  replaySubject() {
    // Description: A ReplaySubject can buffer a specified number of previous emissions and replay them to new subscribers.
    // Use Case: When you need to replay a series of emitted values to new subscribers.

    const replaySubject = new ReplaySubject<number>(2); // Buffer size is 2
    replaySubject.subscribe(value => console.log('Observer 1:', value));
    replaySubject.next(1); // Emits 1 to Observer 1
    replaySubject.next(2); // Emits 2 to Observer 1
    replaySubject.next(3); // Emits 3 to Observer 1
    replaySubject.subscribe(value => console.log('Observer 2:', value)); // Emits 2 and 3 immediately to Observer 2
    replaySubject.next(4); // Emits 4 to Observer 1 and Observer 2

  }

  asyncSubject() {
    // Description: An AsyncSubject emits the last value(and only the last value) when the observable completes.
    // Use Case: When you are only interested in the final value emitted by the observable after completion.

    const asyncSubject = new AsyncSubject<number>();
    asyncSubject.subscribe(value => console.log('Observer 1:', value));
    asyncSubject.next(1); // Doesn't emit yet
    asyncSubject.next(2); // Doesn't emit yet
    asyncSubject.subscribe(value => console.log('Observer 2:', value)); // Doesn't emit yet
    asyncSubject.next(3); // Doesn't emit yet
    asyncSubject.complete(); // Emits 3 to Observer 1 and Observer 2
  }

  // Summary:
  // Subject: No initial value, emits only to current subscribers.
  // BehaviorSubject: Requires an initial value, emits the current value immediately to new subscribers.
  // ReplaySubject: Can buffer a specified number of values and replay them to new subscribers.
  // AsyncSubject: Emits the last value only when the observable completes.

}
