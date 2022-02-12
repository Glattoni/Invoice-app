import { Component } from '@angular/core';
import { ThemeService } from '@features/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private themeService: ThemeService) {}

  getThemeIconPath(): string {
    const theme = this.themeService.getActiveTheme();
    return `assets/icons/icon-${theme.name === 'light' ? 'moon' : 'sun'}.svg`;
  }

  toggleTheme(): void {
    const theme = this.themeService.getActiveTheme();
    theme.name === 'light'
      ? this.themeService.setDarkTheme()
      : this.themeService.setLightTheme();
  }
}
