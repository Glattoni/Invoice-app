import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  statuses: string[] = ['draft', 'pending', 'paid'];
  isVisible: boolean = false;

  constructor() {}

  toggleIsVisible(): void {
    this.isVisible === true
      ? (this.isVisible = false)
      : (this.isVisible = true);
  }

  ngOnInit(): void {}
}
