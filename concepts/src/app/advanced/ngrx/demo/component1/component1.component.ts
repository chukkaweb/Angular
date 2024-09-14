import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Demo } from '../modal/demo.modal';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {

  demo: Observable<Demo[]>;

  constructor(private store: Store<AppState>) {
    this.demo = store.select('demoStore');
  }

  ngOnInit(): void {
  }

  removeFromTable(id: number) {

  }
}
