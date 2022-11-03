import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  standalone: true,
  selector: 'app-go-back',
  imports: [AngularSvgIconModule],
  template: `
    <button class="button" tabindex="0" [style.margin-bottom.rem]="bottom">
      <svg-icon
        src="assets/icons/chevron.svg"
        [svgStyle]="{ transform: 'rotate(90deg)' }"
      >
      </svg-icon>
      <span class="button__text">Go back</span>
    </button>
  `,
  styleUrls: ['./go-back.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoBackComponent {
  @Input() public bottom = 0;
}
