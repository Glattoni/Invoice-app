import { filter, ReplaySubject, Subject, takeUntil } from 'rxjs';

import {
  OnInit,
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  INVOICE_STATUS,
  INVOICE_STATUSES,
} from '@shared/constants/invoice.constants';
import { scaleDown } from './dropdown.component.animations';
import { InvoiceService } from '@core/services/invoice/invoice.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [scaleDown],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit, OnDestroy {
  public visible = false;
  public readonly statuses = INVOICE_STATUSES;

  private value$ = new ReplaySubject<INVOICE_STATUS>();
  private readonly destroyed$ = new Subject<void>();

  constructor(private readonly invoiceService: InvoiceService) {}

  public ngOnInit(): void {
    this.value$
      .pipe(
        takeUntil(this.destroyed$),
        filter((value) => !!value)
      )
      .subscribe((value) => this.invoiceService.filterByStatus(value));
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onCheck(value: string): void {
    this.value$.next(value as INVOICE_STATUS);
  }

  public onUnCheck(): void {
    this.invoiceService.resetFilter();
  }

  public toggle(): void {
    this.visible = !this.visible;
  }

  public onClickOutside(): void {
    this.visible = false;
  }
}
