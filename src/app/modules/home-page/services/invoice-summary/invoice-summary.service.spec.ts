import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InvoiceSummaryService } from './invoice-summary.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('InvoiceSummaryService', () => {
  let service: InvoiceSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [HttpClient, HttpHandler, InvoiceSummaryService],
    });
    service = TestBed.inject(InvoiceSummaryService);
  });

  it('should transform when amount is 0 and filter is undefined', () => {
    expect(service['transform'](0)).toBe('No invoices');
  });

  it('should transform when amount is 0 and filter is set to draft', () => {
    expect(service['transform'](0, 'draft')).toBe('No invoices');
  });

  it('should transform when amount is 1 and filter is undefined', () => {
    expect(service['transform'](1)).toBe('There is 1 total invoice');
  });

  it('should transform when amount is 1 and filter is present', () => {
    expect(service['transform'](1, 'paid')).toBe('There is 1 paid invoice');
  });

  it('should transform when filter is undefined', () => {
    expect(service['transform'](10)).toBe('There are 10 total invoices');
  });

  it('should transform when filter is present', () => {
    expect(service['transform'](10, 'pending')).toBe(
      'There are 10 pending invoices'
    );
  });
});
