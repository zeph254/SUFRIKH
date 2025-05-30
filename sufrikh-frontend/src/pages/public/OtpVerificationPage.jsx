import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import OtpVerification from '../../components/auth/OTPVerification';
import { toast } from 'react-toastify';

const OtpVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    user, 
    token, 
    isLoading: authLoading, 
    requestOTP, 
    verifyOTP,
    setAuthError,
    persistAuth // Add this from useAuth
  } = useAuth();
  
  const [verificationType, setVerificationType] = useState('email');
  const [pageLoading, setPageLoading] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  // Initialize OTP request
  useEffect(() => {
    if (authLoading) return;

    const initialize = async () => {
      try {
        setPageLoading(true);
        setError(null);
        
        const state = location.state || {};
        const verifyType = state.type || 'email';
        const userId = state.userId || user?.id;
        const registrationToken = state.token;

        if (!userId) {
          navigate('/login');
          return;
        }

        setVerificationType(verifyType);
        
        // Update auth state if we have a registration token
        if (registrationToken && registrationToken !== token) {
          persistAuth({
            token: registrationToken,
            user: location.state?.user || user
          });
        }

        await requestOTP(verifyType);
        setOtpSent(true);
      } catch (err) {
        setError(err.message || 'Failed to initialize OTP verification');
        toast.error(err.message || 'Failed to initialize OTP verification');
      } finally {
        setPageLoading(false);
      }
    };

    initialize();
  }, [authLoading, location.state, navigate, requestOTP, user, token, persistAuth]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0 && otpSent) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, otpSent]);

const handleResend = async () => {
  try {
    setPageLoading(true);
    setError(null);
    
    // Wait if countdown is still active
    if (countdown > 0) {
      throw new Error(`Please wait ${countdown} seconds before requesting a new OTP`);
    }

    const response = await requestOTP(verificationType);
    
    if (response?.error) {
      throw new Error(response.error);
    }

    setOtpSent(true);
    setCountdown(60); // Reset countdown
    toast.success('New OTP sent!');
  } catch (err) {
    const errorMessage = err.response?.data?.error || 
                        err.message || 
                        'Failed to resend OTP';
    setError(errorMessage);
    toast.error(errorMessage);
  } finally {
    setPageLoading(false);
  }
};



const handleVerify = async (otp) => {
  try {
    const result = await verifyOTP(otp, verificationType);
    
    if (result.success) {
      toast.success('Verification successful!');
      navigate(location.state?.redirectTo || '/dashboard');
    } else {
      toast.error(result.error || 'Verification failed');
    }
  } catch (error) {
    toast.error(error.message || 'An error occurred during verification');
    console.error('Verification error:', error);
  }
};

  if (pageLoading || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-800">
            {verificationType === 'email' ? 'Email Verification' : 'Phone Verification'}
          </h1>
          <p className="mt-2 text-gray-600">
            We've sent a 6-digit code to your {verificationType === 'email' ? 'email address' : 'phone number'}
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <OtpVerification 
          onVerify={handleVerify}
          onResend={handleResend}
          countdown={countdown}
          isResending={pageLoading}
          isVerifying={pageLoading}
        />
      </div>
    </div>
  );
};

export default OtpVerificationPage;