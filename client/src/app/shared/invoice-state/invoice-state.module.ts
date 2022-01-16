import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceStateComponent } from './invoice-state.component';

@NgModule({
  declarations: [InvoiceStateComponent],
  imports: [CommonModule],
  exports: [InvoiceStateComponent],
})
export class InvoiceStateModule {}
