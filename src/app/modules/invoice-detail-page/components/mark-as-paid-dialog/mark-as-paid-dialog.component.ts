import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { DialogService } from '@core/services/dialog/dialog.service';

@Component({
  selector: 'app-mark-as-paid-dialog',
  templateUrl: './mark-as-paid-dialog.component.html',
  styleUrls: ['./mark-as-paid-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkAsPaidDialogComponent {
  @Input() public slug = '';
  @Input() public modalId = '';
  @Input() public invoiceId = '';

  constructor(
    private readonly dialogService: DialogService,
    private readonly invoiceService: InvoiceService
  ) {}

  public closeDialog(): void {
    this.dialogService.closeDialog(this.modalId);
  }

  public markAsPaid(): void {
    this.invoiceService.markAsPaidInvoice(this.invoiceId);
    this.dialogService.closeDialog(this.modalId);
  }
}
