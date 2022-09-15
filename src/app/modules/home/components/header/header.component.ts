import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';
import { InvoiceSummaryService } from '@modules/home/services/invoice-summary/invoice-summary.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [InvoiceSummaryService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly invoiceSummary$: Observable<string>;
  public readonly invoiceAmount$: Observable<string>;

  constructor(
    private billingFormService: BillingFormService,
    private invoiceSummaryService: InvoiceSummaryService
  ) {
    this.invoiceSummary$ = this.invoiceSummaryService.invoiceSummary$;
    this.invoiceAmount$ = this.invoiceSummaryService.invoiceAmount$;
  }

  public openSidebar(): void {
    this.billingFormService.open();
  }
}
