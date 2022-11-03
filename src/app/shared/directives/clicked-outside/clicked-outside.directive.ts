import { Subject, fromEvent, filter, takeUntil } from 'rxjs';

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

@Directive({
  standalone: true,
  selector: '[clickOutside]',
})
export class ClickedOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() public readonly clickOutside = new EventEmitter<void>();

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly element: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  public ngAfterViewInit(): void {
    fromEvent(this.document, 'click')
      .pipe(
        takeUntil(this.destroyed$),
        filter((event) => !this.element.nativeElement.contains(event.target))
      )
      .subscribe(() => this.clickOutside.emit());
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
