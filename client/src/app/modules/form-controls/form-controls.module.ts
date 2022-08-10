import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { PaymentTermsPipe } from './pipes/payment-terms.pipe';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { CustomDatepickerComponent } from './components/custom-datepicker/custom-datepicker.component';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomSelectComponent,
    PaymentTermsPipe,
    CustomDatepickerComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  exports: [
    CustomInputComponent,
    CustomSelectComponent,
    CustomDatepickerComponent,
  ],
})
export class FormControlsModule {}
