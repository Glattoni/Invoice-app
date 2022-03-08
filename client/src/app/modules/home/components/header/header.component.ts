import { Component } from '@angular/core';
import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@shared/services/invoice/invoice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  invoices$: Observable<Invoice[]>;
  filter$: Observable<string>;

  constructor(private invoiceService: InvoiceService) {
    this.invoices$ = this.invoiceService.filteredInvoices$;
    this.filter$ = this.invoiceService.currentFilter$;
  }
}
