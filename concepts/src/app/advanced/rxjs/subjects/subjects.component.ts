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

// Why service means for creating subject in service file we have only sinlge accurance / object will create then we can use the subject data where ever we want .
// Data different places use chesyli  



import { Component } from '@angular/core';
@Component({
  selector: 'app-subjects',
  template: `
    <p>
      subjects works!
    </p>
  `
})
export class SubjectsComponent {

}
