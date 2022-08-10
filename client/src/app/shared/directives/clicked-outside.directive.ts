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

import { fromEvent, filter, Subscription } from 'rxjs';

@Directive({
  selector: '[clickOutside]',
})
export class ClickedOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<void>();

  subscription?: Subscription;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.subscription = fromEvent(this.document, 'click')
      .pipe(filter((event) => !this.insideElement(event.target as HTMLElement)))
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private insideElement(element: HTMLElement): boolean {
    return (
      element === this.element.nativeElement ||
      this.element.nativeElement.contains(element)
    );
  }
}
