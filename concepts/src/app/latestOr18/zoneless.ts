// Zoneless Change Detection
// Angular 18 can now operate without Zones, significantly improving performance.

import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-no-zone',
  template: `<button (click)="triggerChange()">Trigger Change</button>`,
//   changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoZoneComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  triggerChange() {
    // Manually trigger change detection
    this.cdr.detectChanges();
  }
}
