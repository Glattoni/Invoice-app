import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '@shared/services/invoice/invoice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  amount: number = 0;
  filter: string = '';

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.filteredInvoices$.subscribe(
      (value) => (this.amount = value.length)
    );
    this.invoiceService.currentFilter$.subscribe(
      (value) => (this.filter = value)
    );
  }

  get description() {
    let result;

    if (this.amount === 0) {
      result = 'No invoices';
    }
    if (!this.filter) {
      result = `There are ${this.amount} total invoices`;
    }
    if (!this.filter && this.amount === 1) {
      result = `There is 1 total invoice`;
    }
    if (this.filter && this.amount === 1) {
      result = `There is 1 ${this.filter} invoice`;
    }
    if (this.filter && this.amount > 1) {
      result = `There are ${this.amount} ${this.filter} invoices`;
    }

    return result;
  }
}
