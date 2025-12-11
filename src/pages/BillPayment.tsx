import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { useAuth } from '../contexts/AuthContext';
import { getUser, updateUser, addTransaction } from '../utils/localStorage';
import { Zap, Droplet, Phone, Wifi, AlertCircle } from 'lucide-react';

type BillType = 'electricity' | 'water' | 'mobile' | 'internet';

interface BillService {
  type: BillType;
  title: string;
  icon: typeof Zap;
  color: string;
  providers: string[];
}

export const BillPayment = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [selectedService, setSelectedService] = useState<BillType | null>(null);
  const [provider, setProvider] = useState('');
  const [consumerId, setConsumerId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const services: BillService[] = [
    {
      type: 'electricity',
      title: 'Electricity',
      icon: Zap,
      color: 'bg-yellow-500',
      providers: ['BESCOM', 'MSEDCL', 'TNEB', 'KESCO'],
    },
    {
      type: 'water',
      title: 'Water',
      icon: Droplet,
      color: 'bg-blue-500',
      providers: ['BWSSB', 'Mumbai Water', 'Delhi Jal Board', 'Kolkata Water'],
    },
    {
      type: 'mobile',
      title: 'Mobile Recharge',
      icon: Phone,
      color: 'bg-green-500',
      providers: ['Airtel', 'Jio', 'VI', 'BSNL'],
    },
    {
      type: 'internet',
      title: 'Internet',
      icon: Wifi,
      color: 'bg-purple-500',
      providers: ['ACT Fibernet', 'Airtel Xstream', 'Jio Fiber', 'BSNL Broadband'],
    },
  ];

  const handleServiceSelect = (type: BillType) => {
    setSelectedService(type);
    setProvider('');
    setConsumerId('');
    setAmount('');
    setError('');
  };

  const handleProceed = () => {
    setError('');

    if (!provider) {
      setError('Please select a provider');
      return;
    }

    if (!consumerId) {
      setError('Please enter Consumer ID / Mobile Number');
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
    const paymentAmount = parseFloat(amount);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = {
      ...user,
      balance: user.balance - paymentAmount,
    };

    updateUser(updatedUser);

    const transaction = {
      id: `TXN${Date.now()}`,
      type: 'bill' as const,
      category: services.find(s => s.type === selectedService)?.title,
      amount: paymentAmount,
      date: new Date().toISOString(),
      status: 'success' as const,
      description: `${services.find(s => s.type === selectedService)?.title} Bill Payment`,
      to: provider,
    };

    addTransaction(transaction);
    refreshUser();

    navigate('/transaction-success', {
      state: {
        transaction,
        message: 'Bill payment completed successfully',
      },
    });
  };

  const selectedServiceData = services.find(s => s.type === selectedService);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bill Payment</h1>
          <p className="text-gray-600">Pay your bills instantly and securely</p>
        </div>

        {!selectedService ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <button
                key={service.type}
                onClick={() => handleServiceSelect(service.type)}
                className={`${service.color} text-white rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 transition-all duration-200 transform hover:scale-105 hover:shadow-xl group`}
              >
                <div className="bg-white bg-opacity-20 p-4 rounded-full group-hover:bg-opacity-30 transition-all">
                  <service.icon size={40} />
                </div>
                <span className="font-bold text-lg">{service.title}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back
              </button>
              <div className={`${selectedServiceData?.color} p-3 rounded-full text-white`}>
                {selectedServiceData && <selectedServiceData.icon size={24} />}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedServiceData?.title}</h2>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Provider
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {selectedServiceData?.providers.map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setProvider(prov)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        provider === prov
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-semibold text-gray-900">{prov}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label={selectedService === 'mobile' ? 'Mobile Number' : 'Consumer ID'}
                type="text"
                value={consumerId}
                onChange={(e) => setConsumerId(e.target.value)}
                placeholder={selectedService === 'mobile' ? '9876543210' : 'Enter Consumer ID'}
              />

              <Input
                label="Amount (₹)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />

              <Button onClick={handleProceed} fullWidth>
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} title="Confirm Payment">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Service</span>
              <span className="font-semibold">{selectedServiceData?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Provider</span>
              <span className="font-semibold">{provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{selectedService === 'mobile' ? 'Mobile' : 'Consumer ID'}</span>
              <span className="font-semibold">{consumerId}</span>
            </div>
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
              Confirm & Pay
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
