import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { BillingFormComponent } from './billing-form.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { InvoiceTermsComponent } from './components/invoice-terms/invoice-terms.component';
import { SenderAddressComponent } from './components/sender-address/sender-address.component';
import { ScrolledToBottomDirective } from './directives/scrolled-to-bottom.directive';
import { FormControlsModule } from '../form-controls/form-controls.module';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';

@NgModule({
  declarations: [
    ItemsListComponent,
    ClientInfoComponent,
    BillingFormComponent,
    InvoiceTermsComponent,
    SenderAddressComponent,
    ScrolledToBottomDirective,
    FormHeaderComponent,
    ActionButtonsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    FormControlsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  exports: [BillingFormComponent],
})
export class BillingFormModule {}
