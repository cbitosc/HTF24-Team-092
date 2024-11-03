import React from 'react';
import { format } from 'date-fns';
import { Activity, PillIcon, Calendar } from 'lucide-react';

const History = () => {
  const events = [
    {
      id: '1',
      type: 'symptom',
      title: 'Reported Headache',
      date: new Date(),
      details: 'Mild headache with pressure in temples',
    },
    {
      id: '2',
      type: 'medication',
      title: 'Took Lisinopril',
      date: new Date(Date.now() - 3600000),
      details: '10mg dose',
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Appointment with Dr. Chen',
      date: new Date(Date.now() - 86400000),
      details: 'Regular checkup completed',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'symptom':
        return <Activity className="h-5 w-5" />;
      case 'medication':
        return <PillIcon className="h-5 w-5" />;
      case 'appointment':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'symptom':
        return 'text-yellow-500 bg-yellow-50';
      case 'medication':
        return 'text-green-500 bg-green-50';
      case 'appointment':
        return 'text-blue-500 bg-blue-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Activity History</h1>
        <p className="text-gray-600">Track all your health-related activities</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="divide-y">
          {events.map((event) => (
            <div key={event.id} className="p-4 hover:bg-gray-50">
              <div className="flex gap-4">
                <div className={`p-2 rounded-lg ${getIconColor(event.type)}`}>
                  {getIcon(event.type)}
                </div>
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.details}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {format(event.date, 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;