import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ThemeService } from 'app/services/theme/theme.service';
import { LogoComponent } from './components/logo/logo.component';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [AngularSvgIconModule, CommonModule, RouterModule, LogoComponent],
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
