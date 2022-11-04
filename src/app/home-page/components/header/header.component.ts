import { AngularSvgIconModule } from 'angular-svg-icon';
import { combineLatest, map, Subject, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { DropdownComponent } from '../dropdown/dropdown.component';
import { BillingFormService } from 'app/services/billing-form/billing-form.service';
import { InvoiceSummaryService } from 'app/home-page/services/invoice-summary/invoice-summary.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, DropdownComponent],
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
