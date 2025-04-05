'use client';

import React, { useState, useEffect } from 'react'
import Header from '../components/Authentication/Header'
import Image from 'next/image'
import IllustrationImg from "../../../public/assets/Illustration.png";
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

export default function Page() {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validation states
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const router = useRouter();
    const { signuptaskcreator } = useAuthStore();

    // Validate email when it changes
    useEffect(() => {
        if (userData.email && !validateEmail(userData.email)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    }, [userData.email]);

    // Validate password match when either password changes
    useEffect(() => {
        if (userData.confirmPassword && userData.password !== userData.confirmPassword) {
            setPasswordError("Passwords don't match");
        } else {
            setPasswordError("");
        }
    }, [userData.password, userData.confirmPassword]);

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!termsAccepted) {
            toast.error("Please accept the Terms of Use and Privacy Policy");
            return;
        }

        if (emailError || passwordError) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);

        try {
            await signuptaskcreator(
                userData.email,
                userData.password,
                userData.firstName,
                userData.lastName,
                userData.phoneNumber,
                userData.confirmPassword
            );
            toast.success("Successfully signed up as task creator!");
            router.push("/dashboard_taskcreator");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to sign up. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-[#2877EA] min-h-screen w-full'>
            <Header />
            <div className='flex flex-col lg:flex-row justify-center lg:justify-around w-full px-4 lg:w-[90%] mx-auto mt-8 lg:mt-12 pb-12 lg:pb-24 gap-8 lg:gap-0'>
                {/* Left section - Illustration */}
                <div className='text-white flex flex-col gap-6 lg:gap-8 w-full lg:w-[30%]'>
                    <h2 className='text-3xl lg:text-[48px] font-bold text-center lg:text-left'>Grow with us</h2>
                    <p className='font-light text-base lg:text-lg tracking-wide text-center lg:text-left'>Access to thousands to task project and clients</p>
                    <Image src={IllustrationImg} className='w-full max-w-md mx-auto lg:mx-0' alt='Illustration'/>
                </div>

                {/* Authentication Section */}
                <div className='bg-white w-full lg:w-[50%] rounded-3xl px-6 sm:px-8 lg:px-16 py-8 lg:py-16 flex flex-col gap-4'>
                    <h4 className='text-black tracking-wide text-xl lg:text-2xl font-semibold'>Sign up as Task Creator</h4>
                    <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit}>
                        {/* Name fields */}
                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 sm:gap-6'>
                            <div className='w-full sm:w-[45%] flex flex-col gap-2'>
                                <label htmlFor="firstName" className='text-sm text-[#666666]'>First Name</label>
                                <input
                                    id="firstName"
                                    onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                                    type="text"
                                    className='w-full p-3 lg:p-3 rounded-md border border-gray-300 text-black text-base'
                                    required
                                />
                            </div>
                            <div className='w-full sm:w-[45%] flex flex-col gap-2'>
                                <label htmlFor="lastName" className='text-sm text-[#666666]'>Last Name</label>
                                <input
                                    id="lastName"
                                    onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                                    type="text"
                                    className='w-full p-3 lg:p-3 border rounded-md border-gray-300 text-black text-base'
                                    required
                                />
                            </div>
                        </div>

                        {/* Email field */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='text-sm text-[#666666]'>Email address</label>
                            <input
                                id="email"
                                type="email"
                                onChange={(e) => setUserData({...userData, email: e.target.value})}
                                className={`w-full p-3 lg:p-3 border rounded-md ${emailError ? 'border-red-500' : 'border-gray-300'} text-black text-base`}
                                required
                            />
                            {emailError && <p className='text-red-500 text-xs mt-1'>{emailError}</p>}
                        </div>

                        {/* Phone field */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="phoneNumber" className='text-sm text-[#666666]'>Phone number</label>
                            <input
                                id="phoneNumber"
                                type="tel"
                                onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})}
                                className='w-full p-3 lg:p-3 border rounded-md border-gray-300 text-black text-base'
                                required
                            />
                        </div>

                        {/* Password field */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password" className='text-sm text-[#666666]'>Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                                    className='w-full p-3 lg:p-3 border rounded-md border-gray-300 text-black text-base'
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <p className='text-xs text-[#666666]'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                        </div>

                        {/* Confirm Password field */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="confirmPassword" className='text-sm text-[#666666]'>Confirm Password</label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                                    className={`w-full p-3 lg:p-3 border rounded-md ${passwordError ? 'border-red-500' : 'border-gray-300'} text-black text-base`}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {passwordError && <p className='text-red-500 text-xs mt-1'>{passwordError}</p>}
                        </div>

                        {/* Terms checkbox */}
                        <div className='flex gap-3 items-start'>
                            <input
                                type='checkbox'
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className='mt-1 bg-blue-600'
                                required
                            />
                            <p className='text-black text-xs tracking-wide'>
                                By creating an account, I agree to our Terms of use and Privacy Policy
                            </p>
                        </div>

                        {/* Submit button and login link */}
                        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-2'>
                            <button
                                type="submit"
                                disabled={Boolean(loading || emailError || passwordError)}
                                className='w-full sm:w-auto px-6 py-3 rounded-xl hover:bg-blue-800 transition-all duration-500 text-base bg-blue-600 text-white disabled:opacity-70 disabled:cursor-not-allowed'
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                        Signing up...
                                    </span>
                                ) : (
                                    "Sign Up"
                                )}
                            </button>
                            <p className='text-sm'>Already have an account? <Link href="/log-in" className='text-blue-600'>Log In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}