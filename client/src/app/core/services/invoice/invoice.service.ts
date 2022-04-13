import {
  of,
  map,
  catchError,
  withLatestFrom,
  Observable,
  ReplaySubject,
  BehaviorSubject,
} from 'rxjs';

import { Injectable } from '@angular/core';
import { Invoice } from '@shared/models/invoice.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoicesUrl = 'http://localhost:3000/api/v1/invoices';

  private invoice = new ReplaySubject<Invoice>();
  private invoices = new BehaviorSubject<Invoice[]>([]);
  private selectedFilter = new ReplaySubject<string>();
  private filteredInvoices = new BehaviorSubject<Invoice[]>([]);

  readonly invoice$ = this.invoice.asObservable();
  readonly invoices$ = this.invoices.asObservable();
  readonly selectedFilter$ = this.selectedFilter.asObservable();
  readonly filteredInvoices$ = this.filteredInvoices.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  getInvoices() {
    this.http
      .get<Invoice[]>(this.invoicesUrl)
      .pipe(catchError(this.handleError<Invoice[]>()))
      .subscribe((value) => {
        this.invoices.next(value);
        this.filteredInvoices.next(value);
      });
  }

  getInvoice(id: string) {
    const url = `${this.invoicesUrl}/${id}`;

    this.http
      .get<Invoice>(url)
      .pipe(catchError(this.handleError<Invoice>()))
      .subscribe((value) => this.invoice.next(value));
  }

  createInvoice(body: Invoice) {
    this.http
      .post<Invoice>(this.invoicesUrl, body, this.httpOptions)
      .pipe(
        withLatestFrom(this.invoices),
        map(([created, current]) => [...current, created]),
        catchError(this.handleError<Invoice[]>())
      )
      .subscribe((value) => {
        this.invoices.next(value);
        this.filteredInvoices.next(value);
      });
  }

  deleteInvoice(id: string) {
    const url = `${this.invoicesUrl}/${id}`;

    this.http
      .delete<Invoice>(url, this.httpOptions)
      .pipe(
        withLatestFrom(this.invoices),
        map(([deleted, current]) =>
          current.filter((invoice) => invoice._id !== deleted._id)
        ),
        catchError(this.handleError<Invoice[]>())
      )
      .subscribe((value) => {
        this.invoices.next(value);
        this.filteredInvoices.next(value);
      });
  }

  markAsPaidInvoice(id: string) {
    const url = `${this.invoicesUrl}/${id}`;
    const body = { status: 'paid' };

    this.http
      .patch<Invoice>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError<Invoice>()))
      .subscribe((value) => this.invoice.next(value));
  }

  filterByStatus(status: string) {
    this.selectedFilter.next(status);
    this.invoices$
      .pipe(
        map((invoices) =>
          invoices.filter((invoice) => invoice.status === status)
        ),
        catchError(this.handleError<Invoice[]>())
      )
      .subscribe((value) => this.filteredInvoices.next(value));
  }
}
