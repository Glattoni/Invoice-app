import { SummaryPipe } from './summary.pipe';

describe('Pipe: summary', () => {
  const pipe = new SummaryPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform when amount is 0 and filter is absent', () => {
    expect(pipe.transform(0, null)).toBe('No invoices');
  });

  it('should transform when amount is 0 and filter is present', () => {
    expect(pipe.transform(0, 'draft')).toBe('No invoices');
  });

  it('should transform when filter is null', () => {
    expect(pipe.transform(5, null)).toBe('There are 5 total invoices');
  });

  it('should transform when filter is present', () => {
    expect(pipe.transform(5, 'pending')).toBe('There are 5 pending invoices');
  });

  it('should transform when amount is 1 and filter is null', () => {
    expect(pipe.transform(1, null)).toBe('There is 1 total invoice');
  });

  it('should transform when amount is 1 and filter is present', () => {
    expect(pipe.transform(1, 'paid')).toBe('There is 1 paid invoice');
  });
});
