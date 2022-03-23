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
import { NewInvoiceComponent } from './pages/new-invoice/new-invoice.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    HeaderComponent,
    DropdownComponent,
    InvoiceComponent,
    PlaceholderComponent,
    HomePageComponent,
    SummaryPipe,
    NewInvoiceComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularSvgIconModule,
    SharedModule,
    PortalModule,
  ],
})
export class HomeModule {}
