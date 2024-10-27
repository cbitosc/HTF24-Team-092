import { Loader, LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout();
                navigate('/login');
            } catch (error) {
                console.error('Logout failed:', error);
                navigate('/dashboard');
            }
        };

        performLogout();
    }, [logout, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center">
            <LogOut className="w-16 h-16 text-indigo-600 mb-4 animate-bounce" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Signing you out...</h2>
            <div className="flex items-center space-x-2">
                <Loader className="w-5 h-5 text-indigo-600 animate-spin" />
                <p className="text-gray-600">Please wait while we complete the logout process</p>
            </div>
        </div>
    );
}