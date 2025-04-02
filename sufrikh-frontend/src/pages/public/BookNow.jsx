import { useState } from 'react';
import { FaHotel, FaUtensils, FaCalendarAlt, FaUser, FaMoon, FaChild, FaPray,FaCheck,FaClock } from 'react-icons/fa';
import { GiMeal, GiPrayerBeads } from 'react-icons/gi';

const BookNow = () => {
  const [activeTab, setActiveTab] = useState('hotel');
  const [prayerTimes] = useState({
    fajr: '5:30 AM',
    dhuhr: '12:30 PM',
    asr: '3:45 PM',
    maghrib: '6:15 PM',
    isha: '8:00 PM'
  });

  // Sample data
  const roomTypes = [
    { id: 1, name: 'Deluxe Room', price: '$250/night', amenities: ['Qibla direction', 'Prayer mat', 'Halal toiletries'] },
    { id: 2, name: 'Executive Suite', price: '$450/night', amenities: ['Private prayer area', 'Quran', 'Halal minibar'] },
    { id: 3, name: 'Royal Suite', price: '$750/night', amenities: ['Musholla', 'Islamic art collection', 'Butler service'] }
  ];

  const mealOptions = [
    { id: 1, name: 'Iftar Feast', price: '$45', description: 'Traditional Middle Eastern iftar spread' },
    { id: 2, name: 'Suhur Package', price: '$35', description: 'Nutritious pre-dawn meal' },
    { id: 3, name: 'Halal Gourmet', price: '$60', description: 'Chef\'s special 5-course meal' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Prayer Time Banner */}
      <div className="bg-emerald-700 text-white py-3 px-4 flex justify-between items-center flex-wrap">
        <div className="flex items-center">
          <GiPrayerBeads className="text-2xl mr-2" />
          <span className="font-medium">Today's Prayer Times:</span>
        </div>
        <div className="flex flex-wrap gap-4 mt-2 sm:mt-0">
          {Object.entries(prayerTimes).map(([name, time]) => (
            <div key={name} className="flex items-center">
              <span className="capitalize mr-1">{name}:</span>
              <span className="font-bold">{time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-playfair text-emerald-800 mb-3">
            Book Your Islamic Luxury Experience
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reserve your halal-friendly accommodation or dining experience with our premium services
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-white shadow-md p-1">
            <button
              onClick={() => setActiveTab('hotel')}
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center ${activeTab === 'hotel' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FaHotel className="mr-2" />
              Book a Room
            </button>
            <button
              onClick={() => setActiveTab('meal')}
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center ${activeTab === 'meal' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FaUtensils className="mr-2" />
              Order a Meal
            </button>
          </div>
        </div>

        {/* Hotel Booking Form */}
        {activeTab === 'hotel' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Room Selection */}
              <div className="lg:col-span-2 p-8">
                <h2 className="text-2xl font-bold font-playfair text-emerald-800 mb-6">
                  Select Your Accommodation
                </h2>
                
                <div className="space-y-6">
                  {roomTypes.map(room => (
                    <div key={room.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">{room.name}</h3>
                          <p className="text-emerald-600 font-medium">{room.price}</p>
                        </div>
                        <button className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium">
                          Select
                        </button>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Islamic Amenities:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {room.amenities.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <FaCheck className="text-emerald-500 mr-2 text-sm" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Booking Form */}
              <div className="bg-gray-50 p-8">
                <h2 className="text-2xl font-bold font-playfair text-emerald-800 mb-6">
                  Booking Details
                </h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Check-in</label>
                      <div className="relative">
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <FaCalendarAlt className="absolute right-3 top-3.5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Check-out</label>
                      <div className="relative">
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <FaCalendarAlt className="absolute right-3 top-3.5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Guests</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                          {[1, 2, 3, 4, '5+'].map(num => (
                            <option key={num}>{num} Adult{num !== 1 ? 's' : ''}</option>
                          ))}
                        </select>
                        <FaUser className="absolute right-3 top-3.5 text-gray-400" />
                      </div>
                      <div className="relative">
                        <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                          {[0, 1, 2, 3, '4+'].map(num => (
                            <option key={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                          ))}
                        </select>
                        <FaChild className="absolute right-3 top-3.5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Special Requests</label>
                    <textarea
                      placeholder="Prayer time notifications, halal meal preferences, etc."
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    Complete Booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Meal Ordering Form */}
        {activeTab === 'meal' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Meal Selection */}
              <div className="lg:col-span-2 p-8">
                <h2 className="text-2xl font-bold font-playfair text-emerald-800 mb-6">
                  Our Halal Dining Options
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mealOptions.map(meal => (
                    <div key={meal.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 bg-gray-200 flex items-center justify-center">
                        <GiMeal className="text-4xl text-emerald-600" />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold">{meal.name}</h3>
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-medium">
                            {meal.price}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{meal.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
                              -
                            </button>
                            <span>0</span>
                            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
                              +
                            </button>
                          </div>
                          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded-full text-sm font-medium">
                            Add to Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-gray-50 p-8">
                <h2 className="text-2xl font-bold font-playfair text-emerald-800 mb-6">
                  Your Order
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold mb-3 flex justify-between">
                      <span>Selected Items</span>
                      <span className="text-emerald-600">$0.00</span>
                    </h3>
                    <div className="text-center py-8 text-gray-400">
                      <FaUtensils className="mx-auto text-3xl mb-2" />
                      <p>No items selected yet</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold mb-3">Delivery Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="delivery" className="text-emerald-600" checked />
                        <span>Dine In</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="delivery" className="text-emerald-600" />
                        <span>Takeaway</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="delivery" className="text-emerald-600" />
                        <span>Room Delivery (for guests)</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold mb-3">Meal Timing</h3>
                    <div className="relative">
                      <input
                        type="datetime-local"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <FaClock className="absolute right-3 top-3.5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      For iftar/suhur orders, please select appropriate time
                    </p>
                  </div>
                  
                  <button
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    Confirm Order ($0.00)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Services */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold font-playfair text-emerald-800 mb-6">
            Enhance Your Experience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaPray className="text-3xl text-emerald-600" />,
                title: "Prayer Arrangements",
                description: "Book private prayer spaces or mosque transportation"
              },
              {
                icon: <FaChild className="text-3xl text-emerald-600" />,
                title: "Childcare Services",
                description: "Certified halal childcare during your stay"
              },
              {
                icon: <GiMeal className="text-3xl text-emerald-600" />,
                title: "Custom Halal Menus",
                description: "Personalized meal plans with our chefs"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium">
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;