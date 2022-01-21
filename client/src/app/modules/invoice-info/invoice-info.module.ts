import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { ViewInvoiceRoutingModule } from './invoice-info-routing.module';
import { SharedModule } from '@shared/shared.module';
import { InvoiceViewComponent } from './pages/invoice-view.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [InvoiceViewComponent, TopPanelComponent],
  imports: [
    CommonModule,
    ViewInvoiceRoutingModule,
    SharedModule,
    AngularSvgIconModule,
  ],
})
export class ViewInvoiceModule {}
