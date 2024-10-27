import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Appointments from './components/Appointments';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Login from './components/Login';
import Logout from './components/Logout';
import Medications from './components/Medications';
import Records from './components/Records';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Signup from './components/Signup';
import Symptoms from './components/Symptoms';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
};

function MainLayout() {
  const [activeSection, setActiveSection] = useState('Dashboard');

  const getComponent = () => {
    switch (activeSection) {
      case 'Dashboard': return <Dashboard />;
      case 'Symptoms': return <Symptoms />;
      case 'Medications': return <Medications />;
      case 'Appointments': return <Appointments />;
      case 'Chat': return <Chat />;
      case 'Records': return <Records />;
      case 'History': return <History />;
      case 'Settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem={activeSection} setActiveItem={setActiveSection} />
      <main className="flex-1">
        {getComponent()}
      </main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;