import { Subject, takeUntil } from 'rxjs';

import { Router } from '@angular/router';
import { Component, Input, OnDestroy } from '@angular/core';

import { InvoiceService } from '@core/services/invoice/invoice.service';
import { DialogService } from '@core/services/dialog/dialog.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnDestroy {
  @Input() public slug = '';
  @Input() public modalId = '';
  @Input() public invoiceId = '';

  private readonly animationEnd$ = new Subject<void>();
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private invoiceService: InvoiceService
  ) {}

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public deleteInvoice(): void {
    this.dialogService.closeDialog(this.modalId);

    this.animationEnd$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.invoiceService.deleteInvoice(this.invoiceId);
      this.router.navigate(['']);
    });
  }

  public closeModal(): void {
    this.dialogService.closeDialog(this.modalId);
  }

  public onAnimationEnd(): void {
    this.animationEnd$.next();
  }
}
