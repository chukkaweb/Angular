ngZone is used to help manage change detection in Angular. It runs outside Angular’s zone (zone.js) and allows developers to explicitly control when Angular’s change detection should be triggered.
Example use case: To improve performance, you can run code outside Angular’s zone to prevent unnecessary change detection cycles.

import { NgZone } from '@angular/core';
constructor(private ngZone: NgZone) {}
runOutsideAngular() {
  this.ngZone.runOutsideAngular(() => {
    // Long-running operation
  });
}
