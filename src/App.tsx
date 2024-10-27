import { useState } from 'react';
import Appointments from './components/Appointments';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Medications from './components/Medications';
import Records from './components/Records';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Symptoms from './components/Symptoms';

function App() {
  const [activeSection, setActiveSection] = useState('Dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Symptoms':
        return <Symptoms />;
      case 'Medications':
        return <Medications />;
      case 'Appointments':
        return <Appointments />;
      case 'Chat':
        return <Chat />;
      case 'Records':
        return <Records />;
      case 'History':
        return <History />;
      case 'Settings':
        return <Settings />;
      // case 'Analysis':
      //   return <MyComponent/>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem={activeSection} setActiveItem={setActiveSection} />
      {renderSection()}
    </div>
  );
}

export default App;