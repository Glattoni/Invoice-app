import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [ButtonComponent],
})
export class ButtonsModule {}
