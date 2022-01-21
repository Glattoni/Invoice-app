import { Component, OnInit } from '@angular/core';
import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@shared/services/invoice/invoice.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit {
  invoices: Invoice[] = [];
  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(): void {
    this.invoiceService
      .getInvoices()
      .subscribe((value) => (this.invoices = value));
  }
}
