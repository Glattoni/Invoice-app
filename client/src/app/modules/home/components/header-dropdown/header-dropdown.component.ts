import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.scss'],
})
export class HeaderDropdownComponent implements OnInit {
  statuses: string[] = ['draft', 'pending', 'paid'];
  isVisible: boolean = false;

  constructor() {}

  toggleIsVisible(): void {
    if (this.isVisible) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  }

  ngOnInit(): void {}
}
