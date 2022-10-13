import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceStatus } from '@shared/constants/invoice.constants';

@Component({
  selector: 'app-invoice-state',
  template: `
    <div [ngClass]="variant">
      <span>{{ variant }}</span>
    </div>
  `,
  styleUrls: ['./invoice-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceStateComponent {
  @Input() public variant: InvoiceStatus = 'pending';
}
