import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import AppointmentCard from './AppointmentCard';
import Modal from './Modal'; // Ensure you have a Modal component

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: Date;
  notes?: string;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctor: 'Dr. Sarah Chen',
      specialty: 'Cardiologist',
      date: new Date(Date.now() + 86400000),
      notes: 'Regular checkup',
    },
    {
      id: '2',
      doctor: 'Dr. Michael Ross',
      specialty: 'General',
      date: new Date(Date.now() + 86400000 * 7),
      notes: 'Follow-up appointment',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Appointment>({
    id: '',
    doctor: '',
    specialty: '',
    date: new Date(),
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // If the input name is 'date', convert the value to a Date object
    const updatedValue = name === 'date' ? new Date(value) : value;

    setNewAppointment((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentToAdd = {
      ...newAppointment,
      id: (appointments.length + 1).toString(),
      date: new Date(newAppointment.date), // Ensure the date is a Date object
    };
    setAppointments((prev) => [...prev, appointmentToAdd]);
    setIsModalOpen(false);
    setNewAppointment({ id: '', doctor: '', specialty: '', date: new Date(), notes: '' }); // Reset form
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <p className="text-gray-600">Manage your upcoming appointments</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5" />
          Schedule Appointment
        </button>
      </div>

      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                doctor={apt.doctor}
                specialty={apt.specialty}
                date={format(apt.date, 'MMM d, yyyy h:mm a')}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Past Appointments</h2>
          <div className="text-center py-8 text-gray-500">
            No past appointments to show
          </div>
        </div>
      </div>

      {/* Modal for scheduling an appointment */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-semibold">Schedule New Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="doctor"
              placeholder="Doctor's Name"
              value={newAppointment.doctor}
              onChange={handleInputChange}
              required
              className="input"
            />
            <input
              type="text"
              name="specialty"
              placeholder="Specialty"
              value={newAppointment.specialty}
              onChange={handleInputChange}
              required
              className="input"
            />
            <input
              type="datetime-local"
              name="date"
              value={newAppointment.date.toISOString().substring(0, 16)}
              onChange={handleInputChange}
              required
              className="input"
            />
            <textarea
              name="notes"
              placeholder="Notes"
              value={newAppointment.notes}
              onChange={handleInputChange}
              className="input"
            />
            <button type="submit" className="btn-primary">Schedule</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Appointments;
