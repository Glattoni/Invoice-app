import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { NewInvoiceComponent } from './pages/new-invoice/new-invoice.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'invoice/create', component: NewInvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
