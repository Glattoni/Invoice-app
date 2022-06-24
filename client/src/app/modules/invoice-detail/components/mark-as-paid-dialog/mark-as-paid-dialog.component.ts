import { Component, Input } from '@angular/core';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { ModalService } from '@core/services/modal/modal.service';

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
    private modalService: ModalService,
    private invoiceService: InvoiceService
  ) {}

  closeModal(): void {
    this.modalService.close(this.modalId);
  }

  markAsPaid(): void {
    this.invoiceService.markAsPaidInvoice(this.invoiceId);
    this.modalService.close(this.modalId);
  }
}
