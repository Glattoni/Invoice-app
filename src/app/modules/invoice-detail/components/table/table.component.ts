import { Component, Input } from '@angular/core';
import { Item } from '@shared/models/invoice.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() items?: Item[];
  @Input() total?: number;
}
