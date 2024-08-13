export interface IAccount {
    id: number;
    userId: number;
    accountName: string;
    accountType: 'CASH' | 'CHECKING' | 'CREDIT' | 'INVESTMENT' | 'SAVINGS';
    balance: number;
  }