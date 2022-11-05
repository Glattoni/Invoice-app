import { ElementRef } from '@angular/core';
import { ClickedOutsideDirective } from './clicked-outside.directive';

describe('Directive: ClickOutside', () => {
  let nativeEl: ElementRef<HTMLDivElement>;

  it('should create an instance', () => {
    const directive = new ClickedOutsideDirective(nativeEl, document);
    expect(directive).toBeTruthy();
  });
});
