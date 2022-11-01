import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly themeService = inject(ThemeService);

  public get isDarkTheme(): boolean {
    return this.themeService.isDarkTheme;
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
