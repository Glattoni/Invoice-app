import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Invoice } from '@shared/models/invoice.model';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss'],
})
export class GoBackButtonComponent {
  @Input() invoice?: Invoice;
  @Input() offset: string = '0';
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
