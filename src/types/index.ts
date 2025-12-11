export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  dob: string;
  profilePhoto?: string;
  balance: number;
  goldHolding: number;
}

export interface Transaction {
  id: string;
  type: 'bill' | 'upi' | 'gold' | 'stock';
  category?: string;
  amount: number;
  date: string;
  status: 'success' | 'failed' | 'pending';
  description: string;
  from?: string;
  to?: string;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface Portfolio {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

export interface GoldPrice {
  pricePerGram: number;
  lastUpdated: string;
}
