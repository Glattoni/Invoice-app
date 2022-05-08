import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  filter$?: Observable<string>;
  invoices$?: Observable<Invoice[]>;

  constructor(
    private invoiceService: InvoiceService,
    private sidebarFormService: SidebarFormService
  ) {}

  ngOnInit(): void {
    this.filter$ = this.invoiceService.selectedFilter$;
    this.invoices$ = this.invoiceService.filteredInvoices$;
  }

  openSidebar(): void {
    this.sidebarFormService.open(true);
  }
}
