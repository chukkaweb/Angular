import { TestBed } from '@angular/core/testing';
import { JasmineSpyService } from './jasmine-spy.service';

// Jasmine, a spy is a function that lets you observe the behavior of a function, track calls to it, and change its return value.
//  This is useful when you want to isolate and test a specific part of your code independently.

describe('JasmineSpyService', () => {
  let service: JasmineSpyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JasmineSpyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Jasmine spy testing initially', () => {
    const result = service.getData();
    expect(result).toBe('Jasmine spy testing');

  });

  it('should return fake data when configured', () => {
    // Configure the service method to return a fake value
    spyOn(service, 'getData').and.returnValue('Fake data');

    // Call the service method
    const result = service.getData();

    // Check if the method was called
    expect(service.getData).toHaveBeenCalled();

    // Check if the result is the fake value
    expect(result).toBe('Fake data');
  });

});
