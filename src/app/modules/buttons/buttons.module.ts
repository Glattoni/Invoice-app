import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [GoBackButtonComponent, ButtonComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [GoBackButtonComponent, ButtonComponent],
})
export class ButtonsModule {}
