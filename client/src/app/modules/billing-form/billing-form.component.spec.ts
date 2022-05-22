import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BillingFormComponent } from './billing-form.component';

describe('BillingFormComponent', () => {
  let component: BillingFormComponent;
  let fixture: ComponentFixture<BillingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingFormComponent],
      imports: [HttpClientTestingModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
