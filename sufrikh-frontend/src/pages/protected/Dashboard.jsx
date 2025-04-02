import React, { useState, useEffect } from 'react';
import { 
  FaHotel, FaUtensils, FaCalendarAlt, FaUserCircle,
  FaCheckCircle, FaClock, FaChartLine, FaPrayingHands,
  FaUsers, FaWarehouse, FaBroom, FaQuran
} from 'react-icons/fa';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  // State initialization with mock data
  const [shifts, setShifts] = useState([
    {
      id: 1,
      role: 'Reception',
      staffId: 101,
      date: '2023-11-15',
      start: '08:00',
      end: '16:00'
    },
    {
      id: 2,
      role: 'Housekeeping',
      staffId: 102,
      date: '2023-11-15',
      start: '09:00',
      end: '17:00'
    }
  ]);

  const [staff] = useState([
    { id: 101, name: 'Ahmed Khan' },
    { id: 102, name: 'Fatima Ali' }
  ]);

  const [prayerTimes] = useState({
    fajr: { adhan: '5:30 AM', iqama: '5:45 AM' },
    dhuhr: { adhan: '12:30 PM', iqama: '1:00 PM' },
    asr: { adhan: '3:45 PM', iqama: '4:15 PM' },
    maghrib: { adhan: '6:15 PM', iqama: '6:20 PM' },
    isha: { adhan: '8:00 PM', iqama: '8:30 PM' }
  });

  // Generate calendar events safely
  const calendarEvents = shifts.map(shift => {
    const staffMember = staff.find(s => s.id === shift.staffId);
    return {
      title: `${shift.role} - ${staffMember?.name || 'Staff'}`,
      start: new Date(`${shift.date}T${shift.start}`),
      end: new Date(`${shift.date}T${shift.end}`),
      allDay: false
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
          <FaHotel className="mr-2" /> Sufrikh Hotel Dashboard
        </h1>

        <Tabs className="bg-white rounded-lg shadow">
          <TabList className="flex border-b">
            <Tab className="px-4 py-3 font-medium focus:outline-none border-b-2 border-transparent hover:border-emerald-500 ui-selected:border-emerald-600">
              <FaChartLine className="inline mr-2" /> Overview
            </Tab>
            <Tab className="px-4 py-3 font-medium focus:outline-none border-b-2 border-transparent hover:border-emerald-500 ui-selected:border-emerald-600">
              <FaHotel className="inline mr-2" /> Bookings
            </Tab>
            <Tab className="px-4 py-3 font-medium focus:outline-none border-b-2 border-transparent hover:border-emerald-500 ui-selected:border-emerald-600">
              <FaUtensils className="inline mr-2" /> Kitchen
            </Tab>
            <Tab className="px-4 py-3 font-medium focus:outline-none border-b-2 border-transparent hover:border-emerald-500 ui-selected:border-emerald-600">
              <FaUsers className="inline mr-2" /> Staff
            </Tab>
          </TabList>

          {/* Overview Tab */}
          <TabPanel>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
              <div className="lg:col-span-2">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h2 className="text-lg font-bold mb-4 flex items-center">
                    <FaCalendarAlt className="mr-2 text-emerald-600" /> Staff Schedule
                  </h2>
                  <div className="h-96">
                    <Calendar
                      localizer={localizer}
                      events={calendarEvents}
                      startAccessor="start"
                      endAccessor="end"
                      defaultView="week"
                      views={['day', 'week', 'month']}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h2 className="text-lg font-bold mb-4 flex items-center">
                  <FaPrayingHands className="mr-2 text-emerald-600" /> Prayer Times
                </h2>
                <div className="space-y-3">
                  {Object.entries(prayerTimes).map(([name, times]) => (
                    <div key={name} className="p-3 bg-gray-50 rounded-lg hover:bg-emerald-50">
                      <div className="flex justify-between items-center">
                        <span className="capitalize font-medium">{name}</span>
                        <div className="text-right">
                          <p className="font-bold">{times.adhan}</p>
                          <p className="text-sm text-gray-500">Iqama: {times.iqama}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center">
                  <FaQuran className="mr-2" /> View Monthly Timetable
                </button>
              </div>
            </div>
          </TabPanel>

          {/* Bookings Tab */}
          <TabPanel>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FaHotel className="mr-2 text-emerald-600" /> Current Bookings
              </h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-center text-gray-500">Booking management system will be implemented here</p>
              </div>
            </div>
          </TabPanel>

          {/* Kitchen Tab */}
          <TabPanel>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FaUtensils className="mr-2 text-emerald-600" /> Halal Kitchen Management
              </h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-center text-gray-500">Halal certification and inventory tracking will be implemented here</p>
              </div>
            </div>
          </TabPanel>

          {/* Staff Tab */}
          <TabPanel>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FaUsers className="mr-2 text-emerald-600" /> Staff Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staff.map(person => (
                  <div key={person.id} className="bg-white p-4 rounded-lg shadow border flex items-center">
                    <FaUserCircle className="text-4xl text-gray-300 mr-4" />
                    <div>
                      <h3 className="font-bold">{person.name}</h3>
                      <p className="text-sm text-gray-600">Staff ID: {person.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;