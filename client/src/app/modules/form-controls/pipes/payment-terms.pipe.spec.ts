import { PaymentTermsPipe } from './payment-terms.pipe';

describe('PaymentTermsPipe', () => {
  const pipe = new PaymentTermsPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform when amount is 1', () => {
    expect(pipe.transform(1)).toBe('Next 1 day');
  });

  it('should transform when amount is other than 1', () => {
    expect(pipe.transform(7)).toBe('Next 7 days');
    expect(pipe.transform(14)).toBe('Next 14 days');
    expect(pipe.transform(30)).toBe('Next 30 days');
  });
});
