import { create } from "zustand";
import axios from "axios";
import { API_URL } from "@/lib/utils";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/firebase/config';

interface User {
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    [key: string]: any;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
    loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    signup: (email: string, password: string, firstName: string, lastName: string, phoneNumber: string, confirmPassword: string) => Promise<void>;
    signuptaskcreator: (email: string, password: string, firstName: string, lastName: string, phoneNumber: string, confirmPassword: string) => Promise<void>;
    profileAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,

    loginWithEmailAndPassword: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/users/login`, {
                email,
                password
            });

            if (response.data) {
                set({
                    user: response.data.user || { email },
                    isAuthenticated: true,
                    error: null,
                    isLoading: false
                });

                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                }
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to login";
            set({
                error: errorMessage,
                isLoading: false,
                isAuthenticated: false,
                user: null
            });
            throw error;
        }
    },

    loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userInfo = {
                email: user.email!,
                firstName: user.displayName?.split(' ')[0] || '',
                lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
                photoURL: user.photoURL
            };

            set({
                user: userInfo,
                isAuthenticated: true,
                error: null,
                isLoading: false
            });

            const firebaseToken = await user.getIdToken();
            localStorage.setItem('firebaseToken', firebaseToken);

        } catch (error: any) {
            console.error('Google login error:', error);
            set({
                error: error.message,
                isLoading: false,
                isAuthenticated: false,
                user: null
            });
            throw error;
        }
    },

    signup: async (email, password, firstName, lastName, phoneNumber, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axios.post(`${API_URL}/users/earn`, {
                email, password, firstName, lastName, phoneNumber, confirmPassword
            });

            if (data.newUser) {
                set({
                    user: data.newUser,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            }
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Error signing up",
                isLoading: false,
                isAuthenticated: false,
                user: null
            });
            throw error;
        }
    },

    signuptaskcreator: async (email, password, firstName, lastName, phoneNumber, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axios.post(`${API_URL}/users/create`, {
                email, password, firstName, lastName, phoneNumber, confirmPassword
            });

            if (data.newUser) {
                set({
                    user: data.newUser,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            }
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Error signing up",
                isLoading: false,
                isAuthenticated: false,
                user: null
            });
            throw error;
        }
    },

    profileAuth: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axios.get(`${API_URL}/users/user-profile`);

            if (data.user) {
                set({
                    user: data.user,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                });
            }
        } catch (error) {
            set({
                error: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            });
        }
    },

    logout: async () => {
        try {
            try {
                await auth.signOut();
            } catch (e) {
                console.log('Firebase logout error:', e);
            }

            localStorage.removeItem('authToken');
            localStorage.removeItem('firebaseToken');

            set({
                user: null,
                isAuthenticated: false,
                error: null,
                isLoading: false
            });
        } catch (error: any) {
            console.error('Logout error:', error);
            set({ error: "Logout failed" });
            throw error;
        }
    }
}));