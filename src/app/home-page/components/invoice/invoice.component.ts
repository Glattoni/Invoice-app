import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { InvoiceStatus } from '@shared/constants/invoice.constants';
import { InvoiceStatusComponent } from '@shared/components/invoice-status/invoice-status.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, InvoiceStatusComponent],
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
