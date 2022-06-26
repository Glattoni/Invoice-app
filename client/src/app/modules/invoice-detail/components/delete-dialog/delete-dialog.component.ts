import { Router } from '@angular/router';
import { Component, Input, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';

import { ModalService } from '@core/services/modal/modal.service';
import { InvoiceService } from '@core/services/invoice/invoice.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnDestroy {
  @Input() slug: string = '';
  @Input() modalId: string = '';
  @Input() invoiceId: string = '';

  subscription?: Subscription;
  animationEnded = new Subject<void>();

  constructor(
    private router: Router,
    private modalService: ModalService,
    private invoiceService: InvoiceService
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deleteInvoice(): void {
    this.modalService.closeModal(this.modalId);

    this.subscription = this.animationEnded.subscribe(() => {
      this.invoiceService.deleteInvoice(this.invoiceId);
      this.router.navigate(['']);
    });
  }

  closeModal(): void {
    this.modalService.closeModal(this.modalId);
  }

  onAnimationEnd(): void {
    this.animationEnded.next();
  }
}
