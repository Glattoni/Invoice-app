import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-placeholder',
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
