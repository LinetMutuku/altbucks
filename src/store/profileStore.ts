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

// Profile Information Store
interface ProfileInformationStore {
    avatar: File | null;
    bio: string;
    languages: string;
    expertise: string;
    firstName: string;
    lastName: string;
    location: string;
    isLoading: boolean;
    error: string | null;

    setAvatar: (avatar: File | null) => void;
    setBio: (bio: string) => void;
    setLanguages: (languages: string) => void;
    setExpertise: (expertise: string) => void;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setLocation: (location: string) => void;
    updateProfileInformation: () => Promise<void>;
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
                    withCredentials: true,
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

// Profile Information Store
export const useProfileInformationStore = create<ProfileInformationStore>((set, get) => ({
    avatar: null,
    bio: '',
    languages: '',
    expertise: '',
    firstName: '',
    lastName: '',
    location: '',
    isLoading: false,
    error: null,

    setAvatar: (avatar) => set({ avatar }),
    setBio: (bio) => set({ bio }),
    setLanguages: (languages) => set({ languages }),
    setExpertise: (expertise) => set({ expertise }),
    setFirstName: (firstName) => set({ firstName }),
    setLastName: (lastName) => set({ lastName }),
    setLocation: (location) => set({ location }),

    updateProfileInformation: async () => {
        const {
            avatar,
            bio,
            languages,
            expertise,
            firstName,
            lastName,
            location
        } = get();

        set({ isLoading: true, error: null });

        try {
            const token = localStorage.getItem('authToken');

            const formData = new FormData();
            if (avatar) {
                formData.append('avatar', avatar);
            }
            formData.append('bio', bio);
            formData.append('languages', languages);
            formData.append('expertise', expertise);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('location', location);

            const response = await axios.put(
                'https://altbucks-server-t.onrender.com/users/profile',
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            set({
                isLoading: false,
                error: null
            });

            return response.data;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to update profile',
                isLoading: false
            });

            throw error;
        }
    }
}));