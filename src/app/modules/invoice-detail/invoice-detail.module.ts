import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { InvoiceDetailRoutingModule } from './invoice-detail-routing.module';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { BodyComponent } from './components/body/body.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { InvoiceDetailPageComponent } from './invoice-detail-page.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MarkAsPaidDialogComponent } from './components/mark-as-paid-dialog/mark-as-paid-dialog.component';

@NgModule({
  declarations: [
    BodyComponent,
    TableComponent,
    HeaderComponent,
    DeleteDialogComponent,
    MarkAsPaidDialogComponent,
    InvoiceDetailPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonsModule,
    AngularSvgIconModule,
    InvoiceDetailRoutingModule,
  ],
})
export class InvoiceDetailModule {}
