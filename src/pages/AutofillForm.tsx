import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, CheckCircle } from 'lucide-react';

export const AutofillForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAutofill = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.mobile,
        address: user.address,
        dob: user.dob,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 500));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generic Form with Autofill</h1>
          <p className="text-gray-600">Fill forms instantly using your profile data</p>
        </div>

        {!submitted ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <Button
                onClick={handleAutofill}
                variant="primary"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
              >
                <Sparkles size={20} className="inline mr-2" />
                Autofill Using Profile Data
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />

                <Input
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your complete address"
                  required
                />
              </div>

              <Button type="submit" fullWidth>
                Submit Form
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Pro Tip:</strong> Click the "Autofill Using Profile Data" button to instantly fill this form with your profile information!
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-6 rounded-full animate-bounce">
                <CheckCircle size={64} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Form Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">Your information has been received.</p>
            <div className="bg-gray-50 p-6 rounded-xl text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-semibold">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">DOB:</span>
                <span className="font-semibold">{formData.dob}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">Redirecting to a new form in 3 seconds...</p>
          </div>
        )}
      </div>
    </div>
  );
};
