import { Component } from '@angular/core';
import { ThemeService } from '@features/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private themeService: ThemeService) {}

  setThemeIcon(): string {
    if (this.themeService.isDarkTheme()) {
      return 'assets/icons/icon-sun.svg';
    }
    return 'assets/icons/icon-moon.svg';
  }

  toggleTheme(): void {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }
}
