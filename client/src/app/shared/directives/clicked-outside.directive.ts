import {
  Inject,
  Output,
  Directive,
  OnDestroy,
  ElementRef,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Subject, fromEvent, filter, takeUntil } from 'rxjs';

@Directive({
  selector: '[clickedOutside]',
})
export class ClickedOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<void>();

  private destroy$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    fromEvent(this.document, 'click')
      .pipe(
        filter((event) => !this.insideElement(event.target as HTMLElement)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private insideElement(element: HTMLElement) {
    return (
      element === this.element.nativeElement ||
      this.element.nativeElement.contains(element)
    );
  }
}
