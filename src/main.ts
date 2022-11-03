import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTES } from 'app/app.routes';
import { AppComponent } from 'app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(ROUTES),
      AngularSvgIconModule.forRoot(),
      HttpClientModule,
      ReactiveFormsModule,
      BrowserAnimationsModule
    ),
  ],
}).catch((error) => console.error(error));
