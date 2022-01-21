import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceDetailRoutingModule } from './invoice-detail-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InvoiceDetailPageComponent } from './pages/invoice-detail-page.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [InvoiceDetailPageComponent, HeaderComponent],
  imports: [
    CommonModule,
    InvoiceDetailRoutingModule,
    SharedModule,
    AngularSvgIconModule,
  ],
})
export class InvoiceDetail {}
