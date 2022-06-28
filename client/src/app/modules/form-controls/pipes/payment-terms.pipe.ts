import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentTerms',
})
export class PaymentTermsPipe implements PipeTransform {
  transform(value: number) {
    if (value === 1) {
      return `Next ${value} day`;
    }
    return `Next ${value} days`;
  }
}
