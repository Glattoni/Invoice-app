import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './pages/home-view.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HeaderDropdownComponent } from './components/header-dropdown/header-dropdown.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';
import { InvoiceComponent } from './components/invoice/invoice.component';

@NgModule({
  declarations: [
    HomeViewComponent,
    HeaderComponent,
    HeaderDropdownComponent,
    InvoiceComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularSvgIconModule,
    SharedModule,
  ],
  exports: [HomeViewComponent],
})
export class HomeModule {}