import { Component } from '@angular/core';
import { ScrollService } from '@core/services/scroll/scroll.service';
import { SidebarFormService } from '@core/services/sidebar-form/sidebar-form.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  visible$: Observable<boolean>;

  constructor(
    private sidebarFormService: SidebarFormService,
    private scrollService: ScrollService
  ) {
    this.visible$ = this.sidebarFormService.visible$;
  }

  closeSidebar(): void {
    this.sidebarFormService.close();
  }

  onScroll(event: any) {
    this.scrollService.onScroll(event);
  }
}
