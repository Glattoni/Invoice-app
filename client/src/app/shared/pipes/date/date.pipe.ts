import { Pipe, PipeTransform } from '@angular/core';
import { Months } from './months';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: string): string {
    let [year, month, day] = value.split('-');
    month = Months.get(Number(month))?.slice(0, 3)!;
    return `Due ${day} ${month} ${year}`;
  }
}
