import React from 'react';
import { FileText, Download } from 'lucide-react';

const Records = () => {
  const records = [
    {
      id: '1',
      title: 'Blood Test Results',
      date: '2024-03-15',
      type: 'Lab Report',
      doctor: 'Dr. Sarah Chen',
    },
    {
      id: '2',
      title: 'Annual Physical Report',
      date: '2024-02-28',
      type: 'Medical Report',
      doctor: 'Dr. Michael Ross',
    },
  ];

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
        <p className="text-gray-600">Access and manage your medical documents</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Documents</h2>
        </div>
        <div className="divide-y">
          {records.map((record) => (
            <div key={record.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{record.title}</h3>
                    <p className="text-sm text-gray-600">
                      {record.type} • {record.doctor} • {record.date}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Records;