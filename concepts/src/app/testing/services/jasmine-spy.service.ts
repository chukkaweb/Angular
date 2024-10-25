import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JasmineSpyService {

  constructor() { }
  // if do not want to return anything from function use void . if you declared/metion type you should return 
  getData():string {
    return 'Jasmine spy testing'
  }
}
