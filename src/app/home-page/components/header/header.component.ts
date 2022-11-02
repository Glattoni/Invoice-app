import { combineLatest, map, Subject, takeUntil } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';
import { InvoiceSummaryService } from 'app/home-page/services/invoice-summary/invoice-summary.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly viewModel$ = combineLatest([
    this.invoiceSummaryService.invoiceAmount$,
    this.invoiceSummaryService.invoiceSummary$,
  ]).pipe(
    map(([amount, summary]) => ({ amount, summary })),
    takeUntil(this.destroy$)
  );

  constructor(
    private readonly billingFormService: BillingFormService,
    private readonly invoiceSummaryService: InvoiceSummaryService
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openSidebar(): void {
    this.billingFormService.open();
  }
}
