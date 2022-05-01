import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './components/modal/modal.component';
import { InvoiceStateComponent } from './components/invoice-state/invoice-state.component';

import { DatePipe } from './pipes/date/date.pipe';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';

@NgModule({
  declarations: [
    DatePipe,
    ModalComponent,
    InvoiceStateComponent,
    ClickedOutsideDirective,
  ],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [
    DatePipe,
    ModalComponent,
    InvoiceStateComponent,
    ClickedOutsideDirective,
  ],
})
export class SharedModule {}
