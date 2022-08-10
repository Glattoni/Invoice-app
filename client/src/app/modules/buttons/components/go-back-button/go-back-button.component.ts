import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BillingFormService } from '@core/services/billing-form/billing-form.service';

export enum GoBack {
  Link = 'link',
  Button = 'button',
}

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss'],
})
export class GoBackButtonComponent {
  @Input() offset: string = '0rem';
  @Input() type?: GoBack = GoBack.Button;

  constructor(
    private location: Location,
    private formService: BillingFormService
  ) {}

  goBackOnePage(): void {
    this.location.back();
  }

  closeFormSidebar(): void {
    this.formService.close();
  }

  get isLinkType() {
    return this.type === GoBack.Link;
  }
}
