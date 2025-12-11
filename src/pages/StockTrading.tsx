import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { useAuth } from '../contexts/AuthContext';
import { getUser, updateUser, addTransaction, getPortfolio, updatePortfolio } from '../utils/localStorage';
import { dummyStocks } from '../utils/dummyData';
import { TrendingUp, TrendingDown, Search, AlertCircle, Briefcase } from 'lucide-react';
import { Portfolio } from '../types';

export const StockTrading = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<typeof dummyStocks[0] | null>(null);
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

  useEffect(() => {
    setPortfolio(getPortfolio());
  }, []);

  const filteredStocks = dummyStocks.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const user = getUser();
  const amount = selectedStock ? parseFloat(quantity) * selectedStock.price : 0;

  const getPortfolioStock = (symbol: string) => {
    return portfolio.find(p => p.symbol === symbol);
  };

  const handleProceed = () => {
    setError('');

    if (!selectedStock) {
      setError('Please select a stock');
      return;
    }

    if (!quantity || parseFloat(quantity) <= 0 || !Number.isInteger(parseFloat(quantity))) {
      setError('Please enter a valid quantity (whole number)');
      return;
    }

    if (transactionType === 'buy' && amount > user.balance) {
      setError('Insufficient balance');
      return;
    }

    if (transactionType === 'sell') {
      const portfolioStock = getPortfolioStock(selectedStock.symbol);
      if (!portfolioStock || portfolioStock.quantity < parseFloat(quantity)) {
        setError(`You don't have enough ${selectedStock.symbol} stocks`);
        return;
      }
    }

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (!selectedStock) return;

    const qty = parseFloat(quantity);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = {
      ...user,
      balance: transactionType === 'buy' ? user.balance - amount : user.balance + amount,
    };

    updateUser(updatedUser);

    const updatedPortfolio = [...portfolio];
    const existingStockIndex = updatedPortfolio.findIndex(p => p.symbol === selectedStock.symbol);

    if (transactionType === 'buy') {
      if (existingStockIndex >= 0) {
        const existing = updatedPortfolio[existingStockIndex];
        updatedPortfolio[existingStockIndex] = {
          symbol: selectedStock.symbol,
          quantity: existing.quantity + qty,
          avgPrice: ((existing.avgPrice * existing.quantity) + (selectedStock.price * qty)) / (existing.quantity + qty),
        };
      } else {
        updatedPortfolio.push({
          symbol: selectedStock.symbol,
          quantity: qty,
          avgPrice: selectedStock.price,
        });
      }
    } else {
      if (existingStockIndex >= 0) {
        const existing = updatedPortfolio[existingStockIndex];
        if (existing.quantity === qty) {
          updatedPortfolio.splice(existingStockIndex, 1);
        } else {
          updatedPortfolio[existingStockIndex] = {
            ...existing,
            quantity: existing.quantity - qty,
          };
        }
      }
    }

    updatePortfolio(updatedPortfolio);
    setPortfolio(updatedPortfolio);

    const transaction = {
      id: `TXN${Date.now()}`,
      type: 'stock' as const,
      amount: amount,
      date: new Date().toISOString(),
      status: 'success' as const,
      description: `${transactionType === 'buy' ? 'Bought' : 'Sold'} ${qty} ${selectedStock.symbol} @ ₹${selectedStock.price}`,
    };

    addTransaction(transaction);
    refreshUser();

    navigate('/transaction-success', {
      state: {
        transaction,
        message: `Stock ${transactionType === 'buy' ? 'purchased' : 'sold'} successfully`,
      },
    });
  };

  const getTotalPortfolioValue = () => {
    return portfolio.reduce((total, item) => {
      const stock = dummyStocks.find(s => s.symbol === item.symbol);
      return total + (stock ? stock.price * item.quantity : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Trading</h1>
          <p className="text-gray-600">Trade stocks and manage your portfolio</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search stocks..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                {filteredStocks.map((stock) => {
                  const portfolioStock = getPortfolioStock(stock.symbol);
                  return (
                    <button
                      key={stock.symbol}
                      onClick={() => setSelectedStock(stock)}
                      className={`w-full p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                        selectedStock?.symbol === stock.symbol
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-gray-900">{stock.symbol}</h3>
                            {portfolioStock && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {portfolioStock.quantity} shares
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹{stock.price.toFixed(2)}</p>
                          <div className={`flex items-center space-x-1 text-sm ${
                            stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span>{stock.changePercent.toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedStock && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Trade {selectedStock.symbol}</h3>

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
                      Buy
                    </button>
                    <button
                      onClick={() => setTransactionType('sell')}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                        transactionType === 'sell'
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Sell
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <Input
                    label="Quantity (shares)"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter number of shares"
                    min="1"
                    step="1"
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
                    {transactionType === 'buy' ? 'Buy Shares' : 'Sell Shares'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Portfolio Value</p>
                  <h2 className="text-3xl font-bold">₹{getTotalPortfolioValue().toLocaleString()}</h2>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <Briefcase size={32} />
                </div>
              </div>
              <div className="pt-4 border-t border-purple-500">
                <p className="text-purple-100 text-sm">Total Holdings</p>
                <p className="text-2xl font-bold">{portfolio.reduce((sum, p) => sum + p.quantity, 0)} shares</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Portfolio</h3>
              {portfolio.length > 0 ? (
                <div className="space-y-3">
                  {portfolio.map((item) => {
                    const stock = dummyStocks.find(s => s.symbol === item.symbol);
                    if (!stock) return null;
                    const currentValue = stock.price * item.quantity;
                    const investedValue = item.avgPrice * item.quantity;
                    const profitLoss = currentValue - investedValue;
                    const profitLossPercent = (profitLoss / investedValue) * 100;

                    return (
                      <div key={item.symbol} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{item.symbol}</h4>
                            <p className="text-sm text-gray-600">{item.quantity} shares</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">₹{currentValue.toLocaleString()}</p>
                            <p className={`text-sm ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {profitLoss >= 0 ? '+' : ''}₹{profitLoss.toFixed(2)} ({profitLossPercent.toFixed(2)}%)
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Avg: ₹{item.avgPrice.toFixed(2)} • Current: ₹{stock.price.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No stocks in portfolio</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} title={`Confirm ${transactionType === 'buy' ? 'Purchase' : 'Sale'}`}>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Stock</span>
              <span className="font-semibold">{selectedStock?.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price per share</span>
              <span className="font-semibold">₹{selectedStock?.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity</span>
              <span className="font-semibold">{quantity} shares</span>
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
