import {
  state,
  style,
  animate,
  trigger,
  transition,
} from '@angular/animations';

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

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('300ms ease-in', style({ opacity: 1 })),
]);

const exitTransition = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate('300ms ease-out', style({ opacity: 0 })),
]);

export const fadeIn = trigger('fadeIn', [enterTransition]);
export const fadeOut = trigger('fadeOut', [exitTransition]);
