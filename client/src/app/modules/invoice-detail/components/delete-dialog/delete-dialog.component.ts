import { Router } from '@angular/router';
import { Component, Input, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';

import { InvoiceService } from '@core/services/invoice/invoice.service';
import { DialogService } from '@core/services/dialog/dialog.service';

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
    private dialogService: DialogService,
    private invoiceService: InvoiceService
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deleteInvoice(): void {
    this.dialogService.closeDialog(this.modalId);

    this.subscription = this.animationEnded.subscribe(() => {
      this.invoiceService.deleteInvoice(this.invoiceId);
      this.router.navigate(['']);
    });
  }

  closeModal(): void {
    this.dialogService.closeDialog(this.modalId);
  }

  onAnimationEnd(): void {
    this.animationEnded.next();
  }
}
