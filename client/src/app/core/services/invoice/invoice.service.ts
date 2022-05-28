import {
  of,
  map,
  tap,
  iif,
  catchError,
  withLatestFrom,
  Observable,
  ReplaySubject,
  BehaviorSubject,
  mergeMap,
} from 'rxjs';

import { Injectable } from '@angular/core';
import { Invoice } from '@shared/models/invoice.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly invoicesUrl = 'http://localhost:3000/api/v1/invoices';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private invoice = new ReplaySubject<Invoice>();
  private invoices = new BehaviorSubject<Invoice[]>([]);
  private selectedFilter = new ReplaySubject<string>();
  private filteredInvoices = new BehaviorSubject<Invoice[]>([]);

  readonly invoice$ = this.invoice.asObservable();
  readonly invoices$ = this.invoices.asObservable();
  readonly selectedFilter$ = this.selectedFilter.asObservable();
  readonly filteredInvoices$ = this.filteredInvoices.asObservable();

  constructor(private http: HttpClient) {}

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

  updateInvoice(id: string, body: Invoice) {
    const url = `${this.invoicesUrl}/${id}`;

    this.http
      .patch<Invoice>(url, body, this.httpOptions)
      .pipe(
        tap((invoice) => this.invoice.next(invoice)),
        withLatestFrom(this.invoices),
        map(([patched, invoices]) => [...invoices, patched]),
        map((invoices) =>
          invoices.filter(
            (invoice, index, self) =>
              self.findIndex((item) => item._id === invoice._id) === index
          )
        ),
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
        map(([deleted, invoices]) =>
          invoices.filter((invoice) => invoice._id !== deleted._id)
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
        mergeMap((invoices) =>
          iif(
            () => status === 'all',
            of(invoices),
            of(invoices.filter((invoice) => invoice.status === status))
          )
        ),
        catchError(this.handleError<Invoice[]>())
      )
      .subscribe((value) => this.filteredInvoices.next(value));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
