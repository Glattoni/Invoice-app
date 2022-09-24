import { combineLatest, map } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';
import { InvoiceSummaryService } from '@modules/home-page/services/invoice-summary/invoice-summary.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly viewModel$ = combineLatest([
    this.invoiceSummaryService.invoiceAmount$,
    this.invoiceSummaryService.invoiceSummary$,
  ]).pipe(map(([amount, summary]) => ({ amount, summary })));

  constructor(
    private readonly billingFormService: BillingFormService,
    private readonly invoiceSummaryService: InvoiceSummaryService
  ) {}

  public openSidebar(): void {
    this.billingFormService.open();
  }
}
