import { Subject, takeUntil } from 'rxjs';

import { Router } from '@angular/router';
import {
  Input,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { DialogService } from '@core/services/dialog/dialog.service';
import { InvoiceService } from '@core/services/invoice/invoice.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent implements OnDestroy {
  @Input() public slug = '';
  @Input() public modalId = '';
  @Input() public invoiceId = '';

  private readonly destroy$ = new Subject<void>();
  private readonly animationEnd$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly dialogService: DialogService,
    private readonly invoiceService: InvoiceService
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public deleteInvoice(): void {
    this.dialogService.closeDialog(this.modalId);

    this.animationEnd$.pipe(takeUntil(this.destroy$)).subscribe(() => {
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
