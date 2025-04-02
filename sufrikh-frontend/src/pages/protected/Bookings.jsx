import { useState, useEffect } from 'react';
import { 
  FaHotel, 
  FaUtensils, 
  FaCalendarAlt, 
  FaSearch, 
  FaFilter,
  FaUserCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaPrint
} from 'react-icons/fa';
import { GiMeal, GiPrayerBeads } from 'react-icons/gi';

const Bookings = () => {
  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      id: 'SFH-2849',
      guest: 'Aisha Rahman',
      room: 'Deluxe Room',
      checkIn: '2023-11-15',
      checkOut: '2023-11-18',
      status: 'confirmed',
      specialRequests: 'Prayer time notification, Halal breakfast',
      amount: '$1,250'
    },
    {
      id: 'SFH-3012',
      guest: 'Omar Khan',
      room: 'Executive Suite',
      checkIn: '2023-11-20',
      checkOut: '2023-11-22',
      status: 'pending',
      specialRequests: 'Quran in room, Early check-in',
      amount: '$980'
    },
    {
      id: 'SFH-2955',
      guest: 'Fatima Ahmed',
      room: 'Royal Suite',
      checkIn: '2023-11-25',
      checkOut: '2023-11-30',
      status: 'cancelled',
      specialRequests: 'Private prayer space needed',
      amount: '$2,250'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter bookings based on status and search term
  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Today's prayer times
  const [prayerTimes] = useState({
    fajr: '5:30 AM',
    dhuhr: '12:30 PM',
    asr: '3:45 PM',
    maghrib: '6:15 PM',
    isha: '8:00 PM'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Prayer Times */}
      <div className="bg-emerald-700 text-white py-3 px-4 flex justify-between items-center flex-wrap">
        <div className="flex items-center">
          <GiPrayerBeads className="text-2xl mr-2" />
          <span className="font-medium">Staff Dashboard</span>
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

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-playfair text-emerald-800">Bookings Management</h1>
            <p className="text-gray-600">Manage room reservations and guest services</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-medium flex items-center">
              <FaHotel className="mr-2" /> Add New Booking
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Bookings</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <FaFilter className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="relative">
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-emerald-600">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUserCircle className="text-gray-400 mr-2" />
                        {booking.guest}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.room}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.checkIn}</div>
                      <div className="text-sm text-gray-500">to {booking.checkOut}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.status === 'confirmed' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <FaCheckCircle className="mr-1" /> Confirmed
                        </span>
                      )}
                      {booking.status === 'pending' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          <FaClock className="mr-1" /> Pending
                        </span>
                      )}
                      {booking.status === 'cancelled' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          <FaTimesCircle className="mr-1" /> Cancelled
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{booking.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-emerald-600 hover:text-emerald-900 mr-3">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FaPrint />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Special Requests Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-emerald-800 flex items-center">
              <FaUtensils className="mr-2" /> Special Requests Needing Attention
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {bookings
              .filter(b => b.specialRequests)
              .map(booking => (
                <div key={booking.id} className="px-6 py-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{booking.guest} - {booking.room}</h4>
                      <p className="text-gray-600 mt-1">{booking.specialRequests}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                        Mark Complete
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-emerald-600">24</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Occupancy Rate</h3>
            <p className="text-3xl font-bold text-emerald-600">78%</p>
            <p className="text-sm text-gray-500 mt-1">Current</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-emerald-600">$24,580</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;