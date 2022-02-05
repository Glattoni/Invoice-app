import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Invoice } from '../../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoicesUrl = 'http://localhost:3000/api/v1/invoices';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoicesUrl);
  }

  getInvoice(id: string): Observable<Invoice> {
    const url = `${this.invoicesUrl}/${id}`;
    return this.http
      .get<Invoice>(url)
      .pipe(catchError(this.handleError<Invoice>()));
  }

  deleteInvoice(id: string): Observable<Invoice> {
    const url = `${this.invoicesUrl}/${id}`;
    return this.http
      .delete<Invoice>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Invoice>()));
  }

  markAsPaidInvoice(id: string): Observable<Invoice> {
    const url = `${this.invoicesUrl}/${id}`;
    return this.http.patch<Invoice>(url, { status: 'paid' }, this.httpOptions);
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
