import { Component, Input } from '@angular/core';

import { Invoice } from '@shared/models/invoice.model';

import { ModalService } from '@core/services/modal/modal.service';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() invoice?: Invoice;

  constructor(
    private modalService: ModalService,
    private invoiceService: InvoiceService,
    private formService: SidebarFormService
  ) {}

  get isPaidInvoice() {
    return this.invoice?.status === 'paid';
  }

  openDialog(id: string): void {
    this.modalService.open(id);
  }

  openEditingForm(invoice: Invoice): void {
    this.formService.openForEditing(invoice);
  }

  markAsPaid(id: string): void {
    this.invoiceService.markAsPaidInvoice(id);
  }
}
