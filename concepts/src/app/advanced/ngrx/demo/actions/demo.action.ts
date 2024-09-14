
import { Demo } from './../modal/demo.modal';
import { Action } from "@ngrx/store";

export const ADD_DEMO:any = 'Add Demo';
export const REMOVE_DEMO:any = 'Remove Demo';

export class AddDemo implements Action {
  readonly type = ADD_DEMO;
  constructor(public payload: Demo) {}
}

export class RemoveDemo implements Action {
  readonly type = REMOVE_DEMO;
  constructor(public payload: Number) {}
}

export type Actions = AddDemo | RemoveDemo;

