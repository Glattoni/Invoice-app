import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { HomePageComponent } from './pages/home-page.component';
import { SummaryPipe } from './pipes/summary/summary.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    DropdownComponent,
    InvoiceComponent,
    PlaceholderComponent,
    HomePageComponent,
    SummaryPipe,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularSvgIconModule,
    SharedModule,
  ],
})
export class HomeModule {}
