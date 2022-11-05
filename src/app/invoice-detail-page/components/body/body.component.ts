import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Address } from '@shared/models/invoice.model';
import { DATE_FORMAT } from '@shared/constants/date-formats.constants';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
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
