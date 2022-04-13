import { Component } from '@angular/core';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';
import { Invoice } from '@shared/models/invoice.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  invoices$: Observable<Invoice[]>;
  filter$: Observable<string>;

  constructor(
    private invoiceService: InvoiceService,
    private sidebarFormService: SidebarFormService
  ) {
    this.invoices$ = this.invoiceService.filteredInvoices$;
    this.filter$ = this.invoiceService.selectedFilter$;
  }

  openSidebar(): void {
    this.sidebarFormService.open();
  }
}
