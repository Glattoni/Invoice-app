import {
  state,
  style,
  animate,
  trigger,
  transition,
} from '@angular/animations';

export const scaleDown = trigger('scaleDown', [
  state(
    'open',
    style({
      opacity: 1,
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
]);

export const slideInOut = trigger('slideInOut', [
  state(
    'open',
    style({
      opacity: 1,
      transform: 'none',
    })
  ),
  state(
    'close',
    style({
      opacity: 0,
      transform: 'translateX(-100%)',
    })
  ),
  transition('open => *', [animate('300ms ease-in')]),
  transition('* => open', [animate('300ms ease-out')]),
]);

export const fadeInOut = trigger('fadeInOut', [
  state(
    'open',
    style({
      zIndex: 'var(--z-overlay)',
      opacity: 1,
    })
  ),
  state(
    'close',
    style({
      zIndex: -1,
      opacity: 0,
    })
  ),
  transition('open => *', [animate('300ms ease-in')]),
  transition('* => open', [animate('300ms ease-out')]),
]);
