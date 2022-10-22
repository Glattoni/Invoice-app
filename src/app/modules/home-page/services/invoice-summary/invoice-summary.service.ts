import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { InvoiceService } from '@core/services/invoice/invoice.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceSummaryService implements OnDestroy {
  private readonly destroyed$ = new Subject<void>();

  constructor(private invoiceService: InvoiceService) {}

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public get invoiceSummary$(): Observable<string> {
    return combineLatest([
      this.invoiceService.filteredAmount$,
      this.invoiceService.selectedFilter$,
    ]).pipe(
      takeUntil(this.destroyed$),
      map(([amount, filter]) => this.transform(amount, filter))
    );
  }

  public get invoiceAmount$(): Observable<string> {
    return this.invoiceService.filteredAmount$.pipe(
      takeUntil(this.destroyed$),
      map((amount) => `${amount || 'No'} invoices`)
    );
  }

  private transform(amount: number, filter = 'total'): string {
    const article = amount > 1 ? 'are' : 'is';
    const suffix = amount > 1 ? 's' : '';

    return amount
      ? `There ${article} ${amount} ${filter} invoice${suffix}`
      : 'No invoices';
  }
}
