import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary',
})
export class SummaryPipe implements PipeTransform {
  transform(number: number = 0, filter: string | null) {
    let result;

    if (number === 0) {
      result = 'No invoices';
    }
    if (!filter) {
      result = `There are ${number} total invoices`;
    }
    if (!filter && number === 1) {
      result = `There is 1 total invoice`;
    }
    if (filter && number === 1) {
      result = `There is 1 ${filter} invoice`;
    }
    if (filter && number > 1) {
      result = `There are ${number} ${filter} invoices`;
    }

    return result;
  }
}
