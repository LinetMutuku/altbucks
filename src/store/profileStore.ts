import { create } from 'zustand';
import axios from 'axios';

interface AccountSettingsStore {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    isLoading: boolean;
    error: string | null;

    setCurrentPassword: (password: string) => void;
    setNewPassword: (password: string) => void;
    setConfirmPassword: (password: string) => void;
    updatePassword: () => Promise<void>;
}

// Account Settings Store
export const useAccountSettingsStore = create<AccountSettingsStore>((set, get) => ({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    isLoading: false,
    error: null,

    setCurrentPassword: (password) => set({ currentPassword: password }),
    setNewPassword: (password) => set({ newPassword: password }),
    setConfirmPassword: (password) => set({ confirmPassword: password }),

    updatePassword: async () => {
        const { currentPassword, newPassword, confirmPassword } = get();

        if (newPassword !== confirmPassword) {
            set({ error: 'New passwords do not match' });
            throw new Error('Passwords do not match');
        }

        if (newPassword.length < 8) {
            set({ error: 'Password must be at least 8 characters long' });
            throw new Error('Password too short');
        }

        set({ isLoading: true, error: null });

        try {
            const token = localStorage.getItem('authToken');

            const response = await axios.put(
                'https://altbucks-server-t.onrender.com/users/account-settings',
                {
                    currentPassword,
                    newPassword,
                    confirmNewPassword: confirmPassword,
                    email: 'user@example.com',
                    firstName: 'User',
                    lastName: 'Name'
                },
                {
                    credentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            set({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
                isLoading: false
            });

            return response.data;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to update password',
                isLoading: false
            });

            throw error;
        }
    }
}));