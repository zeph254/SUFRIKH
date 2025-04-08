import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  AuthContext  from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaIdCard, FaPrayingHands, FaVenusMars } from 'react-icons/fa';
import { GiPrayerBeads } from 'react-icons/gi';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    idType: 'passport',
    idNumber: '',
    halalPreferences: {
      prayerInRoom: false,
      noAlcohol: true,
      zabihahOnly: true
    },
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 2 && !formData.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('halalPreferences.')) {
      const prefName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        halalPreferences: {
          ...prev.halalPreferences,
          [prefName]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    if (currentStep < 3) {
      nextStep();
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare data for backend
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        gender: formData.gender,
        id_type: formData.idType,
        id_number: formData.idNumber,
        halal_preferences: formData.halalPreferences,
        special_requests: formData.specialRequests
      };
      
      const response = await register(userData);
      
      if (response.success) {
        navigate('/dashboard', { state: { welcome: true } });
      } else {
        setErrors(prev => ({
          ...prev,
          form: response.error || 'Registration failed'
        }));
      }
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        form: err.response?.data?.error || 'Registration failed. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Error message for form */}
        {errors.form && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            {errors.form}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            Create Your Account
          </h1>
          <p className="text-lg text-gray-600">
            Register to enjoy our halal hospitality experience
          </p>
          <div className="flex justify-center mt-6 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      currentStep > step ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-semibold text-emerald-700 flex items-center">
                  <FaUser className="mr-2" /> Personal Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`pl-10 w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500`}
                        required
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500`}
                      required
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="flex space-x-4">
                    {['male', 'female'].map((gender) => (
                      <label key={gender} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={formData.gender === gender}
                          onChange={handleChange}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700 capitalize flex items-center">
                          <FaVenusMars className="mr-1" /> {gender}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`pl-10 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500`}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`pl-10 w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500`}
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`pl-10 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500`}
                        required
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`pl-10 w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500`}
                        required
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-md transition duration-150"
                  >
                    Continue to Identification
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Identification */}
            {currentStep === 2 && (
              <div className="p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-semibold text-emerald-700 flex items-center">
                  <FaIdCard className="mr-2" /> Identification Details
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Type
                  </label>
                  <select
                    name="idType"
                    value={formData.idType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="passport">Passport</option>
                    <option value="national-id">National ID</option>
                    <option value="driving-license">Driving License</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Number
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                    className={`w-full border ${errors.idNumber ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500`}
                    required
                  />
                  {errors.idNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>
                  )}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-2/3 ml-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition duration-150"
                  >
                    Continue to Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Halal Preferences */}
            {currentStep === 3 && (
              <div className="p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-semibold text-emerald-700 flex items-center">
                  <FaPrayingHands className="mr-2" /> Halal Preferences
                </h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Prayer & Religious Needs
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="halalPreferences.prayerInRoom"
                        checked={formData.halalPreferences.prayerInRoom}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 block text-sm text-gray-700">
                        <strong>Prayer amenities in room</strong> (prayer mat, Quran, Qibla direction marker)
                      </span>
                    </label>
                    
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="halalPreferences.noAlcohol"
                        checked={formData.halalPreferences.noAlcohol}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 block text-sm text-gray-700">
                        <strong>Absolutely no alcohol</strong> in minibar or room service
                      </span>
                    </label>
                    
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="halalPreferences.zabihahOnly"
                        checked={formData.halalPreferences.zabihahOnly}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 block text-sm text-gray-700">
                        <strong>Zabihah-only meat</strong> in all meals
                      </span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Any other special requirements (e.g., separate swimming time, halal toiletries, etc.)"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-2/3 ml-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Registering...' : 'Complete Registration'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
              <GiPrayerBeads className="mr-2" /> Why Register With Us?
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-emerald-500">
                  <FaPrayingHands />
                </div>
                <p className="ml-3 text-gray-600">
                  <strong>Prayer-friendly environment</strong> with masjids and wudu facilities nearby
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-emerald-500">
                  <GiPrayerBeads />
                </div>
                <p className="ml-3 text-gray-600">
                  <strong>100% Halal-certified</strong> dining with zabihah meat options
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-emerald-500">
                  <FaUser />
                </div>
                <p className="ml-3 text-gray-600">
                  <strong>Personalized service</strong> that respects Islamic values and traditions
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;