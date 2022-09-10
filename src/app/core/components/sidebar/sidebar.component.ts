import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get themeIcon() {
    const theme = this.themeService.activeTheme;
    return `assets/icons/${theme === 'light' ? 'moon' : 'sun'}.svg`;
  }
}
