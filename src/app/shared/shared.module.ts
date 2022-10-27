import { AngularSvgIconModule } from 'angular-svg-icon';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoBackComponent } from './components/go-back/go-back.component';
import { InvoiceStatusComponent } from './components/invoice-status/invoice-status.component';

import { AnimateDialogDirective } from './directives/animate-dialog/animate-dialog.directive';
import { ClickedOutsideDirective } from './directives/clicked-outside/clicked-outside.directive';
import { DisabledControlDirective } from './directives/disabled-control/disabled-control.directive';

@NgModule({
  declarations: [
    GoBackComponent,
    InvoiceStatusComponent,
    ClickedOutsideDirective,
    DisabledControlDirective,
    AnimateDialogDirective,
  ],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [
    GoBackComponent,
    InvoiceStatusComponent,
    ClickedOutsideDirective,
    DisabledControlDirective,
    AnimateDialogDirective,
  ],
})
export class SharedModule {}
