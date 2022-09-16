import { DateTime } from 'luxon';

import {
  of,
  map,
  tap,
  catchError,
  withLatestFrom,
  Observable,
  ReplaySubject,
  BehaviorSubject,
} from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Invoice, Invoices, NewInvoice } from '@shared/models/invoice.model';
import { httpOptions, baseUrl } from './invoice.service.constants';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoice = new ReplaySubject<Invoice>();
  private invoices = new BehaviorSubject<Invoice[]>([]);
  private filteredAmount = new BehaviorSubject<number>(0);
  private selectedFilter = new BehaviorSubject<string | undefined>(undefined);
  private filteredInvoices = new BehaviorSubject<Invoice[]>([]);

  readonly invoice$ = this.invoice.asObservable();
  readonly invoices$ = this.invoices.asObservable();
  readonly filteredAmount$ = this.filteredAmount.asObservable();
  readonly selectedFilter$ = this.selectedFilter.asObservable();
  readonly filteredInvoices$ = this.filteredInvoices.asObservable();

  constructor(private http: HttpClient) {
    this.filteredInvoices.subscribe((invoices) => {
      this.filteredAmount.next(invoices.length);
    });
  }

  public getInvoices(): void {
    this.http
      .get<Invoices>(baseUrl)
      .pipe(
        map(({ invoices }) => invoices),
        map(this.sortByNewest),
        catchError(this.handleError<Invoice[]>())
      )
      .subscribe((invoices) => {
        this.invoices.next(invoices);
        this.filteredInvoices.next(invoices);
      });
  }

  public getInvoice(id: string): void {
    const url = `${baseUrl}/${id}`;

    this.http
      .get<Invoice>(url)
      .pipe(catchError(this.handleError<Invoice>()))
      .subscribe((value) => this.invoice.next(value));
  }

  public createInvoice(body: NewInvoice): void {
    this.http
      .post<Invoice>(baseUrl, body, httpOptions)
      .pipe(
        withLatestFrom(this.invoices),
        map(([created, current]) => [...current, created]),
        map(this.sortByNewest),
        catchError(this.handleError<Invoice[]>())
      )
      .subscribe((value) => {
        this.invoices.next(value);
        this.filteredInvoices.next(value);
      });
  }

  public updateInvoice(id: string, body: NewInvoice): void {
    const url = `${baseUrl}/${id}`;

    this.http
      .patch<Invoice>(url, body, httpOptions)
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

  public deleteInvoice(id: string): void {
    const url = `${baseUrl}/${id}`;

    this.http
      .delete<Invoice>(url, httpOptions)
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

  public markAsPaidInvoice(id: string): void {
    const url = `${baseUrl}/${id}`;
    const body = { status: 'paid' };

    this.http
      .patch<Invoice>(url, body, httpOptions)
      .pipe(catchError(this.handleError<Invoice>()))
      .subscribe((value) => this.invoice.next(value));
  }

  public filterByStatus(status: string): void {
    this.invoices$
      .pipe(
        tap(() => this.selectedFilter.next(status)),
        map((invoices) =>
          invoices.filter((invoice) => invoice.status === status)
        ),
        catchError(this.handleError<Invoice[]>())
      )
      .subscribe((value) => this.filteredInvoices.next(value));
  }

  public resetFilter(): void {
    this.selectedFilter.next(undefined);
    this.invoices$
      .pipe(catchError(this.handleError<Invoice[]>()))
      .subscribe((value) => this.filteredInvoices.next(value));
  }

  private sortByNewest(invoices: Invoice[]): Invoice[] {
    return invoices.sort(
      (a, b) =>
        DateTime.fromISO(b.createdAt).toUnixInteger() -
        DateTime.fromISO(a.createdAt).toUnixInteger()
    );
  }

  private handleError<T>(result?: T): (error: unknown) => Observable<T> {
    return (error: unknown) => {
      console.log(error);
      return of(result as T);
    };
  }
}
