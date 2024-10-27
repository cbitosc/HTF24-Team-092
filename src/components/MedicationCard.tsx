import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface MedicationProps {
  name: string;
  dosage: string;
  time: string;
}

const MedicationCard = ({ name, dosage, time }: MedicationProps) => {
  const [taken, setTaken] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTaken(!taken)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            taken ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {taken && <Check className="w-4 h-4 text-white" />}
        </button>
        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-sm text-gray-600">{dosage}</p>
        </div>
      </div>
      <p className="text-sm text-blue-600">{time}</p>
    </div>
  );
};

export default MedicationCard;