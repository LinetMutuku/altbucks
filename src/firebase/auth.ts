import {
    signInWithPopup,
    signOut,
    AuthProvider,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider } from './config';

const handleSocialLogin = async (provider: AuthProvider) => {
    try {
        const result = await signInWithPopup(auth, provider);

        // Get the user's token
        const userToken = await result.user.getIdToken();

        // Google-specific handling
        let additionalUserInfo = {};
        if (provider instanceof GoogleAuthProvider) {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            additionalUserInfo = {
                accessToken: credential?.accessToken,
                providerId: 'google.com'
            };
        }

        return {
            user: result.user,
            token: userToken,
            ...additionalUserInfo
        };
    } catch (error: any) {
        console.error('Login Error:', error);

        if (error.code === 'auth/popup-blocked') {
            throw new Error('Pop-up blocked. Please enable pop-ups for this site.');
        }

        if (error.code === 'auth/popup-closed-by-user') {
            throw new Error('Login popup was closed before completion.');
        }

        throw error;
    }
};

export const loginWithGoogle = () => handleSocialLogin(googleProvider);

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout Error:', error);
        throw error;
    }
};