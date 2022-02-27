import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  of,
  catchError,
  Observable,
  ReplaySubject,
  BehaviorSubject,
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
      .pipe(catchError(this.handleError<Invoice[]>()))
      .subscribe((value) => this.invoices.next(value));
  }

  getInvoice(id: string) {
    const url = `${this.invoicesUrl}/${id}`;

    this.http
      .get<Invoice>(url)
      .pipe(catchError(this.handleError<Invoice>()))
      .subscribe((value) => this.invoice.next(value));
  }

  deleteInvoice(id: string) {
    const url = `${this.invoicesUrl}/${id}`;
    const currentValue = this.invoices.getValue();

    this.http
      .delete<Invoice>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Invoice>()))
      .subscribe((value) => {
        const updatedValue = currentValue.filter(
          (invoice) => invoice._id !== value._id
        );
        this.invoices.next(updatedValue);
      });
  }

  markAsPaidInvoice(id: string) {
    const url = `${this.invoicesUrl}/${id}`;

    this.http
      .patch<Invoice>(url, { status: 'paid' }, this.httpOptions)
      .pipe(catchError(this.handleError<Invoice>()))
      .subscribe((value) => this.invoice.next(value));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
