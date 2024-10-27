import React from 'react';
import { Activity, Calendar, Clock, FileText, Home, MessageSquare, PillIcon, Settings } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar = ({ activeItem, setActiveItem }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Activity, label: 'Symptoms' },
    { icon: PillIcon, label: 'Medications' },
    { icon: Calendar, label: 'Appointments' },
    { icon: MessageSquare, label: 'Chat' },
    { icon: FileText, label: 'Records' },
    { icon: Clock, label: 'History' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Activity className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-800">HealthTrack</span>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeItem === item.label
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;