import { Component } from '@angular/core';

@Component({
  selector: 'app-ngrx',
  template: `
   <div class="container">
    <h3>NGRX Example</h3>
     <app-form></app-form>
     <app-table></app-table>
     <app-effects-demo></app-effects-demo>
    </div>
  `,
  styles: [
  ]
})
export class NgrxComponent {

}
