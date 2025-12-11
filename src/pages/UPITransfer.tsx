import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { useAuth } from '../contexts/AuthContext';
import { getUser, updateUser, addTransaction } from '../utils/localStorage';
import { AtSign, Phone, QrCode, AlertCircle } from 'lucide-react';

type PaymentMethod = 'upi' | 'mobile' | 'qr';

export const UPITransfer = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const methods = [
    { type: 'upi' as PaymentMethod, title: 'UPI ID', icon: AtSign, color: 'bg-blue-500' },
    { type: 'mobile' as PaymentMethod, title: 'Mobile Number', icon: Phone, color: 'bg-green-500' },
    { type: 'qr' as PaymentMethod, title: 'QR Code', icon: QrCode, color: 'bg-purple-500' },
  ];

  const validateUPI = (upi: string) => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    return upiRegex.test(upi);
  };

  const validateMobile = (phone: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(phone);
  };

  const handleProceed = () => {
    setError('');

    if (paymentMethod === 'upi' && !upiId) {
      setError('Please enter UPI ID');
      return;
    }

    if (paymentMethod === 'upi' && !validateUPI(upiId)) {
      setError('Invalid UPI ID format (e.g., user@bank)');
      return;
    }

    if (paymentMethod === 'mobile' && !mobile) {
      setError('Please enter mobile number');
      return;
    }

    if (paymentMethod === 'mobile' && !validateMobile(mobile)) {
      setError('Invalid mobile number');
      return;
    }

    if (paymentMethod === 'qr') {
      setError('QR Code scanning is simulated in this demo');
      setTimeout(() => {
        setUpiId('merchant@paytm');
        setError('');
      }, 1000);
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const user = getUser();
    if (parseFloat(amount) > user.balance) {
      setError('Insufficient balance');
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    const user = getUser();
    const transferAmount = parseFloat(amount);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = {
      ...user,
      balance: user.balance - transferAmount,
    };

    updateUser(updatedUser);

    const recipient = paymentMethod === 'upi' ? upiId : mobile;

    const transaction = {
      id: `TXN${Date.now()}`,
      type: 'upi' as const,
      amount: transferAmount,
      date: new Date().toISOString(),
      status: 'success' as const,
      description: `UPI Transfer to ${recipient}`,
      from: user.email,
      to: recipient,
    };

    addTransaction(transaction);
    refreshUser();

    navigate('/transaction-success', {
      state: {
        transaction,
        message: 'UPI transfer completed successfully',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">UPI Transfer</h1>
          <p className="text-gray-600">Send money instantly using UPI</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              {methods.map((method) => (
                <button
                  key={method.type}
                  onClick={() => setPaymentMethod(method.type)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === method.type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`${method.color} text-white p-3 rounded-full mx-auto mb-2 w-fit`}>
                    <method.icon size={24} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{method.title}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {paymentMethod === 'upi' && (
              <Input
                label="UPI ID"
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@bank"
              />
            )}

            {paymentMethod === 'mobile' && (
              <Input
                label="Mobile Number"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9876543210"
                maxLength={10}
              />
            )}

            {paymentMethod === 'qr' && (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-xl p-8 mb-4">
                  <QrCode size={120} className="mx-auto text-gray-400" />
                  <p className="text-gray-600 mt-4">QR Code Scanner (Demo)</p>
                </div>
                <Button onClick={handleProceed}>
                  Simulate QR Scan
                </Button>
              </div>
            )}

            {paymentMethod !== 'qr' && (
              <>
                <Input
                  label="Amount (₹)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Add Note (Optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a message..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <Button onClick={handleProceed} fullWidth>
                  Proceed to Pay
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} title="Confirm Transfer">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">To</span>
              <span className="font-semibold">{paymentMethod === 'upi' ? upiId : mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Method</span>
              <span className="font-semibold">{methods.find(m => m.type === paymentMethod)?.title}</span>
            </div>
            {note && (
              <div className="flex justify-between">
                <span className="text-gray-600">Note</span>
                <span className="font-semibold">{note}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-600">Amount</span>
              <span className="font-bold text-xl text-blue-600">₹{amount}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => setShowConfirmation(false)} fullWidth>
              Cancel
            </Button>
            <Button onClick={handleConfirm} fullWidth>
              Confirm & Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
