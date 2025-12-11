import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { SuccessAnimation } from '../components/SuccessAnimation';
import { Download, Home } from 'lucide-react';

export const TransactionSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transaction, message } = location.state || {};

  if (!transaction) {
    navigate('/dashboard');
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownloadReceipt = () => {
    alert('Receipt download feature simulated. In a real application, a PDF would be generated and downloaded.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <SuccessAnimation />

          <p className="text-gray-600 text-lg mt-4 mb-8">{message}</p>

          <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono font-bold text-blue-600">{transaction.id}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-semibold">{formatDate(transaction.date)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount</span>
              <span className="font-bold text-2xl text-gray-900">
                ₹{transaction.amount.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Type</span>
              <span className="font-semibold capitalize">{transaction.type}</span>
            </div>

            {transaction.from && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">From</span>
                <span className="font-semibold">{transaction.from}</span>
              </div>
            )}

            {transaction.to && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">To</span>
                <span className="font-semibold">{transaction.to}</span>
              </div>
            )}

            {transaction.category && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Category</span>
                <span className="font-semibold">{transaction.category}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-gray-600">Status</span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                {transaction.status}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button onClick={handleDownloadReceipt} fullWidth variant="secondary">
              <Download size={20} className="inline mr-2" />
              Download Receipt
            </Button>
            <Button onClick={() => navigate('/dashboard')} fullWidth>
              <Home size={20} className="inline mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            A confirmation has been sent to your registered email address
          </p>
        </div>
      </div>
    </div>
  );
};
