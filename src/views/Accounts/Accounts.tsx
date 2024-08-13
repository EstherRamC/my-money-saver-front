import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../store/appContext/app-context';
import httpInstance from '../../services/httpInstance';
import { IAccount } from './types';

const Accounts: React.FC = () => {
  const { userProfile } = useAppContext();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [accountName, setAccountName] = useState<string>('');
  const [accountType, setAccountType] = useState<string>('CASH');
  const [balance, setBalance] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await httpInstance.get(`/accounts/user/${userProfile?.id}`);
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const account = {
      accountName,
      accountType,
      balance: parseFloat(balance),
      userId: userProfile?.id,
    };

    try {
      await httpInstance.post('/accounts/add', account);
      setMessage('Account added successfully!');
      setAccountName('');
      setAccountType('CASH');
      setBalance('');
      fetchAccounts();
    } catch (error) {
      setMessage('Failed to add account.');
      console.error(error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAccount) {
      try {
        const updatedAccount = { ...selectedAccount, accountName, accountType, balance: parseFloat(balance) };
        await httpInstance.put(`/accounts/updateDetails/${selectedAccount.id}`, updatedAccount);
        setMessage('Account updated successfully!');
        setSelectedAccount(null);
        setAccountName('');
        setAccountType('CASH');
        setBalance('');
        fetchAccounts();
      } catch (error) {
        setMessage('Failed to update account.');
        console.error(error);
      }
    }
  };

  const handleEditClick = (account: IAccount) => {
    setSelectedAccount(account);
    setAccountName(account.accountName);
    setAccountType(account.accountType);
    setBalance(account.balance.toString());
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Accounts</h2>
      <div className="mb-4">
        <form onSubmit={selectedAccount ? handleEditSubmit : handleSubmit} className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">{selectedAccount ? 'Edit Account' : 'Add New Account'}</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Account Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            >
              <option value="CASH">Cash</option>
              <option value="CHECKING">Checking</option>
              <option value="CREDIT">Credit</option>
              <option value="INVESTMENT">Investment</option>
              <option value="SAVINGS">Savings</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Balance</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {selectedAccount ? 'Update Account' : 'Add Account'}
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 px-4 py-2">Account Name</th>
              <th className="w-1/4 px-4 py-2">Account Type</th>
              <th className="w-1/4 px-4 py-2">Balance</th>
              <th className="w-1/4 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id} className="text-center">
                <td className="border px-4 py-2">{account.accountName}</td>
                <td className="border px-4 py-2">{account.accountType}</td>
                <td className="border px-4 py-2">{account.balance}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(account)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;
