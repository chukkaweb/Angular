import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUsers } from '../user.action';

@Component({
  selector: 'app-effects-demo',
  templateUrl: './effets-demo.component.html',
  styles: [
  ]
})
export class EffetsDemoComponent {
  users:any = [];
  error = false;

  constructor(private store: Store<any>) {
  }
  ngOnInit(): void {
    this.store.dispatch(getUsers());
    this.store.select('users').subscribe(
      data => {
        this.users = data.users;
        this.error = data.apiError

      }
    )
  }


}
