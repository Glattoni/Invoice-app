import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingFormComponent } from './billing-form.component';
import { SharedModule } from '@shared/shared.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsListComponent } from './components/items-list/items-list.component';

@NgModule({
  declarations: [BillingFormComponent, ItemsListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonsModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [BillingFormComponent],
})
export class BillingFormModule {}