import { Component, Input } from '@angular/core';

import { Invoice } from '@shared/models/invoice.model';

import { DialogService } from '@core/services/dialog/dialog.service';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() invoice?: Invoice;

  constructor(
    private dialogService: DialogService,
    private invoiceService: InvoiceService,
    private formService: BillingFormService
  ) {}

  openDialog(id: string): void {
    this.dialogService.openDialog(id);
  }

  openEditingForm(invoice: Invoice): void {
    this.formService.startEditing(invoice);
  }

  markAsPaid(id: string): void {
    this.invoiceService.markAsPaidInvoice(id);
  }

  get isPaidInvoice() {
    return this.invoice?.status === 'paid';
  }
}
