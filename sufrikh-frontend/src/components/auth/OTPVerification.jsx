import { useState } from 'react';
import { toast } from 'react-toastify';

const OtpVerification = ({ 
  onVerify, 
  onResend, 
  countdown, 
  isResending,
  isVerifying
}) => {
  const [otp, setOtp] = useState('');
  const [canResend, setCanResend] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    onVerify(otp);
  };

  const handleResendClick = () => {
    if (canResend || countdown === 0) {
      onResend();
      setCanResend(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
            Enter 6-digit OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-center text-2xl tracking-widest"
            placeholder="------"
            maxLength={6}
            required
            disabled={isVerifying}
          />
        </div>
        
        <button
          type="submit"
          disabled={isVerifying || otp.length !== 6}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
            (isVerifying || otp.length !== 6) ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        {countdown > 0 ? (
          <p className="text-sm text-gray-500">
            Resend OTP in {countdown} seconds
          </p>
        ) : (
          <button
            onClick={handleResendClick}
            disabled={isResending}
            className={`text-sm text-emerald-600 hover:text-emerald-800 font-medium ${
              isResending ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isResending ? 'Sending...' : 'Resend OTP'}
          </button>
        )}
      </div>
    </div>
  );
};

export default OtpVerification;