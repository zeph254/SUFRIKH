import { useState, useEffect } from 'react';
import { 
  FaUtensils, FaSearch, FaFilter, FaUserCircle, FaCheckCircle, 
  FaTimesCircle, FaClock, FaPrint, FaFire, FaRegClock, 
  FaMotorcycle, FaConciergeBell, FaQuran, FaBell, FaChartLine,
  FaUserShield, FaStar, FaPhoneAlt, FaMapMarkerAlt, FaHotel // Added FaHotel
} from 'react-icons/fa';
import { GiMeal, GiPrayerBeads, GiSaucepan, GiChefToque } from 'react-icons/gi';
import { MdDeliveryDining, MdFoodBank } from 'react-icons/md';

const Orders = () => {
  // Enhanced order data with chef assignment
  const [orders, setOrders] = useState([
    {
      id: 'SFR-5821',
      customer: {
        name: 'Aisha Rahman',
        room: 'Deluxe #204',
        phone: '+971 50 123 4567'
      },
      items: [
        { name: 'Iftar Feast', special: 'No nuts', chef: 'Chef Ahmed' },
        { name: '2x Fresh Juices', special: 'No ice', chef: '' }
      ],
      type: 'dine-in',
      time: '2023-11-15T18:30:00',
      status: 'preparing',
      specialRequests: 'Table near prayer area',
      amount: '$85',
      halalCertification: 'IFANCA Certified',
      rating: null
    },
    // ... other orders
  ]);

  const chefs = ['Chef Ahmed', 'Chef Fatima', 'Chef Omar', 'Chef Yusuf'];
  const [activeTab, setActiveTab] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev.map(order => 
        order.status === 'preparing' && Math.random() > 0.7 
          ? { ...order, status: 'ready' } 
          : order
      ));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced filtering
  const filteredOrders = orders.filter(order => {
    const statusMatch = activeTab === 'all' || order.status === activeTab;
    const timeMatch = timeFilter === 'all' || 
      (timeFilter === 'iftar' && order.time.includes('18')) || 
      (timeFilter === 'suhur' && order.time.includes('03'));
    return statusMatch && timeMatch;
  });

  // Update order status
  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  // Assign chef to an order item
  const assignChef = (orderId, itemIndex, chef) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const updatedItems = [...order.items];
        updatedItems[itemIndex].chef = chef;
        return { ...order, items: updatedItems };
      }
      return order;
    }));
  };

  // Complete an order
  const completeOrder = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'delivered' } : order
    ));
  };

  // Send notification to customer
  const sendNotification = (customer) => {
    alert(`Notification sent to ${customer.name} at ${customer.phone}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Prayer Time Header with Iftar Countdown */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white py-3 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <GiPrayerBeads className="text-2xl mr-2" />
            <span className="font-medium">Halal Kitchen Command Center</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-emerald-600 px-3 py-1 rounded-full">
              <FaBell className="mr-2" />
              <span>Iftar in: 2h 15m</span>
            </div>
            {Object.entries({
              fajr: '5:30 AM', dhuhr: '12:30 PM', asr: '3:45 PM',
              maghrib: '6:15 PM', isha: '8:00 PM'
            }).map(([name, time]) => (
              <div key={name} className="flex items-center">
                <span className="capitalize mr-1">{name}:</span>
                <span className="font-bold">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header with Performance Metrics */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-playfair text-emerald-800 flex items-center">
              <GiMeal className="mr-2" /> Orders Management
            </h1>
            <p className="text-gray-600">Monitor and fulfill all meal requests</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full lg:w-auto">
            {[
              { icon: <FaChartLine />, value: '24', label: 'Today' },
              { icon: <FaFire />, value: '8', label: 'Preparing' },
              { icon: <MdDeliveryDining />, value: '5', label: 'Delivery' },
              { icon: <FaStar />, value: '4.9', label: 'Rating' }
            ].map((metric, i) => (
              <div key={i} className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-emerald-600 flex justify-center">{metric.icon}</div>
                <p className="font-bold text-lg">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Enhanced Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 sticky top-0 z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {['all', 'received', 'preparing', 'ready', 'delivered'].map(status => (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center ${
                    activeTab === status 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'received' && <FaRegClock className="mr-1" />}
                  {status === 'preparing' && <FaFire className="mr-1" />}
                  {status === 'ready' && <FaCheckCircle className="mr-1" />}
                  {status === 'delivered' && <MdDeliveryDining className="mr-1" />}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Enhanced Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
              order.status === 'received' ? 'border-blue-500' :
              order.status === 'preparing' ? 'border-yellow-500' :
              order.status === 'ready' ? 'border-orange-500' :
              'border-green-500'
            }`}>
              <div className="p-6">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-bold text-emerald-800 mr-2">#{order.id}</h3>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        {order.halalCertification}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <FaUserCircle className="text-gray-400 mr-2" />
                      <div>
                        <p>{order.customer.name}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <FaPhoneAlt className="mr-1" /> {order.customer.phone}
                          {order.customer.room && (
                            <>
                              <span className="mx-2">•</span>
                              <FaHotel className="mr-1" /> {order.customer.room}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{order.amount}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                {/* Order Items with Chef Assignment */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <MdFoodBank className="mr-2" /> Order Items:
                  </h4>
                  <ul className="space-y-3">
                    {order.items.map((item, index) => (
                      <li key={index} className="pl-2 border-l-2 border-emerald-200">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {item.special && (
                              <p className="text-sm text-gray-600">Note: {item.special}</p>
                            )}
                          </div>
                          <select
                            value={item.chef}
                            onChange={(e) => assignChef(order.id, index, e.target.value)}
                            className="text-xs border rounded px-2 py-1"
                          >
                            <option value="">Assign chef</option>
                            {chefs.map(chef => (
                              <option key={chef} value={chef}>{chef}</option>
                            ))}
                          </select>
                        </div>
                        {item.chef && (
                          <p className="text-xs text-emerald-600 mt-1 flex items-center">
                            <GiChefToque className="mr-1" /> {item.chef}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Enhanced Action Panel */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center space-x-2">
                      {order.status === 'received' && (
                        <button 
                          onClick={() => updateStatus(order.id, 'preparing')}
                          className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm flex items-center"
                        >
                          <FaFire className="mr-1" /> Start Preparing
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button 
                          onClick={() => updateStatus(order.id, 'ready')}
                          className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm flex items-center"
                        >
                          <FaCheckCircle className="mr-1" /> Mark Ready
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button 
                          onClick={() => completeOrder(order.id)}
                          className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm flex items-center"
                        >
                          <MdDeliveryDining className="mr-1" /> Complete Delivery
                        </button>
                      )}
                      <button 
                        onClick={() => sendNotification(order.customer)}
                        className="p-2 text-gray-500 hover:text-emerald-600"
                        title="Notify Customer"
                      >
                        <FaBell />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-emerald-600" title="Print">
                        <FaPrint />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-emerald-600" title="View Details">
                        <FaUserShield />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Enhanced Kitchen Dashboard */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold font-playfair text-emerald-800 mb-6 flex items-center">
            <GiSaucepan className="mr-2" /> Kitchen Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chef Assignments */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <GiChefToque className="mr-2 text-emerald-600" /> Chef Assignments
              </h3>
              <div className="space-y-4">
                {chefs.map(chef => {
                  const chefOrders = orders.flatMap(order => 
                    order.items.filter(item => item.chef === chef)
                  );
                  return (
                    <div key={chef} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                          <GiChefToque className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium">{chef}</p>
                          <p className="text-sm text-gray-500">
                            {chefOrders.length} active {chefOrders.length === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>
                      <button className="text-sm text-emerald-600 hover:text-emerald-800">
                        View
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Special Requests */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <FaQuran className="mr-2 text-amber-500" /> Special Dietary Needs
              </h3>
              <div className="space-y-3">
                {orders
                  .filter(order => order.specialRequests)
                  .slice(0, 3)
                  .map(order => (
                    <div key={order.id} className="p-3 bg-amber-50 rounded-lg">
                      <p className="font-medium">#{order.id} - {order.customer.name}</p>
                      <p className="text-sm text-gray-700 mt-1">{order.specialRequests}</p>
                    </div>
                  ))}
                <button className="w-full mt-4 text-emerald-600 hover:text-emerald-800 font-medium">
                  View All Requests →
                </button>
              </div>
            </div>
            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <FaChartLine className="mr-2 text-purple-500" /> Kitchen Performance
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Preparation Time', value: '32 min avg', progress: 75, color: 'bg-emerald-600' },
                  { label: 'Halal Compliance', value: '100%', progress: 100, color: 'bg-green-500' },
                  { label: 'Customer Satisfaction', value: '4.9/5', progress: 98, color: 'bg-yellow-500' }
                ].map((metric, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span>{metric.label}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${metric.color} h-2 rounded-full`} style={{ width: `${metric.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;