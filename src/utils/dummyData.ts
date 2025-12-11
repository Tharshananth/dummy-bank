import { User, Transaction, Stock } from '../types';

export const dummyUser: User = {
  id: '1',
  username: 'demo@bank.com',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@email.com',
  mobile: '+91 98765 43210',
  address: '123, MG Road, Bangalore, Karnataka - 560001',
  dob: '1990-05-15',
  balance: 125000,
  goldHolding: 25.5,
};

export const dummyTransactions: Transaction[] = [
  {
    id: 'TXN001',
    type: 'upi',
    amount: 500,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'success',
    description: 'UPI Payment to Priya Sharma',
    from: 'rajesh@bank',
    to: 'priya@bank',
  },
  {
    id: 'TXN002',
    type: 'bill',
    category: 'Electricity',
    amount: 1250,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'success',
    description: 'Electricity Bill Payment',
    to: 'BESCOM',
  },
  {
    id: 'TXN003',
    type: 'gold',
    amount: 6500,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'success',
    description: 'Digital Gold Purchase - 10g',
  },
];

export const dummyStocks: Stock[] = [
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3850.25, change: 45.30, changePercent: 1.19 },
  { symbol: 'INFY', name: 'Infosys Limited', price: 1650.75, change: -12.50, changePercent: -0.75 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2450.50, change: 28.75, changePercent: 1.19 },
  { symbol: 'HDFC', name: 'HDFC Bank', price: 1680.00, change: 15.25, changePercent: 0.92 },
  { symbol: 'WIPRO', name: 'Wipro Limited', price: 485.30, change: -5.20, changePercent: -1.06 },
  { symbol: 'ITC', name: 'ITC Limited', price: 425.80, change: 8.90, changePercent: 2.14 },
];

export const goldPricePerGram = 6500;

export const credentials = {
  username: 'demo@bank.com',
  password: 'demo123',
};
