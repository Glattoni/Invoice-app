import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '@shared/models/invoice.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() public items: Item[] = [];
  @Input() public total = 0;
}
