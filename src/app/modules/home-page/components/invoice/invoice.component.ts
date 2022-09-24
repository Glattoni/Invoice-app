import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceComponent {
  @Input() id = '';
  @Input() slug = '';
  @Input() clientName = '';
  @Input() paymentDue = '';
  @Input() total = 0;
  @Input() status = '';
}
