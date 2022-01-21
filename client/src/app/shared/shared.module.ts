import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { InvoiceStateComponent } from './components/invoice-state/invoice-state.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DatePipe } from './pipes/date/date.pipe';

@NgModule({
  declarations: [ButtonComponent, InvoiceStateComponent, DatePipe],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [ButtonComponent, InvoiceStateComponent, DatePipe],
})
export class SharedModule {}
