import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopPanelComponent } from './view-invoice/components/top-panel/top-panel.component';

const routes: Routes = [{ path: '', component: TopPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewInvoiceRoutingModule {}
