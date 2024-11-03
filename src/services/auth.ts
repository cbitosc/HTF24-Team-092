import { LoginCredentials, SignupCredentials, User } from '../types/auth';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
    async login(credentials: LoginCredentials): Promise<User> {
        await delay(1000); // Simulate API call
        const storedUser = localStorage.getItem(`user_${credentials.email}`);

        if (!storedUser) {
            throw new Error('Invalid credentials');
        }

        const user = JSON.parse(storedUser);
        if (user.password !== credentials.password) {
            throw new Error('Invalid credentials');
        }

        delete user.password;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    },

    async signup(credentials: SignupCredentials): Promise<User> {
        await delay(1000); // Simulate API call

        if (localStorage.getItem(`user_${credentials.email}`)) {
            throw new Error('User already exists');
        }

        const user = {
            id: Date.now().toString(),
            email: credentials.email,
            name: credentials.name,
            password: credentials.password,
        };

        localStorage.setItem(`user_${credentials.email}`, JSON.stringify(user));
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return userWithoutPassword;
    },

    logout() {
        localStorage.removeItem('currentUser');
    },

    getCurrentUser(): User | null {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }
};