import { Component, OnInit } from '@angular/core';
import { JasmineSpyService } from './../services/jasmine-spy.service';

@Component({
  selector: 'app-testing1',
  templateUrl: './testing1.component.html',
  styleUrls: ['./testing1.component.scss']
})
export class Testing1Component implements OnInit {
text = 'Testing working';
spyText = '';
constructor(
  private spy :JasmineSpyService
) {
 
}
ngOnInit(): void {
this.spyText = this.spy.getData();
}
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  
}
}
