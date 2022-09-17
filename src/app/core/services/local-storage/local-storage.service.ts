import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public getItem(value: string): unknown {
    const item = localStorage.getItem(value);
    return item && JSON.parse(item);
  }

  public setItem(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}