import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BillingFormComponent } from './billing-form/billing-form.component';
import { ThemeService } from './sidebar/services/theme/theme.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule, BillingFormComponent],
  template: `
    <div id="invoice-app" [attr.data-theme]="activeTheme$ | async">
      <app-sidebar></app-sidebar>

      <main>
        <router-outlet></router-outlet>
      </main>

      <app-billing-form></app-billing-form>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly activeTheme$ = inject(ThemeService).activeTheme$;
}
