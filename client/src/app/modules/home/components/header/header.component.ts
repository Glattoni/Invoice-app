import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  count: number = 0;
  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.getInvoiceCount();
  }

  getInvoiceCount(): void {
    this.invoiceService
      .getInvoices()
      .subscribe((value) => (this.count = value.length));
  }
}
