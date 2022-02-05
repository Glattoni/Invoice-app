import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceDetailRoutingModule } from './invoice-detail-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InvoiceDetailPageComponent } from './pages/invoice-detail-page.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    InvoiceDetailPageComponent,
    HeaderComponent,
    BodyComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    InvoiceDetailRoutingModule,
    SharedModule,
    AngularSvgIconModule,
  ],
})
export class InvoiceDetail {}
