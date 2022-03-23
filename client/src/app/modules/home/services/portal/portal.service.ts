import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private _portal = new Subject<ComponentPortal<any>>();
  readonly portal$ = this._portal.asObservable();

  setPortal(portal: ComponentPortal<any>): void {
    this._portal.next(portal);
  }
}
