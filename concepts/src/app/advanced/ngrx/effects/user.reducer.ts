import { createReducer, on } from "@ngrx/store";
import { setError, setUsers } from "./user.action";

let initialState = {
    users: [],
    apiError: false
}
export const useEffectReducer = createReducer(
    initialState,
    on(setUsers, (state, { users }) => {

        return { ...state, users, apiError: false }

    }),
    on(setError, (state, { error }) => {

        return { ...state, apiError: true }

    })

)