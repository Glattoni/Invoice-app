export interface Invoice {
  _id: string;
  slug: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
    _id: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
    _id: string;
  };
  items: [
    {
      name: string;
      quantity: number;
      price: number;
      total: number;
      _id: string;
    }
  ];
  total: number;
}
