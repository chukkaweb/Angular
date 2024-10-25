import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServicesService } from './services.service';

describe('ServicesService', () => {
  let service: ServicesService,
   httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicesService],
    });
    service = TestBed.inject(ServicesService); //  TestBed.get() or TestBed.inject() to create an instance of the service to be tested. 
    httpMock = TestBed.inject(HttpTestingController);
  });

 it('should be created', () => { //  it() or test() functions to define the tests 
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of customers', () => {

    const dummyCustomers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com'},
    ];

    service.getCustomers().subscribe((customers)=>{
      expect(customers).toBeTruthy();
      expect(customers).toEqual(dummyCustomers);
    });
    const req = httpMock.expectOne('api/customers');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCustomers);

  });

  it('should retrieve a customer by ID', () => {
    const dummyCustomer = { id: 1, name: 'John Doe', email: 'john@example.com' };

    service.getCustomer(1).subscribe((customer) => {
      expect(customer).toEqual(dummyCustomer);
    });

    const req = httpMock.expectOne('api/customers/1');
    expect(req.request.method).toBe('GET');
    //  req.flush() method is called on the HttpRequest object that is intercepted by the HttpTestingController. 
    // It allows you to specify the response data or error that should be returned as a result of the intercepted request.
    req.flush(dummyCustomer);
  });

  it('should add a new customer', () => {
    const newCustomer = { name: 'John Doe', email: 'john@example.com' };
    service.addCustomer(newCustomer).subscribe((customer)=>{
      // expect(customer.id).toBe(1);
      expect(customer.id).toBeTruthy();
    });
    const req = httpMock.expectOne('api/customers');
    expect(req.request.method).toBe('POST');
    req.flush({...newCustomer,id:1});
  });

  afterEach(() => {
    httpMock.verify(); // to ensure that there are no outstanding requests or unfulfilled expectations
  });


});