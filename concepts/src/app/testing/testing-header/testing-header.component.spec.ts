import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingHeaderComponent } from './testing-header.component';

describe('TestingHeaderComponent', () => {
  let component: TestingHeaderComponent;
  let fixture: ComponentFixture<TestingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
