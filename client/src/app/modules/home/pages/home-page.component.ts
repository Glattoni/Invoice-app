import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@shared/services/invoice/invoice.service';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  invoices$: Observable<Invoice[]>;

  constructor(private invoiceService: InvoiceService) {
    this.invoices$ = this.invoiceService.invoices$;
  }

  ngOnInit(): void {
    this.invoiceService.getInvoices();
  }

  trackByInvoiceId(index: number, invoice: Invoice) {
    return invoice._id;
  }
}
