import { createReducer, on } from "@ngrx/store";
import { updateEmail, updateMobile, updateName } from "../actions/userAction";

let initialState = {
  name: '',
  email: '',
  mobile: null,
};

export const userReducer = createReducer(initialState,
  on(updateName, (state, { name }) => ({ ...state, name: name })),
  on(updateEmail, (state, { email }) => ({ ...state, email: email })),
  // on(updateMobile, (state, { mobile }) => ({ ...state, mobile: mobile })),
)





