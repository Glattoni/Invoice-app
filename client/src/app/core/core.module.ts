import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BillingFormComponent } from './components/billing-form/billing-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../modules/buttons/buttons.module';

@NgModule({
  declarations: [SidebarComponent, BillingFormComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
  ],
  exports: [SidebarComponent, BillingFormComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
