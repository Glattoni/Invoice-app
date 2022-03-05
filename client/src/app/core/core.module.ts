import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BillingFormComponent } from './components/billing-form/billing-form.component';
import { TextFieldComponent } from './components/form-elements/text-field/text-field.component';
import { DropdownComponent } from './components/form-elements/dropdown/dropdown.component';

@NgModule({
  declarations: [SidebarComponent, BillingFormComponent, TextFieldComponent, DropdownComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [SidebarComponent, BillingFormComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
