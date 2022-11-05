import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-page/home-page.component').then(
        (module) => module.HomePageComponent
      ),
  },
  {
    path: 'invoices/:id',
    loadComponent: () =>
      import('./invoice-detail-page/invoice-detail-page.component').then(
        (module) => module.InvoiceDetailPageComponent
      ),
  },
];
