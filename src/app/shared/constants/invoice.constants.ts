export const enum INVOICE_STATUS {
  PAID = 'paid',
  PENDING = 'pending',
  DRAFT = 'draft',
}

export const INVOICE_STATUSES = [
  INVOICE_STATUS.PAID,
  INVOICE_STATUS.PENDING,
  INVOICE_STATUS.DRAFT,
] as const;
