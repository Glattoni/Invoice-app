interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
  _id: string;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
  _id: string;
}

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
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}
