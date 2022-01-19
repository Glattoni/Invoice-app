import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private baseUrl = 'http://localhost:3000/api/v1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/invoices`)
      .pipe(tap((_) => console.log('fetched heroes')));
  }
}
