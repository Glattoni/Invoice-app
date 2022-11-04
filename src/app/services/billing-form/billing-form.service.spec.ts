import { TestBed } from '@angular/core/testing';
import { NonNullableFormBuilder } from '@angular/forms';

import { BillingFormService } from './billing-form.service';

describe('BillingFormService', () => {
  let service: BillingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonNullableFormBuilder],
    });
    service = TestBed.inject(BillingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
