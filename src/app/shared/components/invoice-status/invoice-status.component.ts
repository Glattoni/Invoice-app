import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceStatus } from '@shared/constants/invoice.constants';

@Component({
  selector: 'app-invoice-status',
  template: `
    <div [ngClass]="variant">
      <span>{{ variant }}</span>
    </div>
  `,
  styleUrls: ['./invoice-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceStatusComponent {
  @Input() public variant: InvoiceStatus = 'pending';
}
