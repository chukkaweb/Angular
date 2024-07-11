import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `<app-child (childInfo)="msg = $event" [fromParent]="parent"></app-child>
             <h2>{{ msg }}</h2>`
})

export class ParentComponent implements OnInit {
  parent = 'This is from parent';
  msg = '';
  constructor() {}

  ngOnInit(): void {}
}
