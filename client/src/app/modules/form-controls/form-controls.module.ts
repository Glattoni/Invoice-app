import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { PaymentTermsPipe } from './pipes/payment-terms.pipe';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DatepickerHeaderComponent } from './components/datepicker/datepicker-header/datepicker-header.component';
import { DatepickerGridComponent } from './components/datepicker/datepicker-grid/datepicker-grid.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  declarations: [
    TextInputComponent,
    SelectInputComponent,
    PaymentTermsPipe,
    DatepickerComponent,
    DatepickerHeaderComponent,
    DatepickerGridComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  exports: [TextInputComponent, SelectInputComponent, DatepickerComponent],
})
export class FormControlsModule {}
