import { Observable } from 'rxjs';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Invoice } from '@shared/models/invoice.model';
import { DialogService } from '@core/services/dialog/dialog.service';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';

@Component({
  templateUrl: './invoice-detail-page.component.html',
  styleUrls: ['./invoice-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailPageComponent implements OnInit {
  public invoice$: Observable<Invoice>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly dialogService: DialogService,
    private readonly invoiceService: InvoiceService,
    private readonly billingFormService: BillingFormService
  ) {
    this.invoice$ = invoiceService.invoice$;
  }

  public ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.invoiceService.getInvoice(id);
  }

  public toPreviousPage(): void {
    this.location.back();
  }

  public onEdit(invoice: Invoice): void {
    this.billingFormService.startEditing(invoice);
  }

  public onDelete(): void {
    this.dialogService.openDialog('delete-dialog');
  }

  public onMarkAsPaid(): void {
    this.dialogService.openDialog('mark-as-paid-dialog');
  }
}
