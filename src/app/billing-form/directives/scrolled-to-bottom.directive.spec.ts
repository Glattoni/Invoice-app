import { ElementRef } from '@angular/core';
import { ScrolledToBottomDirective } from './scrolled-to-bottom.directive';

describe('Directive: scrolledToBottom', () => {
  let nativeEl: ElementRef<HTMLDivElement>;

  it('should create an instance', () => {
    const directive = new ScrolledToBottomDirective(nativeEl);
    expect(directive).toBeTruthy();
  });
});
