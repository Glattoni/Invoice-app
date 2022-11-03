import { Component, inject } from '@angular/core';
import { ThemeService } from './sidebar/services/theme/theme.service';

@Component({
  selector: 'app-root',
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
