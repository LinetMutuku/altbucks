import {
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword,
    AuthProvider,
    GoogleAuthProvider,
    FacebookAuthProvider
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from './config';

const handleSocialLogin = async (provider: AuthProvider) => {
    try {
        const result = await signInWithPopup(auth, provider);

        // Get the user's token
        const userToken = await result.user.getIdToken();

        // Get provider-specific data
        let additionalUserInfo = {};

        if (provider instanceof GoogleAuthProvider) {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            additionalUserInfo = {
                accessToken: credential?.accessToken,
                providerId: 'google.com'
            };
        } else if (provider instanceof FacebookAuthProvider) {
            const credential = FacebookAuthProvider.credentialFromResult(result);
            additionalUserInfo = {
                accessToken: credential?.accessToken,
                providerId: 'facebook.com'
            };
        }

        return {
            user: result.user,
            token: userToken,
            ...additionalUserInfo
        };
    } catch (error: any) {
        if (error.code === 'auth/account-exists-with-different-credential') {
            // Handle linking accounts here if needed
            throw new Error('An account already exists with the same email address but different sign-in credentials. Please sign in using your original provider.');
        }
        throw error;
    }
};

export const loginWithGoogle = () => handleSocialLogin(googleProvider);
export const loginWithFacebook = () => handleSocialLogin(facebookProvider);

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};