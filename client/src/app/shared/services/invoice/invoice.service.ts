import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  Observable,
  ReplaySubject,
  BehaviorSubject,
  of,
  catchError,
} from 'rxjs';

import { Invoice } from '../../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoicesUrl = 'http://localhost:3000/api/v1/invoices';

  private invoice = new ReplaySubject<Invoice>();
  private invoices = new BehaviorSubject<Invoice[]>([]);

  readonly invoice$ = this.invoice.asObservable();
  readonly invoices$ = this.invoices.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getInvoices() {
    this.http
      .get<Invoice[]>(this.invoicesUrl)
      .subscribe((val) => this.invoices.next(val));
  }

  getInvoice(id: string) {
    const url = `${this.invoicesUrl}/${id}`;

    this.http
      .get<Invoice>(url)
      .pipe(catchError(this.handleError<Invoice>()))
      .subscribe((val) => this.invoice.next(val));
  }

  deleteInvoice(id: string) {
    const url = `${this.invoicesUrl}/${id}`;
    const currentValue = this.invoices.getValue();

    this.http
      .delete<Invoice>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Invoice>()))
      .subscribe((value) => {
        const newValue = currentValue.filter((inv) => inv._id !== value._id);
        this.invoices.next(newValue);
      });
  }

  markAsPaidInvoice(id: string) {
    const url = `${this.invoicesUrl}/${id}`;

    this.http
      .patch<Invoice>(url, { status: 'paid' }, this.httpOptions)
      .pipe(catchError(this.handleError<Invoice>()))
      .subscribe((val) => this.invoice.next(val));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
