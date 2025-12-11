import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { getTransactions } from '../utils/localStorage';
import {
  CreditCard,
  Send,
  Coins,
  TrendingUp,
  User,
  FileText,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { useState } from 'react';

export const Dashboard = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const transactions = getTransactions().slice(0, 5);

  refreshUser();

  const quickActions = [
    { title: 'Bill Payment', icon: CreditCard, path: '/bill-payment', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
    { title: 'UPI Transfer', icon: Send, path: '/upi-transfer', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
    { title: 'Digital Gold', icon: Coins, path: '/digital-gold', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' },
    { title: 'Stock Trading', icon: TrendingUp, path: '/stock-trading', color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600' },
    { title: 'Profile Update', icon: User, path: '/profile', color: 'bg-indigo-500', hoverColor: 'hover:bg-indigo-600' },
    { title: 'Autofill Form', icon: FileText, path: '/autofill-form', color: 'bg-pink-500', hoverColor: 'hover:bg-pink-600' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Here's your account overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-blue-100 text-sm mb-1">Account Balance</p>
                <div className="flex items-center space-x-2">
                  <h2 className="text-3xl font-bold">
                    {showBalance ? formatCurrency(user?.balance || 0) : '₹ ••••••'}
                  </h2>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-1 hover:bg-blue-700 rounded-full transition-colors"
                  >
                    {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="bg-blue-700 p-3 rounded-full">
                <CreditCard size={24} />
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-blue-500">
              <span className="text-sm text-blue-100">Account No:</span>
              <span className="font-mono font-semibold">XXXX XXXX {user?.id.slice(-4)}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm mb-1">Digital Gold</p>
                <h3 className="text-2xl font-bold text-gray-900">{user?.goldHolding || 0}g</h3>
                <p className="text-sm text-green-600 mt-1">≈ {formatCurrency((user?.goldHolding || 0) * 6500)}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Coins size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm mb-1">Quick Actions</p>
                <h3 className="text-2xl font-bold text-gray-900">{quickActions.length}</h3>
                <p className="text-sm text-gray-500 mt-1">Available services</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => navigate(action.path)}
                className={`${action.color} ${action.hoverColor} text-white rounded-xl p-6 flex flex-col items-center justify-center space-y-3 transition-all duration-200 transform hover:scale-105 hover:shadow-xl group`}
              >
                <div className="bg-white bg-opacity-20 p-3 rounded-full group-hover:bg-opacity-30 transition-all">
                  <action.icon size={28} />
                </div>
                <span className="font-semibold text-center text-sm">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <div key={txn.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        txn.type === 'bill' ? 'bg-blue-100' :
                        txn.type === 'upi' ? 'bg-green-100' :
                        txn.type === 'gold' ? 'bg-yellow-100' :
                        'bg-purple-100'
                      }`}>
                        {txn.description.includes('Payment') ? (
                          <ArrowUpRight className={
                            txn.type === 'bill' ? 'text-blue-600' :
                            txn.type === 'upi' ? 'text-green-600' :
                            'text-gray-600'
                          } size={20} />
                        ) : (
                          <ArrowDownLeft className="text-gray-600" size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{txn.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(txn.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        txn.description.includes('Payment') || txn.description.includes('Purchase')
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}>
                        {txn.description.includes('Payment') || txn.description.includes('Purchase') ? '- ' : '+ '}
                        {formatCurrency(txn.amount)}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        txn.status === 'success' ? 'bg-green-100 text-green-700' :
                        txn.status === 'failed' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {txn.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No transactions yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
