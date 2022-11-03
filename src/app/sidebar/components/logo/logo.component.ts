import { AngularSvgIconModule } from 'angular-svg-icon';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [AngularSvgIconModule],
  template: `
    <div class="logo">
      <svg-icon class="logo__icon" src="assets/icons/logo.svg"></svg-icon>
    </div>
  `,
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {}
