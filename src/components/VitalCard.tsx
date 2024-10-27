import React from 'react';
import { LucideIcon } from 'lucide-react';

interface VitalCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
}

const VitalCard = ({ icon: Icon, label, value, change }: VitalCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-gray-600">{label}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">{value}</span>
            <span className={`text-sm ${change.startsWith('+') ? 'text-green-500' : change.startsWith('-') ? 'text-red-500' : 'text-gray-500'}`}>
              {change}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalCard;