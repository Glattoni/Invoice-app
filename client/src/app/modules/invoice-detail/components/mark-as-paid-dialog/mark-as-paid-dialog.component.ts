import { Component, Input } from '@angular/core';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { ModalService } from '@core/services/modal/modal.service';

@Component({
  selector: 'app-mark-as-paid-dialog',
  templateUrl: './mark-as-paid-dialog.component.html',
  styleUrls: ['./mark-as-paid-dialog.component.scss'],
})
export class MarkAsPaidDialogComponent {
  @Input() id?: string;
  @Input() slug?: string;

  constructor(
    private modalService: ModalService,
    private invoiceService: InvoiceService
  ) {}

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  markAsPaid(id: string, dialogId: string): void {
    this.invoiceService.markAsPaidInvoice(id);
    this.modalService.close(dialogId);
  }
}
