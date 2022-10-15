import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <div class="logo">
      <svg-icon class="logo__icon" src="assets/icons/logo.svg"></svg-icon>
    </div>
  `,
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {}
