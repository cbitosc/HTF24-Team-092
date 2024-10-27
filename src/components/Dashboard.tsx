import { Activity, Bell, Heart, LogOut, Thermometer } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppointmentCard from './AppointmentCard';
import MedicationCard from './MedicationCard';
import VitalCard from './VitalCard';

const Dashboard = () => {
  const [notifications, setNotifications] = useState(2);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const vitals = [
    { icon: Heart, label: 'Heart Rate', value: '72 bpm', change: '+2' },
    { icon: Thermometer, label: 'Temperature', value: '98.6°F', change: '-0.2' },
    { icon: Activity, label: 'Blood Pressure', value: '120/80', change: '0' },
  ];

  const appointments = [
    { doctor: 'Dr. Sarah Chen', specialty: 'Cardiologist', date: 'Tomorrow, 10:00 AM' },
    { doctor: 'Dr. Michael Ross', specialty: 'General', date: 'Mar 25, 2:30 PM' },
  ];

  const medications = [
    { name: 'Lisinopril', dosage: '10mg', time: '8:00 AM' },
    { name: 'Metformin', dosage: '500mg', time: '9:00 AM' },
    { name: 'Aspirin', dosage: '81mg', time: '8:00 PM' },
  ];

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (notifications > 0) {
      setNotifications(0);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">

      <div className="flex justify-between items-center mb-8">
        <div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, John</h1>
          <p className="text-gray-600">Here's your health summary</p>
        </div>
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="h-6 w-6" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                {notifications}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="p-4">
                <p className="font-medium text-gray-800">New Notifications</p>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600">Time to take Lisinopril (10mg)</p>
                  <p className="text-sm text-gray-600">Appointment with Dr. Chen tomorrow</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {vitals.map((vital) => (
          <VitalCard key={vital.label} {...vital} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <AppointmentCard key={apt.doctor} {...apt} />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Medications</h2>
          <div className="space-y-4">
            {medications.map((med) => (
              <MedicationCard key={med.name} {...med} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;