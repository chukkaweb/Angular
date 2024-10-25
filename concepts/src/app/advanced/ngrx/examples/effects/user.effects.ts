import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "./user.service";
import { getUsers, setError, setUsers } from "./actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class userEffect {
constructor(private actions:Actions, private us:UserService){
}   

 
fetchUsers = createEffect (
    ()=>this.actions.pipe(
        ofType(getUsers),        // oftype will check observable emitted data and manam pass chesina data same or not and here get user action pai api call cheyali 
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