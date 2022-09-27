import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DATE_FORMAT } from '@shared/constants/date-formats.constants';
import { Address } from '@shared/models/invoice.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent {
  @Input() slug = '';
  @Input() description = '';
  @Input() createdAt = '';
  @Input() paymentDue = '';
  @Input() clientName = '';
  @Input() clientEmail = '';
  @Input() senderAddress = {} as Address;
  @Input() clientAddress = {} as Address;

  public get mailTo(): string {
    return `mailto:${this.clientEmail}`;
  }

  public readonly DATE_FORMAT = DATE_FORMAT;
}
