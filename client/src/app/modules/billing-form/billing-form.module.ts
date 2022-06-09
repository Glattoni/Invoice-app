import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { BillingFormComponent } from './components/billing-form/billing-form.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { InvoiceTermsComponent } from './components/invoice-terms/invoice-terms.component';
import { SenderAddressComponent } from './components/sender-address/sender-address.component';
import { ScrolledToBottomDirective } from './directives/scrolled-to-bottom.directive';
import { FormControlsModule } from '@modules/form-controls/form-controls.module';

@NgModule({
  declarations: [
    ItemsListComponent,
    ClientInfoComponent,
    BillingFormComponent,
    InvoiceTermsComponent,
    SenderAddressComponent,
    ScrolledToBottomDirective,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ButtonsModule,
    FormControlsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  exports: [BillingFormComponent],
})
export class BillingFormModule {}
