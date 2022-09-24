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
      transform: 'translateY(0) scaleY(1)',
    })
  ),
  state(
    'close',
    style({
      opacity: 0,
      transform: 'translateY(-10%) scaleY(0)',
    })
  ),
  transition('open => *', [animate('200ms ease-in')]),
  transition('* => open', [animate('200ms ease-out')]),
]);
