import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { GoBackComponent } from './components/go-back/go-back.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [GoBackComponent, ButtonComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [GoBackComponent, ButtonComponent],
})
export class ButtonsModule {}
