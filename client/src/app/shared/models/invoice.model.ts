export interface Address {
  _id: string;
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
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
