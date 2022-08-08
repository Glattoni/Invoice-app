import { DateTime } from 'luxon';
import { range } from 'src/utils';

import { of, map, Subject, takeUntil, distinctUntilChanged, merge } from 'rxjs';

import {
  Self,
  Input,
  Optional,
  OnDestroy,
  Component,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { NgControl, ControlValueAccessor } from '@angular/forms';
import {
  state,
  style,
  trigger,
  animate,
  transition,
} from '@angular/animations';

interface Day {
  value: number;
  next: boolean;
}

enum Months {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12,
}

const LAST_MONTH = 12;
const MAX_GRID_ITEMS = 36;

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('scaleDown', [
      state(
        'open',
        style({
          opacity: 1,
          display: 'block',
          transform: 'scaleY(1)',
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
          transform: 'scaleY(0)',
        })
      ),
      transition('open => *', [animate('200ms ease-in')]),
      transition('* => open', [animate('200ms ease-out')]),
    ]),
  ],
})
export class CustomDatepickerComponent
  implements AfterContentInit, OnDestroy, ControlValueAccessor
{
  @Input() label?: string;
  @Input() classes?: string | string[];

  DATE_MEDIUM_FORMAT = 'MMM yyyy';
  DATE_FULL_FORMAT = 'dd MMM yyyy';

  visible = false;
  disabled = false;

  value!: string;
  onTouched!: () => void;
  onChange!: (value: string) => void;

  // TODO: return to using observables
  displayedDay = 0;
  month = 0;
  year = 0;
  // ISODate = '';
  daysInMonth: Day[] = [];

  private readonly monthValueChanges$ = new Subject<number>();
  private readonly destroyed$ = new Subject<void>();

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (ngControl !== null) {
      ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit(): void {
    const control = this.ngControl.control;

    if (control === null) return;

    merge(of(control.value), control.valueChanges)
      .pipe(
        distinctUntilChanged(),
        map(this.parseISODate),
        takeUntil(this.destroyed$)
      )
      .subscribe((value) => this.setInitialValues(value));

    merge(of(this.month), this.monthValueChanges$)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.daysInMonth = this.getDaysInMonth(this.year, this.month);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  writeValue(date: string): void {
    this.value = date;
  }

  registerOnChange(fn: (date: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClickOutside(): void {
    this.visible = false;
  }

  toggle(): void {
    if (!this.disabled) {
      this.visible = !this.visible;
    }
  }

  setDate(day: Day) {
    this.displayedDay = day.value;

    if (day.next) {
      this.incrementMonth();
    }

    this.onChange(this.ISODate);
    this.writeValue(this.ISODate);

    this.toggle();
  }

  incrementMonth(): void {
    const nextMonth = (this.month + 1) % LAST_MONTH;

    if (!nextMonth) {
      this.month = LAST_MONTH;
    } else if (nextMonth === Months.January) {
      this.incrementYear();
      this.month = nextMonth;
    } else {
      this.month = nextMonth;
    }

    this.monthValueChanges$.next(nextMonth);
  }

  decrementMonth(): void {
    const previousMonth = (this.month - 1) % LAST_MONTH;

    if (previousMonth) {
      this.month = previousMonth;
    } else {
      this.decrementYear();
      this.month = LAST_MONTH;
    }

    this.monthValueChanges$.next(previousMonth);
  }

  private parseISODate(date: string): number[] {
    return date.split('-').map(Number);
  }

  private setInitialValues(date: number[]): void {
    const [year, month, day] = date;

    this.year = year;
    this.month = month;
    this.displayedDay = day;
  }

  private getISODate(year: number, month: number, day: number): string {
    return DateTime.utc(year, month, day).toISODate();
  }

  private getDaysInMonth(year: number, month: number): Day[] {
    const days = DateTime.local(year, month).daysInMonth;

    return range(1, MAX_GRID_ITEMS).map((item) => ({
      value: item % days,
      next: item > days,
    }));
  }

  private incrementYear(): void {
    this.year++;
  }

  private decrementYear(): void {
    this.year--;
  }

  get ISODate(): string {
    return this.getISODate(this.year, this.month, this.displayedDay);
  }

  get selectedMonth(): number {
    return this.parseISODate(this.value)[1];
  }
}
