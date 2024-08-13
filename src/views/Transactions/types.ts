import { IAccount } from '../../views/Accounts/types';

export interface ITransaction {
    id: number;
    amount: number;
    transactionType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
    description: string;
    transactionDate: string;
    accountId: number;
    accountName?: string;
  }