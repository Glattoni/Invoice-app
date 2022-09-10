import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceStateComponent } from './components/invoice-state/invoice-state.component';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { ButtonsModule } from '@modules/buttons/buttons.module';

@NgModule({
  declarations: [
    DialogComponent,
    InvoiceStateComponent,
    ClickedOutsideDirective,
  ],
  imports: [CommonModule, AngularSvgIconModule, ButtonsModule],
  exports: [DialogComponent, InvoiceStateComponent, ClickedOutsideDirective],
})
export class SharedModule {}
