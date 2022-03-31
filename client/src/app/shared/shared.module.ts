import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './components/modal/modal.component';
import { InvoiceStateComponent } from './components/invoice-state/invoice-state.component';

import { DatePipe } from './pipes/date/date.pipe';

import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [ModalComponent, InvoiceStateComponent, DatePipe],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [ModalComponent, InvoiceStateComponent, DatePipe],
})
export class SharedModule {}
