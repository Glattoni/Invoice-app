import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private portal = new Subject<ComponentPortal<any>>();
  readonly portal$ = this.portal.asObservable();

  setPortal(portal: ComponentPortal<any>): void {
    this.portal.next(portal);
  }
}
