import { DateTime, Info } from 'luxon';
import { AngularSvgIconModule } from 'angular-svg-icon';

import {
  Subject,
  Observable,
  ReplaySubject,
  BehaviorSubject,
  of,
  map,
  tap,
  scan,
  range,
  merge,
  filter,
  switchMap,
  takeUntil,
  combineLatest,
  withLatestFrom,
} from 'rxjs';

import {
  Self,
  Input,
  Optional,
  OnDestroy,
  Component,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgControl, ControlValueAccessor } from '@angular/forms';

import { scaleDown } from '@shared/animations';
import { DATE_FORMAT } from '@shared/constants/date-formats.constants';

import { DatepickerGridComponent } from './datepicker-grid/datepicker-grid.component';
import { DatepickerHeaderComponent } from './datepicker-header/datepicker-header.component';

interface Day {
  value: number;
  next: boolean;
  selected: boolean;
}

type Action = 'INCREMENT' | 'DECREMENT' | 'DATE_SELECTION';

const LAST_MONTH = 12;
const MAX_GRID_ITEMS = 35;

const noop = (): any => undefined;

@Component({
  standalone: true,
  selector: 'app-datepicker',
  imports: [
    AngularSvgIconModule,
    CommonModule,
    DatepickerGridComponent,
    DatepickerHeaderComponent,
  ],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [scaleDown],
})
export class DatepickerComponent
  implements AfterContentInit, OnDestroy, ControlValueAccessor
{
  @Input() public label?: string;
  @Input() public classes?: string | string[];

  public value = '';
  public onTouched: () => void = noop;
  public onChange: (value: string) => void = noop;

  public readonly DATE_FORMAT = DATE_FORMAT;

  /**
   * Represents visibility state of picker
   */
  public visible = false;

  /**
   * Represents disabled state of form control
   */
  public disabled = false;

  /**
   * Represents currently displayed date
   */
  public ISODate = '';

  /**
   * Represents days of currently displayed month
   */
  public daysInMonth: Day[] = [];

  /**
   * Represents currently displayed year
   */
  public year$ = new BehaviorSubject<number>(0);

  /**
   * Represents currently displayed month
   */
  public month$ = new BehaviorSubject<number>(0);

  /**
   * Represents currently displayed day
   */
  public day$ = new BehaviorSubject<number>(0);

  /**
   * Represents currently selected year
   */
  private year = 0;

  /**
   * Represents currently selected month
   */
  private month = 0;

  /**
   * Represents currently selected day
   */
  private day = 0;

  /**
   * Represents the most recent action (increment | decrement | date selection)
   */
  private readonly recentAction$ = new ReplaySubject<Action>();

  private readonly destroyed$ = new Subject<void>();

  constructor(@Optional() @Self() public readonly ngControl: NgControl) {
    if (ngControl !== null) {
      ngControl.valueAccessor = this;
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public ngAfterContentInit(): void {
    this.onControlValueChanges();
    this.onMonthValueChanges();
    this.onDateValueChanges();
    this.onReachingNextYear();
    this.onReachingPrevYear();
  }

  public toggle(): void {
    if (!this.disabled) {
      this.visible = !this.visible;
    }
  }

  public onClickOutside(): void {
    this.visible = false;
    this.reset();
  }

  public writeValue(date: string): void {
    this.value = date;
  }

  public registerOnChange(fn: (date: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public selectDay(day: Day): void {
    this.day$.next(day.value);

    if (day.next) {
      this.operateMonth('INCREMENT');
      this.recentAction$.next('DATE_SELECTION');
    }
  }

  public selectDate(): void {
    this.recentAction$.next('DATE_SELECTION');

    this.onChange(this.ISODate);
    this.writeValue(this.ISODate);
  }

  /**
   * Performs month operations based on passed action. Can be either increment or decrement.
   */
  public operateMonth(action: Action): void {
    of(this.month$.value)
      .pipe(
        tap(() => this.recentAction$.next(action)),
        map((month) => (action === 'INCREMENT' ? month + 1 : month - 1)),
        map((month) => month % LAST_MONTH || LAST_MONTH),
        takeUntil(this.destroyed$)
      )
      .subscribe((month) => this.month$.next(month));
  }

  /**
   * Performs year operations based on passed action. Can be either increment or decrement
   */
  private operateYear(action: Action): void {
    of(this.year$.value)
      .pipe(
        map((year) => (action === 'INCREMENT' ? year + 1 : year - 1)),
        takeUntil(this.destroyed$)
      )
      .subscribe((year) => this.year$.next(year));
  }

  /**
   * Tracks months value changes and gets days of currently displayed month
   */
  private onMonthValueChanges(): void {
    combineLatest([this.year$, this.month$])
      .pipe(
        map(([year, month]) => this.getDaysInMonth(year, month)),
        switchMap((days) => days),
        takeUntil(this.destroyed$)
      )
      .subscribe((days) => (this.daysInMonth = days));
  }

  /**
   * Tracks year|moth|day value changes and updates ISO date
   */
  private onDateValueChanges(): void {
    combineLatest([this.year$, this.month$, this.day$])
      .pipe(
        map((date) => this.getISODate(...date)),
        takeUntil(this.destroyed$)
      )
      .subscribe((date) => (this.ISODate = date));
  }

  /**
   * Tracks form control value changes and updates date values
   */
  private onControlValueChanges(): void {
    const control = this.ngControl?.control;

    if (control === null) return;

    merge(of(control?.value), control?.valueChanges)
      .pipe(map(this.parseISODate), takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.getControlValue(value);
      });
  }

  /**
   * Tracks month value changes. Increments year value if next year was reached.
   */
  private onReachingNextYear(): void {
    this.month$
      .pipe(
        filter(this.isJanuary),
        withLatestFrom(this.recentAction$),
        filter(([, action]) => action === 'INCREMENT'),
        takeUntil(this.destroyed$)
      )
      .subscribe(([, action]) => {
        this.operateYear(action);
      });
  }

  /**
   * Tracks month value changes. Decrements year value if previous year was reached.
   */
  private onReachingPrevYear(): void {
    this.month$
      .pipe(
        filter(this.isDecember),
        withLatestFrom(this.recentAction$),
        filter(([, action]) => action === 'DECREMENT'),
        takeUntil(this.destroyed$)
      )
      .subscribe(([, action]) => {
        this.operateYear(action);
      });
  }

  /**
   * Parses ISO date to a number array of type [year, month, day]
   */
  private parseISODate(date: string): number[] {
    return date.split('-').map(Number);
  }

  /**
   * Destructures ISO date and sets date values accordingly
   */
  private getControlValue(date: number[]): void {
    const [year, month, day] = date;

    this.year = year;
    this.month = month;
    this.day = day;

    this.year$.next(year);
    this.month$.next(month);
    this.day$.next(day);
  }

  /**
   * Converts UTC to ISO date
   */
  private getISODate(year: number, month: number, day: number): string {
    return DateTime.utc(year, month, day).toISODate();
  }

  /**
   * Retrieves calendar days of passed month
   */
  private getDaysInMonth(year: number, month: number): Observable<Day[]> {
    const days = DateTime.local(year, month).daysInMonth;

    return range(0, MAX_GRID_ITEMS).pipe(
      scan(
        (acc, item) => [
          ...acc,
          {
            value: (item % days) + 1,
            next: item + 1 > days,
            selected:
              year === this.year &&
              month === this.month &&
              (item % days) + 1 === this.day,
          },
        ],
        [] as Day[]
      )
    );
  }

  public reset(): void {
    this.year$.next(this.year);
    this.month$.next(this.month);
    this.day$.next(this.day);
  }

  private isJanuary(month: number): boolean {
    return month === parseInt(Info.months('numeric')[0]);
  }

  private isDecember(month: number): boolean {
    return month === parseInt(Info.months('numeric')[11]);
  }
}
