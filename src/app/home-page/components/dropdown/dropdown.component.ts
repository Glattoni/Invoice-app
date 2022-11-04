import { AngularSvgIconModule } from 'angular-svg-icon';

import { filter, ReplaySubject, Subject, takeUntil } from 'rxjs';

import {
  OnInit,
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  InvoiceStatus,
  InvoiceStatues,
} from '@shared/constants/invoice.constants';
import { scaleDown } from '@shared/animations';
import { InvoiceService } from '@core/services/invoice/invoice.service';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { ClickedOutsideDirective } from '@shared/directives/clicked-outside/clicked-outside.directive';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    CheckboxComponent,
    ClickedOutsideDirective,
  ],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [scaleDown],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit, OnDestroy {
  public visible = false;
  public readonly statuses = InvoiceStatues;

  private value$ = new ReplaySubject<InvoiceStatus>();
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly invoiceService: InvoiceService) {}

  public ngOnInit(): void {
    this.value$
      .pipe(
        filter((value) => !!value),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => this.invoiceService.filterByStatus(value));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onCheck(value: string): void {
    this.value$.next(value as InvoiceStatus);
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
