import { Component, Input } from '@angular/core';
import { Address } from '@shared/models/invoice.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  @Input() slug?: string;
  @Input() description?: string;
  @Input() createdAt?: string;
  @Input() paymentDue?: string;
  @Input() clientName?: string;
  @Input() clientEmail?: string;
  @Input() senderAddress?: Address;
  @Input() clientAddress?: Address;
}
