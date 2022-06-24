import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import { ModalService } from '@core/services/modal/modal.service';
import { InvoiceService } from '@core/services/invoice/invoice.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  @Input() slug: string = '';
  @Input() modalId: string = '';
  @Input() invoiceId: string = '';

  constructor(
    private router: Router,
    private modalService: ModalService,
    private invoiceService: InvoiceService
  ) {}

  deleteInvoice(): void {
    this.invoiceService.deleteInvoice(this.invoiceId);
    this.router.navigate(['']);
  }

  closeModal(): void {
    this.modalService.close(this.modalId);
  }
}
