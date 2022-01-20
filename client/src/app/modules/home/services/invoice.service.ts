import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Invoice } from './invoice';

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

  getInvoices(): Observable<Invoice[]> {
    return this.http
      .get<{ invoices: Invoice[] }>(`${this.baseUrl}/invoices`)
      .pipe(map((value) => value.invoices));
  }
}
