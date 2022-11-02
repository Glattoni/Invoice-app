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
  @Input() public slug = '';
  @Input() public description = '';
  @Input() public createdAt = '';
  @Input() public paymentDue = '';
  @Input() public clientName = '';
  @Input() public clientEmail = '';
  @Input() public senderAddress = {} as Address;
  @Input() public clientAddress = {} as Address;

  public get mailTo(): string {
    return `mailto:${this.clientEmail}`;
  }

  public readonly DATE_FORMAT = DATE_FORMAT;
}
