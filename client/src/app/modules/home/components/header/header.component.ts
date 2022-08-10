import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  filter$?: Observable<string | null>;
  invoices$?: Observable<Invoice[]>;

  constructor(
    private invoiceService: InvoiceService,
    private formService: BillingFormService
  ) {}

  ngOnInit(): void {
    this.filter$ = this.invoiceService.selectedFilter$;
    this.invoices$ = this.invoiceService.filteredInvoices$;
  }

  openSidebar(): void {
    this.formService.open();
  }
}
