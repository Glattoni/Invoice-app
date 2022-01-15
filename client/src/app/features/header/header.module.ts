import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderDropdownComponent } from './header-dropdown/header-dropdown.component';
import { ButtonsModule } from '@shared/buttons/buttons.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [HeaderComponent, HeaderDropdownComponent],
  imports: [CommonModule, ButtonsModule, AngularSvgIconModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
