import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  template: `
    <div class="placeholder">
      <svg-icon
        class="placeholder__icon"
        src="/assets/icons/empty.svg"
      ></svg-icon>
      <h2 class="placeholder__title">There is nothing here</h2>
      <p class="placeholder__text">
        Create an invoice by clicking the
        <span class="placeholder__button-name">new <span>invoice</span></span>
        button and get started
      </p>
    </div>
  `,
  styleUrls: ['./placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {}
