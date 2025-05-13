import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = ({ onVerify, onResend, countdown, isResending, isVerifying }) => {
  const [otp, setOtp] = useState('');
  const [canResend, setCanResend] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get userId from props or location state
  const userId = location.state?.userId;
  const type = location.state?.type || 'email';
  const redirect = location.state?.redirectTo;

  useEffect(() => {
    // Redirect if essential data is missing
    if (!userId) {
      toast.error('Session expired. Please try again.');
      navigate('/login');
    }
  }, [userId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error('Session expired. Please try again.');
      navigate('/login');
      return;
    }

    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    onVerify(userId, otp, type);
  };

  const handleResendClick = () => {
    if (!userId) {
      toast.error('Session expired. Please try again.');
      navigate('/login');
      return;
    }

    if (canResend || countdown === 0) {
      onResend(userId, type);
      setCanResend(false);
    }
  };

  if (isVerifying) {
    return <div>Verifying...</div>;
  }

  if (!userId) {
    return null; // Already handled by useEffect redirect
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              const value = e.target.value;
              // Only allow numbers and limit to 6 characters
              if (/^\d*$/.test(value) && value.length <= 6) {
                setOtp(value);
              }
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            maxLength={6}
            inputMode="numeric"
            pattern="\d{6}"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Verify
          </button>

          <button
            onClick={handleResendClick}
            disabled={isResending || countdown > 0}
            className={
              countdown > 0
                ? "bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            }
          >
            Resend OTP {countdown > 0 ? `(${countdown})` : ''}
          </button>
        </div>
      </form>
      
      {redirect && (
        <p className="mt-4 text-sm text-gray-600">
          You'll be redirected to {redirect} after verification
        </p>
      )}
    </div>
  );
};

export default OtpVerification;