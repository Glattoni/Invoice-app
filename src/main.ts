import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';

import { AppComponent } from 'app/app.component';
import { environment } from './environments/environment';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app/home-page/home-page.component').then(
        (module) => module.HomePageComponent
      ),
  },
  {
    path: 'invoices/:id',
    loadComponent: () =>
      import('./app/invoice-detail-page/invoice-detail-page.component').then(
        (module) => module.InvoiceDetailPageComponent
      ),
  },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      AngularSvgIconModule.forRoot(),
      HttpClientModule,
      ReactiveFormsModule,
      BrowserAnimationsModule
    ),
  ],
}).catch((error) => console.error(error));
