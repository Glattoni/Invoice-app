import { Component, Input } from '@angular/core';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { DialogService } from '@core/services/dialog/dialog.service';

@Component({
  selector: 'app-mark-as-paid-dialog',
  templateUrl: './mark-as-paid-dialog.component.html',
  styleUrls: ['./mark-as-paid-dialog.component.scss'],
})
export class MarkAsPaidDialogComponent {
  @Input() slug: string = '';
  @Input() modalId: string = '';
  @Input() invoiceId: string = '';

  constructor(
    private dialogService: DialogService,
    private invoiceService: InvoiceService
  ) {}

  closeDialog(): void {
    this.dialogService.closeDialog(this.modalId);
  }

  markAsPaid(): void {
    this.invoiceService.markAsPaidInvoice(this.invoiceId);
    this.dialogService.closeDialog(this.modalId);
  }
}
