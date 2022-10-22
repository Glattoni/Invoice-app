import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme/theme.service';
import { Theme } from '@core/services/theme/theme.service.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly activeTheme$: Observable<Theme>;

  constructor(private readonly themeService: ThemeService) {
    this.activeTheme$ = this.themeService.activeTheme$;
  }
}
