import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss'],
})
export class GoBackButtonComponent {
  @Input() offset: string = '0';
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
