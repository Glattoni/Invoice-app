import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InvoiceStateComponent } from './components/invoice-state/invoice-state.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [ButtonComponent, InvoiceStateComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [ButtonComponent, InvoiceStateComponent],
})
export class SharedModule {}
