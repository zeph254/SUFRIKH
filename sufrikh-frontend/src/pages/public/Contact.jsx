import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPrayingHands, FaHotel } from 'react-icons/fa';
import { GiPrayerBeads } from 'react-icons/gi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    prayerRequest: false
  });

  const prayerTimes = [
    { name: 'Fajr', time: '5:30 AM' },
    { name: 'Dhuhr', time: '1:15 PM' },
    { name: 'Asr', time: '4:45 PM' },
    { name: 'Maghrib', time: '6:20 PM' },
    { name: 'Isha', time: '8:30 PM' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form data:', formData);
    alert('Thank you for your message! We will respond soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'general',
      message: '',
      prayerRequest: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <FaHotel className="mr-3" /> Contact Sufrikh Hotels
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            We're here to assist you with your halal hospitality needs
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white shadow-xl rounded-xl p-6">
              <h2 className="text-2xl font-bold text-emerald-800 mb-6">Our Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mr-4">
                    <FaPhone className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+966 12 345 6789</p>
                    <p className="text-gray-600">+966 12 987 6543 (24/7 Support)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mr-4">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">info@sufrikhhotels.com</p>
                    <p className="text-gray-600">reservations@sufrikhhotels.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mr-4">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">123 Islamic Hospitality Street</p>
                    <p className="text-gray-600">Jeddah, Saudi Arabia 23456</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mr-4">
                    <FaClock className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                    <p className="text-gray-600">24/7 Reception</p>
                    <p className="text-gray-600">Restaurant: 6:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div className="bg-white shadow-xl rounded-xl p-6">
              <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
                <FaPrayingHands className="mr-2" /> Prayer Times
              </h2>
              <div className="space-y-3">
                {prayerTimes.map((prayer) => (
                  <div key={prayer.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{prayer.name}</span>
                    <span className="font-bold text-emerald-600">{prayer.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-emerald-50 p-4 rounded-lg">
                <h3 className="font-medium text-emerald-800 flex items-center mb-2">
                  <GiPrayerBeads className="mr-2" /> Masjid Information
                </h3>
                <p className="text-sm text-gray-600">
                  Our nearest masjid is Al-Rahma Mosque, just 200m from the hotel entrance. Wudu facilities available.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-xl rounded-xl p-6 h-full">
              <h2 className="text-2xl font-bold text-emerald-800 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="reservation">Reservation</option>
                      <option value="halal">Halal Certification</option>
                      <option value="feedback">Feedback</option>
                      <option value="prayer">Prayer Facilities</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="prayerRequest"
                    name="prayerRequest"
                    checked={formData.prayerRequest}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="prayerRequest" className="ml-2 block text-sm text-gray-700">
                    I need special prayer arrangements (please specify in your message)
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-150"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">Our Location</h2>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
          {/* Google Maps Embed */}
          <iframe
            title="Morogoro Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63837.87871928428!2d37.598980897265605!3d-6.821288829007384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185bc72b3f20aa8f%3A0x59e9e5fbd20f228e!2sMorogoro%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1712175283654!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </div>

        <div className="text-center mt-4">
          <FaMapMarkerAlt className="mx-auto text-4xl text-emerald-600 mb-2" />
          <p className="text-lg font-medium text-gray-700">Morogoro, Tanzania</p>
          <p className="text-gray-500">Find us here on Google Maps!</p>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Contact;