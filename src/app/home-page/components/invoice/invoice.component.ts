import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceStatus } from '@shared/constants/invoice.constants';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceComponent {
  @Input() public id = '';
  @Input() public slug = '';
  @Input() public clientName = '';
  @Input() public paymentDue = '';
  @Input() public total = 0;
  @Input() public status: InvoiceStatus = 'pending';
}
