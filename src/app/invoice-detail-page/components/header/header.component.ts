import { CommonModule } from '@angular/common';
import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { InvoiceStatus } from '@shared/constants/invoice.constants';
import { InvoiceStatusComponent } from '@shared/components/invoice-status/invoice-status.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, InvoiceStatusComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() public status: InvoiceStatus = 'pending';

  @Output() public edit = new EventEmitter<void>();
  @Output() public delete = new EventEmitter<void>();
  @Output() public markAsPaid = new EventEmitter<void>();

  public get isPaid(): boolean {
    return this.status === 'paid';
  }
}
