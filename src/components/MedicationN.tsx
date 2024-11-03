import { Bell, Clock, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import NotificationManager from './NotificationManager';
import TimePicker from './TimePicker';
import { Medication } from './types';

const Medications = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [medication, setMedication] = useState('');
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [period, setPeriod] = useState('AM');
  const [frequency, setFrequency] = useState('once');

  useEffect(() => {
    const initializeNotifications = async () => {
      await NotificationManager.initialize();
    };

    initializeNotifications();

    // Load saved medications from localStorage
    const savedMeds = localStorage.getItem('medications');
    if (savedMeds) {
      const parsedMeds = JSON.parse(savedMeds);
      setMedications(parsedMeds);
      // Reschedule notifications for saved medications
      parsedMeds.forEach((med: Medication) => {
        NotificationManager.scheduleNotification(med);
      });
    }

    // Cleanup notifications on unmount
    return () => {
      medications.forEach(med => {
        NotificationManager.clearNotification(med.id);
      });
    };
  }, []);

  // Save medications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  const handleTimePickerChange = (field: string, value: string) => {
    switch (field) {
      case 'hours':
        setHours(value);
        break;
      case 'minutes':
        setMinutes(value);
        break;
      case 'period':
        setPeriod(value);
        break;
      case 'frequency':
        setFrequency(value);
        break;
    }
  };

  const addMedication = async () => {
    if (!medication) return;

    const newMedication = {
      id: Date.now(),
      name: medication,
      time: `${hours}:${minutes} ${period}`,
      frequency
    };

    setMedications(prev => [...prev, newMedication]);
    NotificationManager.scheduleNotification(newMedication);

    // Reset form
    setMedication('');
    setHours('12');
    setMinutes('00');
    setPeriod('AM');
    setFrequency('once');
  };

  const deleteMedication = (id: number) => {
    NotificationManager.clearNotification(id);
    setMedications(prev => prev.filter(med => med.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
          <div className="flex items-center mb-6">
            <Bell className="h-6 w-6 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Medication Reminder</h1>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Medication Name"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />

            <TimePicker
              hours={hours}
              minutes={minutes}
              period={period}
              frequency={frequency}
              onChange={handleTimePickerChange}
            />

            <button
              onClick={addMedication}
              disabled={!medication}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
              <span>Add Medication</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex items-center mb-6">
            <Clock className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Scheduled Medications</h2>
          </div>

          {medications.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No medications scheduled</p>
          ) : (
            <div className="space-y-3">
              {medications.map((med) => (
                <div
                  key={med.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{med.name}</h3>
                    <p className="text-sm text-gray-600">
                      {med.time} • {med.frequency}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMedication(med.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Medications;