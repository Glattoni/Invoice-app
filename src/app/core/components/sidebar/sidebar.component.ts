import { map, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme/theme.service';
import { Theme } from '@core/services/theme/theme.service.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public activeTheme$: Observable<string>;

  constructor(private themeService: ThemeService) {
    this.activeTheme$ = this.themeService.activeTheme$;
  }

  public get isDarkTheme$(): Observable<boolean> {
    return this.activeTheme$.pipe(map((value) => value === Theme.Dark));
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
