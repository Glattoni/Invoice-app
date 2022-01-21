import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceViewComponent } from './pages/invoice-view.component';

const routes: Routes = [{ path: '', component: InvoiceViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewInvoiceRoutingModule {}
