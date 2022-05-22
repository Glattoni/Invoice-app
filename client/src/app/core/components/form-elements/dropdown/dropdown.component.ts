import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() paymentDue?: string;
  @Input() availableOptions: option[] = [];

  isVisible: boolean = false;
  selectedOption?: option;

  ngOnInit(): void {
    if (this.paymentDue) {
      this.selectedOption = this.availableOptions.find(
        (option) => option.label === this.paymentDue
      );
    }
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  selectOption(id: string): void {
    this.selectedOption = this.availableOptions.find(
      (option) => option.id === id
    );
    this.toggleVisibility();
  }
}

type option = { id: string; label: string };
