import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-change-detection',
  template: `
    <p>{{ value }}</p>
    <button (click)="updateValue()">Update Value</button>
  `,
  styleUrls: ['./change-detection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionComponent {
  value: number = 0;
  private detached: boolean = false;
  constructor(private cdr: ChangeDetectorRef) { }

  toggleChangeDetection() {
    if (this.detached) {
      this.cdr.reattach(); // Reattach change detector
    } else {
      this.cdr.detach(); // Detach change detector
    }
    this.detached = !this.detached;
  }

  updateValue() {
    this.value++;
    this.cdr.markForCheck(); // Mark component for check
    this.cdr.detectChanges(); // Manually detect changes
  }

}
