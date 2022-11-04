import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'paymentTerms',
})
export class PaymentTermsPipe implements PipeTransform {
  public transform(value: number): string {
    return `Next ${value} ${value === 1 ? 'day' : 'days'}`;
  }
}
