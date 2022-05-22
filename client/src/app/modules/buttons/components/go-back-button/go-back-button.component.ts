import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';

//TODO: move to separate file
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
    private sidebarFormService: SidebarFormService
  ) {}

  goBackOnePage(): void {
    this.location.back();
  }

  closeFormSidebar(): void {
    this.sidebarFormService.close();
  }

  get isLinkType() {
    return this.type === GoBack.Link;
  }
}
