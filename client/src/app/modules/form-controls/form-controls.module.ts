import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';

@NgModule({
  declarations: [CustomInputComponent, CustomSelectComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  exports: [CustomInputComponent, CustomSelectComponent],
})
export class FormControlsModule {}
