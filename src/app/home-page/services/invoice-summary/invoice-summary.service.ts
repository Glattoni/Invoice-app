import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { InvoiceService } from 'app/services/invoice/invoice.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceSummaryService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly invoiceService: InvoiceService) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get invoiceSummary$(): Observable<string> {
    return combineLatest([
      this.invoiceService.filteredAmount$,
      this.invoiceService.selectedFilter$,
    ]).pipe(
      map(([amount, filter]) => this.transform(amount, filter)),
      takeUntil(this.destroy$)
    );
  }

  public get invoiceAmount$(): Observable<string> {
    return this.invoiceService.filteredAmount$.pipe(
      map((amount) => `${amount || 'No'} invoices`),
      takeUntil(this.destroy$)
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
