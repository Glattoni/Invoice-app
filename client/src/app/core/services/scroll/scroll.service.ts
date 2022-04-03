import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private _isBottom = new BehaviorSubject<boolean>(false);
  readonly isBottom$ = this._isBottom.asObservable();

  onScroll(e: any) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this._isBottom.next(true);
    } else {
      this._isBottom.next(false);
    }
  }
}
