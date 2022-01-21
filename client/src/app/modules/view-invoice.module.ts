import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewInvoiceRoutingModule } from './view-invoice-routing.module';
import { TopPanelComponent } from './view-invoice/components/top-panel/top-panel.component';

@NgModule({
  declarations: [TopPanelComponent],
  imports: [CommonModule, ViewInvoiceRoutingModule],
})
export class ViewInvoiceModule {}
