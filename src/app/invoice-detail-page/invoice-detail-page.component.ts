import { fromEvent, Observable, Subject, takeUntil } from 'rxjs';

import {
  OnInit,
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Invoice } from '@shared/models/invoice.model';
import { InvoiceService } from '@core/services/invoice/invoice.service';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';

@Component({
  templateUrl: './invoice-detail-page.component.html',
  styleUrls: ['./invoice-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailPageComponent implements OnInit, OnDestroy {
  public invoice$: Observable<Invoice>;
  public invoiceId = '';

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly invoiceService: InvoiceService,
    private readonly billingFormService: BillingFormService
  ) {
    this.invoice$ = invoiceService.invoice$;
    this.invoiceId = String(this.route.snapshot.paramMap.get('id'));
  }

  public ngOnInit(): void {
    this.invoiceService.getInvoice(this.invoiceId);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toPreviousPage(): void {
    this.location.back();
  }

  public onEdit(): void {
    this.billingFormService.startEditing();
  }

  public onDelete(): void {
    this.invoiceService.deleteInvoice(this.invoiceId);
    this.router.navigate(['']);
  }

  public onMarkAsPaid(): void {
    this.invoiceService.markAsPaidInvoice(this.invoiceId);
  }

  public closeDialog(dialog: HTMLDialogElement): void {
    dialog.setAttribute('closing', '');

    fromEvent(dialog, 'animationend', { once: true })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        dialog.removeAttribute('closing');
        dialog.close();
      });
  }
}