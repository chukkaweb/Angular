import {Injectable} from '@angular/core'
import { Actions,createEffect, ofType } from '@ngrx/effects'
import { UserService } from './user.service'
import { getUsers, setError, setUsers } from './user.action'
import {mergeMap,map, catchError} from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class  userEffect {

    constructor(private actions :Actions,private us:UserService ){

    }
    fetchusers =createEffect(
        ()=>this.actions.pipe(
                ofType(getUsers),
                mergeMap(
                    ()=>this.us.getUsers().pipe(
                        map((data)=>setUsers({users:data})),
                        catchError(
                            (error)=>of(setError({error}))
                        )
                    )
                )
            )
            
        
     )
     

    



}