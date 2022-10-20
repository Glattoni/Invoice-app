import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { GoBackComponent } from './components/go-back/go-back.component';

@NgModule({
  declarations: [GoBackComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [GoBackComponent],
})
export class ButtonsModule {}
