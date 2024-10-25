import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUsers, setUsers } from '../../effects/actions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  user:any;
  users:any = [];
  error = false;
  constructor(private store:Store<any>) {};

  ngOnInit(): void {
    this.store.dispatch(getUsers());
    this.store.select('user').subscribe(
      data=>{
        this.users = data.users;
        this.error = data.apiError
      }
    )

    // this.store.select('user').subscribe(data=>{
    //   this.user = data;
    //   console.log(data)
    // })
    
  }
}
