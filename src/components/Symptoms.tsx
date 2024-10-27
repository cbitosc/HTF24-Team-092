import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Search, AlertTriangle, Clock, FileText } from 'lucide-react';

interface Symptom {
  id: string;
  date: Date;
  type: string;
  severity: number;
  duration: string;
  description: string;
  notes?: string;
  status: 'active' | 'resolved';
}

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      id: '1',
      date: new Date(),
      type: 'Headache',
      severity: 3,
      duration: '2 hours',
      description: 'Mild headache with pressure in temples',
      notes: 'Started after lunch',
      status: 'resolved',
    },
    {
      id: '2',
      date: new Date(),
      type: 'Fatigue',
      severity: 4,
      duration: 'All day',
      description: 'General tiredness and lack of energy',
      status: 'active',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSymptom, setNewSymptom] = useState<Omit<Symptom, 'id'>>({
    date: new Date(),
    type: '',
    severity: 1,
    duration: '',
    description: '',
    notes: '',
    status: 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSymptoms([
      ...symptoms,
      {
        ...newSymptom,
        id: Math.random().toString(36).substr(2, 9),
      },
    ]);
    setShowForm(false);
    setNewSymptom({
      date: new Date(),
      type: '',
      severity: 1,
      duration: '',
      description: '',
      notes: '',
      status: 'active',
    });
  };

  const filteredSymptoms = symptoms.filter(
    (symptom) =>
      symptom.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      symptom.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: number) => {
    if (severity <= 2) return 'bg-green-100 text-green-800';
    if (severity <= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Symptoms Tracker</h1>
          <p className="text-gray-600">Monitor and log your symptoms</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Log Symptom
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Log New Symptom</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symptom Type
                </label>
                <input
                  type="text"
                  value={newSymptom.type}
                  onChange={(e) => setNewSymptom({ ...newSymptom, type: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., Headache, Nausea"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={newSymptom.duration}
                  onChange={(e) => setNewSymptom({ ...newSymptom, duration: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., 2 hours, All day"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Severity (1-5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newSymptom.severity}
                  onChange={(e) => setNewSymptom({ ...newSymptom, severity: parseInt(e.target.value) })}
                  className="w-full"
                  required
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newSymptom.status}
                  onChange={(e) => setNewSymptom({ ...newSymptom, status: e.target.value as 'active' | 'resolved' })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newSymptom.description}
                onChange={(e) => setNewSymptom({ ...newSymptom, description: e.target.value })}
                className="w-full p-2 border rounded-lg"
                rows={3}
                placeholder="Describe your symptoms in detail"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={newSymptom.notes}
                onChange={(e) => setNewSymptom({ ...newSymptom, notes: e.target.value })}
                className="w-full p-2 border rounded-lg"
                rows={2}
                placeholder="Any additional information (optional)"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">
                Save Symptom
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Symptom History</h2>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              All
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
              Active
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
              Resolved
            </span>
          </div>
        </div>
        <div className="divide-y">
          {filteredSymptoms.map((symptom) => (
            <div key={symptom.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <AlertTriangle className={`h-5 w-5 ${symptom.status === 'active' ? 'text-yellow-500' : 'text-green-500'}`} />
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {symptom.type}
                      <span className={`px-2 py-0.5 rounded-full text-sm ${getSeverityColor(symptom.severity)}`}>
                        Severity {symptom.severity}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{symptom.description}</p>
                    {symptom.notes && (
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {symptom.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 flex items-center justify-end gap-1">
                    <Clock className="h-4 w-4" />
                    {symptom.duration}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {format(symptom.date, 'MMM d, yyyy h:mm a')}
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

export default Symptoms;