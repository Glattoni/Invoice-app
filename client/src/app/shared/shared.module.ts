import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';
import { InvoiceStateComponent } from './components/invoice-state/invoice-state.component';
import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component';

import { DatePipe } from './pipes/date/date.pipe';
import { SummaryPipe } from './pipes/summary/summary.pipe';

import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    ModalComponent,
    ButtonComponent,
    InvoiceStateComponent,
    GoBackButtonComponent,
    DatePipe,
    SummaryPipe,
  ],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [
    ModalComponent,
    ButtonComponent,
    InvoiceStateComponent,
    GoBackButtonComponent,
    DatePipe,
    SummaryPipe,
  ],
})
export class SharedModule {}
