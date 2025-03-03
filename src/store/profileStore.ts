import { create } from 'zustand';
import axios from 'axios';

// Define the interface for account settings
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

// Define the interface for profile information
interface ProfileInformationStore {
    avatar: File | null;
    bio: string;
    languages: string[];
    expertise: string;
    firstName: string;
    lastName: string;
    location: string;
    isLoading: boolean;
    error: string | null;

    setAvatar: (avatar: File | null) => void;
    setBio: (bio: string) => void;
    setLanguages: (languages: string[]) => void;
    setExpertise: (expertise: string) => void;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setLocation: (location: string) => void;
    updateProfileInformation: () => Promise<any>;
}

// Define the interface for user data
interface UserData {
    firstName?: string;
    lastName?: string;
    bio?: string;
    location?: string;
    expertise?: string;
    languages?: string[];
    photoURL?: string;
    email?: string;
    phoneNumber?: string;
    [key: string]: any; // For any other properties
}

// Account Settings Store
export const useAccountSettingsStore = create<AccountSettingsStore>((set, get) => ({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    isLoading: false,
    error: null,

    setCurrentPassword: (password: string) => set({ currentPassword: password }),
    setNewPassword: (password: string) => set({ newPassword: password }),
    setConfirmPassword: (password: string) => set({ confirmPassword: password }),

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
    languages: [],
    expertise: '',
    firstName: '',
    lastName: '',
    location: '',
    isLoading: false,
    error: null,

    setAvatar: (avatar: File | null) => set({ avatar }),
    setBio: (bio: string) => set({ bio }),
    setLanguages: (languages: string[]) => set({ languages }),
    setExpertise: (expertise: string) => set({ expertise }),
    setFirstName: (firstName: string) => set({ firstName }),
    setLastName: (lastName: string) => set({ lastName }),
    setLocation: (location: string) => set({ location }),

    updateProfileInformation: async () => {
        // Explicitly type all variables from the store state
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

            // Get the current user data from localStorage
            let currentUser: UserData = {};
            try {
                const userJSON = localStorage.getItem('user');
                if (userJSON) {
                    currentUser = JSON.parse(userJSON);
                }
            } catch (e) {
                console.error('Error parsing user data:', e);
            }

            // Create a minimal payload with just what's needed
            const payload = {
                bio: bio || '',
                expertise: expertise || '',
                firstName: firstName || '',
                lastName: lastName || '',
                location: location || '',
                // Convert languages to a string with commas if it's an array
                // This is a workaround for the "filter is not a function" error
                languages: languages && languages.length > 0
                    ? languages.join(',')
                    : ''
            };

            console.log('Sending minimal payload:', payload);

            // If we have an avatar, use FormData
            let requestData: any;
            let headers: Record<string, string> = {
                'Authorization': `Bearer ${token}`
            };

            if (avatar && avatar instanceof File) {
                const formData = new FormData();

                // Add the file
                formData.append('avatar', avatar);

                // Add the other fields
                Object.entries(payload).forEach(([key, value]) => {
                    formData.append(key, String(value));
                });

                requestData = formData;
                // Let browser set content type
            } else {
                // Use JSON directly
                requestData = payload;
                headers['Content-Type'] = 'application/json';
            }

            // Try a very simple approach - just making a direct request with minimal data
            const response = await axios({
                method: 'put',
                url: 'https://altbucks-server-t.onrender.com/users/profile',
                data: requestData,
                headers: headers,
                withCredentials: true
            });

            // Update local storage with the new user data if needed
            if (response.data && response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                console.log('Updated user data in localStorage');
            }

            set({
                isLoading: false,
                error: null
            });

            console.log('Profile update successful:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Profile update error:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
            }

            set({
                error: error.response?.data?.message || 'Failed to update profile',
                isLoading: false
            });

            throw error;
        }
    }
}));