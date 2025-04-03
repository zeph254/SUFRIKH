import React, { useState } from 'react';
import { 
  FaHotel, FaUsers, FaChartLine, FaQuran, FaUtensils, 
  FaBed, FaMoneyBillWave, FaClipboardList, FaCog,
  FaBell, FaUserCircle, FaSearch, FaPrayingHands
} from 'react-icons/fa';
import { GiMeal, GiPrayerBeads } from 'react-icons/gi';
import { MdCleaningServices, MdRoomService } from 'react-icons/md';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New booking from Ahmed Khan', time: '10 mins ago', read: false },
    { id: 2, message: 'Halal certificate needs renewal', time: '2 hours ago', read: false }
  ]);

  // Mock data
  const stats = [
    { title: 'Total Bookings', value: '142', icon: <FaBed className="text-2xl" />, change: '+12%' },
    { title: 'Revenue', value: '$28,450', icon: <FaMoneyBillWave className="text-2xl" />, change: '+7%' },
    { title: 'Occupancy Rate', value: '78%', icon: <FaHotel className="text-2xl" />, change: '+5%' },
    { title: 'Halal Meals Served', value: '324', icon: <GiMeal className="text-2xl" />, change: '+18%' }
  ];

  const recentBookings = [
    { id: 101, guest: 'Fatima Al-Mansoor', room: 'Deluxe', checkIn: '15 Nov', checkOut: '18 Nov', status: 'confirmed' },
    { id: 102, guest: 'Omar Khan', room: 'Executive', checkIn: '16 Nov', checkOut: '20 Nov', status: 'confirmed' },
    { id: 103, guest: 'Yusuf Abdullah', room: 'Family', checkIn: '17 Nov', checkOut: '19 Nov', status: 'pending' }
  ];

  const prayerTimes = {
    fajr: '5:30 AM', dhuhr: '1:00 PM', asr: '4:15 PM', maghrib: '6:20 PM', isha: '8:30 PM'
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar with Islamic geometric pattern */}
      <div className="w-64 bg-gradient-to-b from-emerald-900 to-green-800 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('islamic-pattern.png')] bg-repeat"></div>
        <div className="relative z-10 p-4 flex flex-col h-full">
          <div className="flex items-center mb-8 pt-4">
            <FaHotel className="text-3xl mr-2 text-emerald-300" />
            <h1 className="text-2xl font-bold">Sufrikh<span className="text-emerald-300">Admin</span></h1>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-800'}`}
                >
                  <FaChartLine className="mr-3" />
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === 'bookings' ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-800'}`}
                >
                  <FaBed className="mr-3" />
                  Bookings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('halal')}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === 'halal' ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-800'}`}
                >
                  <GiMeal className="mr-3" />
                  Halal Kitchen
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('staff')}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === 'staff' ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-800'}`}
                >
                  <FaUsers className="mr-3" />
                  Staff Management
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('prayer')}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === 'prayer' ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-800'}`}
                >
                  <FaPrayingHands className="mr-3" />
                  Prayer Facilities
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('reports')}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === 'reports' ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-800'}`}
                >
                  <FaClipboardList className="mr-3" />
                  Reports
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="mt-auto pb-4">
            <div className="flex items-center p-3 bg-emerald-800 rounded-lg">
              <FaUserCircle className="text-2xl mr-3" />
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-emerald-300">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b flex items-center justify-between p-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FaBell />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-xl text-gray-600" />
              <span className="font-medium">Administrator</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-sm mt-3 text-emerald-600 font-medium">
                      <span>{stat.change}</span> from last week
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Bookings and Prayer Times */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Recent Bookings</h3>
                    <button className="text-emerald-600 text-sm font-medium">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="pb-3">Booking ID</th>
                          <th className="pb-3">Guest</th>
                          <th className="pb-3">Room</th>
                          <th className="pb-3">Dates</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map(booking => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="py-3">#{booking.id}</td>
                            <td className="py-3">{booking.guest}</td>
                            <td className="py-3">{booking.room}</td>
                            <td className="py-3">{booking.checkIn} - {booking.checkOut}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FaPrayingHands className="mr-2 text-emerald-600" /> Today's Prayer Times
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(prayerTimes).map(([prayer, time]) => (
                      <div key={prayer} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="capitalize font-medium">{prayer}</span>
                        <span className="font-bold">{time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-medium text-emerald-800 flex items-center mb-2">
                      <GiPrayerBeads className="mr-2" /> Prayer Facilities Status
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Main Prayer Hall</span>
                        <span className="text-green-600">Ready</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Wudu Stations</span>
                        <span className="text-green-600">3/4 Operational</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Quran Availability</span>
                        <span className="text-green-600">Stocked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-6">Bookings Management</h3>
              {/* Bookings content would go here */}
              <div className="text-center py-12 text-gray-500">
                <FaBed className="text-4xl mx-auto mb-4 text-gray-300" />
                <p>Booking management system will be implemented here</p>
              </div>
            </div>
          )}

          {activeTab === 'halal' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Halal Kitchen Management</h3>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center">
                  <FaUtensils className="mr-2" /> Add New Certification
                </button>
              </div>
              {/* Halal content would go here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3 flex items-center">
                    <GiMeal className="mr-2 text-emerald-600" /> Meat Suppliers
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Al-Safi Halal Meats</span>
                      <span className="text-green-600 text-sm">Certified</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Halal World Foods</span>
                      <span className="text-green-600 text-sm">Certified</span>
                    </li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3 flex items-center">
                    <MdRoomService className="mr-2 text-emerald-600" /> Kitchen Status
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Halal Compliance</span>
                      <span className="text-green-600 text-sm">100%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Last Inspection</span>
                      <span className="text-gray-600 text-sm">5 Nov 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would follow the same pattern */}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;