import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary',
})
export class SummaryPipe implements PipeTransform {
  transform(amount: number, filter: string | null) {
    let result;

    if (!filter) {
      result = `There are ${amount} total invoices`;
    }
    if (!filter && amount === 1) {
      result = `There is 1 total invoice`;
    }
    if (filter && amount === 1) {
      result = `There is 1 ${filter} invoice`;
    }
    if (filter && amount > 1) {
      result = `There are ${amount} ${filter} invoices`;
    }

    return result;
  }
}
