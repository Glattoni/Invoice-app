import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { Invoice } from '@shared/models/invoice.model';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  invoices$: Observable<Invoice[]>;

  constructor(private invoiceService: InvoiceService) {
    this.invoices$ = this.invoiceService.filteredInvoices$;
  }

  ngOnInit(): void {
    this.invoiceService.getInvoices();
  }

  trackByInvoiceId(_index: number, invoice: Invoice) {
    return invoice._id;
  }
}
