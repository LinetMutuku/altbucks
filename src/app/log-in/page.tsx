'use client';

import React, { useState } from 'react'
import Header from '../components/Authentication/Header'
import Image from 'next/image'
import IllustrationImg from "../../../public/assets/Illustration.png";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { toast } from "react-toastify";
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const { isTaskCreator, loginWithEmailAndPassword, loginWithGoogle } = useAuthStore();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await loginWithEmailAndPassword(email, password);
            toast.success("Successfully logged in!");
            if(isTaskCreator) {
                router.push("/dashboard_taskcreator");
            } else {
                router.push("/dashboard");
            }
        } catch (error: any) {
            console.error('Login error:', error);
            let errorMessage = "Failed to login. Please try again.";

            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await loginWithGoogle();
            toast.success("Successfully logged in with Google!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error('Google login error:', error);
            let errorMessage = "Failed to login with Google. Please try again.";

            if (error.code === 'auth/popup-blocked') {
                errorMessage = 'Please enable popups for this website to login.';
            } else if (error.code === 'auth/unauthorized-domain') {
                errorMessage = 'This domain is not authorized for OAuth operations.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            if (error.code !== 'auth/cancelled-popup-request') {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-[#2877EA] overflow-x-hidden'>
            <Header />
            <main className='container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12'>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto'>
                    {/* Left Section */}
                    <div className='w-full lg:w-[40%] text-white space-y-6 sm:space-y-8'>
                        <div className='space-y-3 sm:space-y-4 text-center lg:text-left'>
                            <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                                Grow with us
                            </h2>
                            <p className='text-lg sm:text-xl font-light tracking-wide opacity-90'>
                                Access to thousands of task projects and clients
                            </p>
                        </div>
                        <div className='relative w-full max-w-md sm:max-w-lg mx-auto lg:max-w-none'>
                            <Image
                                src={IllustrationImg}
                                className='w-full h-auto object-contain'
                                alt='Illustration'
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Section - Login Form */}
                    <div className='w-full lg:w-[55%] bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl'>
                        <div className='max-w-xl mx-auto space-y-6 sm:space-y-8'>
                            <div className='space-y-2 text-center lg:text-left'>
                                <h4 className='text-2xl sm:text-3xl font-bold text-gray-900'>Welcome Back!</h4>
                                <p className='text-sm sm:text-base text-gray-600'>Sign in to continue your journey</p>
                            </div>

                            <form className='space-y-4 sm:space-y-6' onSubmit={handleEmailLogin}>
                                {/* Email Field */}
                                <div className='space-y-2'>
                                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                                        placeholder='Enter your email'
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div className='space-y-2'>
                                    <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0'>
                                    <div className='flex items-center'>
                                        <input
                                            id="rememberMe"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                                        />
                                        <label htmlFor="rememberMe" className='ml-2 text-sm text-gray-600'>
                                            Remember me
                                        </label>
                                    </div>
                                    <Link
                                        href="/forgot-password"
                                        className='text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200'
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Login Button */}
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='w-full py-3 sm:py-4 bg-[#2877EA] hover:bg-blue-600 text-white rounded-xl font-semibold text-base sm:text-lg tracking-wide transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl active:translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed'
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                            Signing in...
                                        </span>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>

                                {/* Divider */}
                                <div className='relative py-2 sm:py-3'>
                                    <div className='absolute inset-0 flex items-center'>
                                        <div className='w-full border-t border-gray-300'></div>
                                    </div>
                                    <div className='relative flex justify-center text-sm'>
                                        <span className='px-4 bg-white text-gray-500'>or continue with</span>
                                    </div>
                                </div>

                                {/* Social Login Buttons */}
                                <div className='grid grid-cols-1 gap-3 sm:gap-4'>
                                    {/* Google Login */}
                                    <button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        disabled={loading}
                                        className='flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 48 48">
                                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                                        </svg>
                                        Continue with Google
                                    </button>
                                </div>

                                {/* Sign Up Link */}
                                <p className='text-center text-sm sm:text-base text-gray-600 pt-2'>
                                    Don't have an account?{' '}
                                    <Link
                                        href="/signup"
                                        className='text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200'
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}