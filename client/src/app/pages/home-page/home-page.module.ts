import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { ButtonsModule } from '@shared/buttons/buttons.module';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, ButtonsModule, HomePageRoutingModule],
})
export class HomePageModule {}
