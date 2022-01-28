import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() items?: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  @Input() total?: number;

  constructor() {}

  ngOnInit(): void {}
}
