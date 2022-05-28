import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BillingFormModule } from './modules/billing-form/billing-form.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    CoreModule,
    BillingFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
