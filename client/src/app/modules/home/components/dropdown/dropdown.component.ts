import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  statuses: string[] = ['draft', 'pending', 'paid'];
  isVisible: boolean = false;

  toggleIsVisible(): void {
    this.isVisible === true
      ? (this.isVisible = false)
      : (this.isVisible = true);
  }
}
