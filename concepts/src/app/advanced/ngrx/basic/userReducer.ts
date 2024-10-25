import { createReducer, on } from "@ngrx/store"
import { updateEmail, updateMobile, updateName } from "./actions"

let initialState = {
    name : '',
    email:'',
    mobile:null
}

// advanced ngrx
export const userReducer = createReducer(initialState,
  on(updateName, (state:any, { name } )=>( { ...state , name}) ),
  on(updateEmail,(state:any, { email } )=> ({...state , email}) ),
  on(updateMobile , (state:any , { mobile })=>({...state, mobile}))
)

// basic ngrx
// export function userReducer(state = initialState, action:any) {
//         switch (action.type) {
//         case 'name-edit' : return { ...state, name: action.payload } ;
//         case 'email-edit': return { ...state , email:action.payload } ;
//         case 'mobile-edit': return { ...state , mobile:action.payload}
//         default: return state;
//     }

// }