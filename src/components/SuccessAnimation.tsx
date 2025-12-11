import { CheckCircle } from 'lucide-react';

export const SuccessAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
        <CheckCircle size={80} className="text-green-500 relative z-10 animate-bounce" />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-gray-800">Transaction Successful!</h3>
    </div>
  );
};
