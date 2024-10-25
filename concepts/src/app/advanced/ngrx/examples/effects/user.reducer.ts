import { createReducer, on } from "@ngrx/store";
import { setError, setUsers } from "./actions";

let initialState = {
    users:[],
    apiError:false,
}

export const userReducer = createReducer(
    initialState,
    on(setUsers,(state:any, {users})=> ({...state, users, apiError:false})),
    on(setError,(state,{error})=>({...state, apiError:true}))
);