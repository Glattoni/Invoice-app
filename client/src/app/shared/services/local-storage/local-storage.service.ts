import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem(val: string) {
    const item = localStorage.getItem(val);
    if (!item) return null;
    return item;
  }

  setItem(name: string, value: any): void {
    localStorage.setItem(name, JSON.stringify(value));
  }
}
