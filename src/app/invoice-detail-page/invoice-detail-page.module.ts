import { AngularSvgIconModule } from 'angular-svg-icon';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { InvoiceDetailPageComponent } from './invoice-detail-page.component';
import { InvoiceDetailRoutingModule } from './invoice-detail-page-routing.module';

import { BodyComponent } from './components/body/body.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { MarkInvoiceComponent } from './components/mark-invoice/mark-invoice.component';
import { DeleteInvoiceComponent } from './components/delete-invoice/delete-invoice.component';

@NgModule({
  declarations: [
    BodyComponent,
    TableComponent,
    HeaderComponent,
    MarkInvoiceComponent,
    DeleteInvoiceComponent,
    InvoiceDetailPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    InvoiceDetailRoutingModule,
  ],
})
export class InvoiceDetailPageModule {}
