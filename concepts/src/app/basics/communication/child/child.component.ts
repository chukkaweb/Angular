import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-child',
  template: `<p>{{fromParent}}</p>
  <h1>Test </h1>
  <button (click)="clickMe()"> Click</button>`
})
export class ChildComponent implements OnInit {
  @Input() public fromParent:any;
  @Output() public childInfo = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

clickMe(){
  this.childInfo.emit('child component');
}
}
