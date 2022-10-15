import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailPageComponent } from './invoice-detail-page.component';

const routes: Routes = [{ path: '', component: InvoiceDetailPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceDetailRoutingModule {}
