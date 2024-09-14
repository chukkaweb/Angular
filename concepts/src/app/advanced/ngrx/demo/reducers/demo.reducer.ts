import { Demo } from './../modal/demo.modal';
import * as DemoActions from '../actions/demo.action';

import { createReducer , on } from '@ngrx/store';


// const initialState: Demo = {
//   name: 'Harisudhann',
//   gender: 'Male'
// }

// export function reducer(state: Demo[] = [initialState], action: DemoActions.Actions) {
//   switch(action.type) {
//       case DemoActions.ADD_DEMO:
//           return [...state, action.payload];
//       case DemoActions.REMOVE_DEMO:
//           state.splice(action.payload as number, 1);
//           return state;
//       default:
//           return state;
//   }
// }

const initialState: Demo[] = [
  {
    name: 'Harisudhan',
    gender: 'Male'
  }
];

const demoReducer = createReducer(
  initialState,
  on(DemoActions.ADD_DEMO, (state, action) => [...state, action.payload]),
  on(DemoActions.REMOVE_DEMO, (state, action) => {
    const indexToRemove = action.payload as number;
    if (indexToRemove >= 0 && indexToRemove < state.length) {
      return state.filter((_, index) => index !== indexToRemove);
    } else {
      console.error('Invalid index:', indexToRemove);
      return state;
    }
  })
);

export function reducer(state: Demo[] | undefined, action: any) {
  return demoReducer(state, action);
}
