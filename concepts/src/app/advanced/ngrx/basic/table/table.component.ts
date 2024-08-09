import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  user: any;
  constructor(private store: Store<any>) {
    store.select('user').subscribe(
      data => {
        this.user = data;
      }
    )
  }
}
