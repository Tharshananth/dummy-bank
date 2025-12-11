import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { useAuth } from '../contexts/AuthContext';
import { getUser, updateUser, addTransaction } from '../utils/localStorage';
import { goldPricePerGram } from '../utils/dummyData';
import { Coins, TrendingUp, AlertCircle } from 'lucide-react';

export const DigitalGold = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const user = getUser();
  const amount = parseFloat(quantity) * goldPricePerGram || 0;

  const handleProceed = () => {
    setError('');

    if (!quantity || parseFloat(quantity) <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    if (transactionType === 'buy' && amount > user.balance) {
      setError('Insufficient balance');
      return;
    }

    if (transactionType === 'sell' && parseFloat(quantity) > user.goldHolding) {
      setError(`You only have ${user.goldHolding}g of gold`);
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    const qty = parseFloat(quantity);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = {
      ...user,
      balance: transactionType === 'buy' ? user.balance - amount : user.balance + amount,
      goldHolding: transactionType === 'buy' ? user.goldHolding + qty : user.goldHolding - qty,
    };

    updateUser(updatedUser);

    const transaction = {
      id: `TXN${Date.now()}`,
      type: 'gold' as const,
      amount: amount,
      date: new Date().toISOString(),
      status: 'success' as const,
      description: `Digital Gold ${transactionType === 'buy' ? 'Purchase' : 'Sale'} - ${qty}g`,
    };

    addTransaction(transaction);
    refreshUser();

    navigate('/transaction-success', {
      state: {
        transaction,
        message: `Gold ${transactionType === 'buy' ? 'purchased' : 'sold'} successfully`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Gold</h1>
          <p className="text-gray-600">Buy and sell gold digitally at live prices</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-lg p-8 text-white mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-yellow-100 text-sm mb-1">Current Gold Price</p>
              <h2 className="text-4xl font-bold">₹{goldPricePerGram}/g</h2>
              <div className="flex items-center space-x-1 mt-2 text-yellow-100">
                <TrendingUp size={16} />
                <span className="text-sm">+1.2% today</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <Coins size={48} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-yellow-500">
            <div>
              <p className="text-yellow-100 text-sm">Your Holdings</p>
              <p className="text-2xl font-bold">{user.goldHolding}g</p>
            </div>
            <div>
              <p className="text-yellow-100 text-sm">Current Value</p>
              <p className="text-2xl font-bold">₹{(user.goldHolding * goldPricePerGram).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setTransactionType('buy')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  transactionType === 'buy'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Buy Gold
              </button>
              <button
                onClick={() => setTransactionType('sell')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  transactionType === 'sell'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sell Gold
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <Input
              label="Quantity (grams)"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity in grams"
              step="0.1"
            />

            {quantity && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">₹{amount.toLocaleString()}</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleProceed}
              fullWidth
              variant={transactionType === 'buy' ? 'success' : 'danger'}
            >
              {transactionType === 'buy' ? 'Buy Gold' : 'Sell Gold'}
            </Button>

            <div className="text-center text-sm text-gray-500">
              <p>24K Gold • 99.9% Purity • Safe & Secure</p>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} title={`Confirm ${transactionType === 'buy' ? 'Purchase' : 'Sale'}`}>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction</span>
              <span className="font-semibold capitalize">{transactionType} Gold</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity</span>
              <span className="font-semibold">{quantity}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price per gram</span>
              <span className="font-semibold">₹{goldPricePerGram}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold text-xl text-blue-600">₹{amount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => setShowConfirmation(false)} fullWidth>
              Cancel
            </Button>
            <Button onClick={handleConfirm} fullWidth variant={transactionType === 'buy' ? 'success' : 'danger'}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
