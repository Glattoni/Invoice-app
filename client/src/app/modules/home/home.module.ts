import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { SummaryPipe } from './pipes/summary/summary.pipe';
import { PortalModule } from '@angular/cdk/portal';
import { ButtonsModule } from '../buttons/buttons.module';
import { BillingFormModule } from '@modules/billing-form/billing-form.module';

@NgModule({
  declarations: [
    SummaryPipe,
    HeaderComponent,
    InvoiceComponent,
    DropdownComponent,
    HomePageComponent,
    PlaceholderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortalModule,
    ButtonsModule,
    HomeRoutingModule,
    BillingFormModule,
    AngularSvgIconModule,
  ],
})
export class HomeModule {}
