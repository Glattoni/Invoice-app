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

  it('should...', () => {});
});
