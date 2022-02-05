import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { InvoiceStateComponent } from './components/invoice-state/invoice-state.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DatePipe } from './pipes/date/date.pipe';
import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InvoiceStateComponent,
    DatePipe,
    GoBackButtonComponent,
    ModalComponent,
  ],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [
    ButtonComponent,
    InvoiceStateComponent,
    DatePipe,
    GoBackButtonComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
