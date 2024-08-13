import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../store/appContext/app-context';
import httpInstance from '../../services/httpInstance';
import { IAccount } from '../Accounts/types';
import { ITransaction } from './types';

const Transactions: React.FC = () => {
  const { userProfile } = useAppContext();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [amount, setAmount] = useState<string>('');
  const [transactionType, setTransactionType] = useState<string>('INCOME');
  const [description, setDescription] = useState<string>('');
  const [accountId, setAccountId] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchTransactions();
    fetchAccounts();
  }, []);

  const fetchTransactions = async () => {
    try {
    const response = await httpInstance.get(`/transactions/user/${userProfile?.id}`);
    const transactionsData = response.data;

// Fetch accounts to get account names
  const accountsResponse = await httpInstance.get(`/accounts/user/${userProfile?.id}`);
    const accountsData = accountsResponse.data;

// Map account names to transactions
  const transactionsWithAccountNames = transactionsData.map((transaction: ITransaction) => {
    const account = accountsData.find((acc: IAccount) => acc.id === transaction.accountId);
    return {
    ...transaction,
accountName: account ? account.accountName : 'Unknown',
    };
    });

setTransactions(transactionsWithAccountNames);
} catch (error) {
    console.error('Error fetching transactions', error);
}
        };


  const fetchAccounts = async () => {
    try {
      if (userProfile?.id) {
        const response = await httpInstance.get(`/accounts/user/${userProfile.id}`);
        setAccounts(response.data);
      }
    } catch (error) {
      console.error('Error fetching accounts', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transaction = {
      amount: parseFloat(amount),
      transactionType,
      description,
      accountId: parseInt(accountId),
      transactionDate: new Date().toISOString(),
      userId: userProfile?.id
    };

    try {
      await httpInstance.post('/transactions/add', transaction);
      setMessage('Transaction added successfully!');
      setAmount('');
      setTransactionType('INCOME');
      setDescription('');
      setAccountId('');
      fetchTransactions();
      fetchAccounts();  // Ensure accounts are fetched again to update balances
    } catch (error) {
      setMessage('Failed to add transaction.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <div className="mb-4">
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Add New Transaction</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            >
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
              <option value="TRANSFER">Transfer</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Account</label>
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            >
              <option value="" disabled>Select an account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>{account.accountName}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Transaction
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 px-4 py-2">Amount</th>
              <th className="w-1/4 px-4 py-2">Type</th>
              <th className="w-1/4 px-4 py-2">Description</th>
              <th className="w-1/4 px-4 py-2">Date</th>
              <th className="w-1/4 px-4 py-2">Account</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="text-center">
                <td className="border px-4 py-2">{transaction.amount}</td>
                <td className="border px-4 py-2">{transaction.transactionType}</td>
                <td className="border px-4 py-2">{transaction.description}</td>
                <td className="border px-4 py-2">{new Date(transaction.transactionDate).toLocaleString()}</td>
                <td className="border px-4 py-2">{transaction.accountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
