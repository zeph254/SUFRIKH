import { FaUser, FaHistory, FaPrayingHands,FaStar, FaCog, FaSignOutAlt, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import { GiMeal, GiPrayerBeads } from 'react-icons/gi';

const AccountPage = () => {
  // Sample user data
  const user = {
    name: "Aisha Rahman",
    email: "aisha@example.com",
    memberSince: "January 2023",
    loyaltyPoints: 1250,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  };

  // Sample orders
  const orders = [
    {
      id: "#SFH-2849",
      date: "15 Oct 2023",
      type: "Hotel Booking",
      status: "completed",
      amount: "$1,250",
      items: ["Deluxe Room - 3 Nights", "Breakfast Included"]
    },
    {
      id: "#SFR-5821",
      date: "22 Nov 2023",
      type: "Restaurant Reservation",
      status: "upcoming",
      amount: "$320",
      items: ["Table for 4 - Sufrikh Fine Dining", "Special Iftar Menu"]
    },
    {
      id: "#SFH-6723",
      date: "5 Dec 2023",
      type: "Hotel Booking",
      status: "cancelled",
      amount: "$980",
      items: ["Executive Suite - 2 Nights"]
    }
  ];

  // Prayer times (sample data - would ideally come from an API)
  const prayerTimes = {
    fajr: "5:30 AM",
    dhuhr: "12:30 PM",
    asr: "3:45 PM",
    maghrib: "6:15 PM",
    isha: "8:00 PM"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-playfair">My Account</h1>
          <p className="text-emerald-100">Manage your bookings and preferences</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100 mb-4"
                />
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-2 px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                  Gold Member
                </div>
              </div>

              <div className="space-y-1">
                <a href="#" className="flex items-center px-4 py-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
                  <FaUser className="mr-3" /> My Profile
                </a>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100">
                  <FaHistory className="mr-3" /> Booking History
                </a>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100">
                  <GiPrayerBeads className="mr-3" /> Prayer Preferences
                </a>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100">
                  <FaCog className="mr-3" /> Account Settings
                </a>
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 text-red-500">
                  <FaSignOutAlt className="mr-3" /> Logout
                </a>
              </div>
            </div>

            {/* Prayer Times Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaPrayingHands className="text-emerald-600 mr-2" /> 
                Today's Prayer Times
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Fajr</span>
                  <span className="font-medium">{prayerTimes.fajr}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dhuhr</span>
                  <span className="font-medium">{prayerTimes.dhuhr}</span>
                </div>
                <div className="flex justify-between">
                  <span>Asr</span>
                  <span className="font-medium">{prayerTimes.asr}</span>
                </div>
                <div className="flex justify-between">
                  <span>Maghrib</span>
                  <span className="font-medium">{prayerTimes.maghrib}</span>
                </div>
                <div className="flex justify-between">
                  <span>Isha</span>
                  <span className="font-medium">{prayerTimes.isha}</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Set Prayer Alerts
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-playfair mb-2">Welcome Back, {user.name.split(' ')[0]}!</h2>
                  <p className="text-emerald-100">Member since {user.memberSince} • {user.loyaltyPoints} Loyalty Points</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-white text-emerald-700 hover:bg-gray-100 px-6 py-2 rounded-full font-medium transition-colors flex items-center">
                    <GiMeal className="mr-2" /> Redeem Points
                  </button>
                </div>
              </div>
            </div>

            {/* Current Bookings */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FaHistory className="text-emerald-600 mr-2" /> 
                My Bookings & Orders
              </h3>
              
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="font-bold">{order.type}</h4>
                        <p className="text-sm text-gray-500">#{order.id} • {order.date}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        {order.status === "completed" && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                            <FaCheckCircle className="mr-1" /> Completed
                          </span>
                        )}
                        {order.status === "upcoming" && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                            <FaClock className="mr-1" /> Upcoming
                          </span>
                        )}
                        {order.status === "cancelled" && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
                            <FaTimesCircle className="mr-1" /> Cancelled
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {order.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="font-bold text-lg mb-2 sm:mb-0">{order.amount}</div>
                      <div className="space-x-2">
                        <button className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-sm">
                          View Details
                        </button>
                        {order.status === "upcoming" && (
                          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                            Modify Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loyalty Program */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FaStar className="text-yellow-500 mr-2" /> 
                Sufrikh Loyalty Program
              </h3>
              
              <div className="flex items-center mb-6">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 rounded-full" 
                    style={{ width: `${Math.min(100, (user.loyaltyPoints / 2000) * 100)}%` }}
                  ></div>
                </div>
                <span className="ml-4 font-medium">{user.loyaltyPoints}/2000 points</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-emerald-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-2">5%</div>
                  <p className="text-gray-700">Discount on all bookings</p>
                </div>
                <div className="border border-emerald-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-2">Free</div>
                  <p className="text-gray-700">Room upgrade at 1500 pts</p>
                </div>
                <div className="border border-emerald-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-2">VIP</div>
                  <p className="text-gray-700">Access at 2000 pts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;