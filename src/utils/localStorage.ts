import { User, Transaction, Portfolio } from '../types';
import { dummyUser, dummyTransactions } from './dummyData';

const STORAGE_KEYS = {
  USER: 'bank_user',
  TRANSACTIONS: 'bank_transactions',
  PORTFOLIO: 'bank_portfolio',
  IS_LOGGED_IN: 'bank_is_logged_in',
};

export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(dummyUser));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(dummyTransactions));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PORTFOLIO)) {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify([]));
  }
};

export const getUser = (): User => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : dummyUser;
};

export const updateUser = (user: User) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getTransactions = (): Transaction[] => {
  const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return transactions ? JSON.parse(transactions) : dummyTransactions;
};

export const addTransaction = (transaction: Transaction) => {
  const transactions = getTransactions();
  transactions.unshift(transaction);
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
};

export const getPortfolio = (): Portfolio[] => {
  const portfolio = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
  return portfolio ? JSON.parse(portfolio) : [];
};

export const updatePortfolio = (portfolio: Portfolio[]) => {
  localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
};

export const isLoggedIn = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
};

export const setLoggedIn = (status: boolean) => {
  localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, status.toString());
};

export const logout = () => {
  setLoggedIn(false);
};
