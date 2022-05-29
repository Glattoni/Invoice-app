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
  @Input() id?: string;
  @Input() slug?: string;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private invoiceService: InvoiceService
  ) {}

  deleteInvoice(id: string): void {
    this.invoiceService.deleteInvoice(id);
    this.router.navigate(['']);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }
}
