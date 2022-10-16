import { AngularSvgIconModule } from 'angular-svg-icon';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonsModule } from '@modules/buttons/buttons.module';
import { DialogBaseComponent } from './components/dialog-base/dialog-base.component';
import { InvoiceStatusComponent } from './components/invoice-status/invoice-status.component';
import { ClickedOutsideDirective } from './directives/clicked-outside/clicked-outside.directive';
import { DisabledControlDirective } from './directives/disabled-control/disabled-control.directive';

@NgModule({
  declarations: [
    DialogBaseComponent,
    InvoiceStatusComponent,
    ClickedOutsideDirective,
    DisabledControlDirective,
  ],
  imports: [CommonModule, AngularSvgIconModule, ButtonsModule],
  exports: [
    DialogBaseComponent,
    InvoiceStatusComponent,
    ClickedOutsideDirective,
    DisabledControlDirective, 
  ],
})
export class SharedModule {}
