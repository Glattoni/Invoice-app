import {
  map,
  filter,
  Subject,
  takeUntil,
  fromEvent,
  switchMap,
  BehaviorSubject,
} from 'rxjs';

import {
  Output,
  Directive,
  OnDestroy,
  ElementRef,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appAnimateDialog]',
})
export class AnimateDialogDirective implements AfterViewInit, OnDestroy {
  @Output() public animationEnd = new EventEmitter<void>();

  private readonly destroy$ = new Subject<void>();
  private readonly nodeName$ = new BehaviorSubject<string>('');

  constructor(private readonly element: ElementRef) {}

  public ngAfterViewInit(): void {
    fromEvent(this.dialog, 'click')
      .pipe(
        map((event) => event.target as HTMLElement),
        map((element) => element.nodeName),
        filter((nodeName) => nodeName === 'DIALOG'),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.nodeName$.next(value);
        this.dialog.setAttribute('closing', '');
      });

    this.nodeName$
      .pipe(
        switchMap(() => fromEvent(this.dialog, 'animationend', { once: true })),
        switchMap(() => this.nodeName$),
        filter((nodeName) => nodeName === 'DIALOG'),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (this.dialog.hasAttribute('closing')) {
          this.dialog.removeAttribute('closing');
          this.dialog.close();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private get dialog(): HTMLDialogElement {
    return this.element.nativeElement as HTMLDialogElement;
  }
}
