import { Subject, fromEvent, takeUntil, throttleTime } from 'rxjs';

import {
  Output,
  Directive,
  OnDestroy,
  ElementRef,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[scrolledToBottom]',
})
export class ScrolledToBottomDirective implements AfterViewInit, OnDestroy {
  @Output() public scrolledToBottom = new EventEmitter<boolean>();

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly element: ElementRef) {}

  public ngAfterViewInit(): void {
    fromEvent(this.element.nativeElement, 'scroll', this.onScroll)
      .pipe(throttleTime(25), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.scrolledToBottom.emit(value);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onScroll({ target }: Event): boolean {
    const { offsetHeight, scrollTop, scrollHeight } = target as HTMLElement;
    return offsetHeight + scrollTop >= scrollHeight - 100;
  }
}
