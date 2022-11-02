import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@core/services/invoice/invoice.service';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public readonly amount$: Observable<number>;
  public readonly invoices$: Observable<Invoice[]>;

  constructor(private readonly invoiceService: InvoiceService) {
    this.amount$ = this.invoiceService.filteredAmount$;
    this.invoices$ = this.invoiceService.filteredInvoices$;
  }

  public ngOnInit(): void {
    this.invoiceService.getInvoices();
  }

  public trackByInvoiceId(_index: number, invoice: Invoice): string {
    return invoice._id;
  }
}
