import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonsModule } from '../buttons/buttons.module';
import { HomeRoutingModule } from './home-routing.module';
import { BillingFormModule } from '@modules/billing-form/billing-form.module';

import { HomePageComponent } from './pages/home-page/home-page.component';

import { HeaderComponent } from './components/header/header.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    HeaderComponent,
    InvoiceComponent,
    DropdownComponent,
    HomePageComponent,
    PlaceholderComponent,
    CheckboxComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ButtonsModule,
    HomeRoutingModule,
    BillingFormModule,
    AngularSvgIconModule,
  ],
})
export class HomeModule {}
