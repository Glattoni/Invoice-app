import {
  Output,
  Directive,
  OnDestroy,
  ElementRef,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';

import { Subject, fromEvent, takeUntil, throttleTime } from 'rxjs';

@Directive({
  selector: '[scrolledToBottom]',
})
export class ScrolledToBottomDirective implements AfterViewInit, OnDestroy {
  @Output() scrolledToBottom = new EventEmitter<boolean>();

  private destroy$ = new Subject<void>();

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    fromEvent(this.element.nativeElement, 'scroll', this.onScroll)
      .pipe(throttleTime(25), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.scrolledToBottom.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onScroll({ target }: Event) {
    const { offsetHeight, scrollTop, scrollHeight } = target as HTMLElement;
    return offsetHeight + scrollTop >= scrollHeight - 100;
  }
}
