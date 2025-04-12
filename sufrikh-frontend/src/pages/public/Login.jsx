import React, { useState, useContext } from 'react';
import { FaUser, FaLock, FaPrayingHands, FaQuran, FaHotel } from 'react-icons/fa';
import { GiPrayerBeads } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import AuthProvider, { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login, isLoading, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [currentPrayer, setCurrentPrayer] = useState({
    name: 'Dhuhr',
    time: '1:15 PM',
    iqamaIn: '15 minutes'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (authError) setAuthError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { success } = await login({
      email: loginData.email,
      password: loginData.password
    });
    
    if (success) {
      console.log('Redirecting...');

      navigate('/account');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Side - Prayer Information */}
      <div className="w-full md:w-1/3 bg-gradient-to-b from-emerald-800 to-green-700 text-white p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center">
            <FaHotel className="mr-2" /> Sufrikh Hotels
          </h1>
          <p className="text-emerald-200 mt-1">Halal Hospitality at Its Finest</p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaPrayingHands className="mr-2" /> Prayer Time
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Current Prayer:</span>
                <span className="font-bold">{currentPrayer.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Adhan Time:</span>
                <span className="font-bold">{currentPrayer.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Iqama In:</span>
                <span className="font-bold">{currentPrayer.iqamaIn}</span>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <GiPrayerBeads className="mr-2" /> Facilities
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaQuran className="mr-2 text-emerald-300" />
                <span>Prayer mats available in all rooms</span>
              </li>
              <li className="flex items-center">
                <FaPrayingHands className="mr-2 text-emerald-300" />
                <span>Masjid within walking distance</span>
              </li>
              <li className="flex items-center">
                <GiPrayerBeads className="mr-2 text-emerald-300" />
                <span>100% Halal-certified dining</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-auto pt-6 text-center text-emerald-200 text-sm">
          <p>Need help? Contact our support team</p>
          <p>support@sufrikhhotels.com</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your Sufrikh account</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8">
            {/* Error Message */}
            {authError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {authError}
              </div>
            )}

            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    className="pl-10 w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    className="pl-10 w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-800">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition duration-150 shadow-md hover:shadow-lg ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={isLoading}
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                  LinkedIn
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                  </svg>
                  Twitter
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="text-emerald-600 hover:text-emerald-800 font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;