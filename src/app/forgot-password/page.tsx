"use client";
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Header from '../components/Authentication/Header'
import Image from 'next/image'
import { toast } from 'react-toastify';
import illustrationImg from "../../../public/assets/Illustration.png"
import api from "@/lib/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Validate email when it changes
    useEffect(() => {
        if (email && !validateEmail(email)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    }, [email]);

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        if (emailError) {
            toast.error("Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/users/request", {body: JSON.stringify({ email })});

            const data = await response.data;

            if (response && data.message.includes("Password reset code sent")) {
                toast.success("Verification code has been sent");
                sessionStorage.setItem("resetEmail", email);
                setTimeout(() => {
                    router.push("/verification");
                }, 500);
            } else {
                throw new Error(data.message || "Failed to send verification code");
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-[#2877EA] overflow-x-hidden'>
            <Header />
            <main className='container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12'>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 max-w-7xl mx-auto'>
                    {/* Left Section */}
                    <div className='w-full lg:w-[40%] text-white space-y-6 sm:space-y-8'>
                        <div className='space-y-3 sm:space-y-4 text-center lg:text-left'>
                            <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold leading-tight'>
                                Grow with us
                            </h2>
                            <p className='text-lg sm:text-xl font-light tracking-wide opacity-90'>
                                Access to thousands of task projects and clients
                            </p>
                        </div>
                        <div className='relative w-full max-w-md sm:max-w-lg mx-auto lg:max-w-none'>
                            <Image
                                src={illustrationImg}
                                className='w-full h-auto object-contain'
                                alt='Illustration'
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Section - Forgot Password Form */}
                    <div className='w-full lg:w-[55%] bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl'>
                        <div className='max-w-xl mx-auto space-y-6 sm:space-y-8'>
                            <div className='space-y-2 text-center lg:text-left'>
                                <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                                    Forgot Password?
                                </h2>
                                <p className='text-sm sm:text-base text-gray-600'>
                                    Enter your email to reset your password
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                                <div className='space-y-2'>
                                    <label className='block text-sm font-medium text-gray-700'>
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border
                                                 ${emailError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
                                                 transition-all duration-200`}
                                    />
                                    {emailError && (
                                        <p className="text-red-500 text-xs mt-1">{emailError}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !!emailError}
                                    className='w-full py-3 sm:py-4 bg-[#2877EA] hover:bg-blue-600
                                             text-white rounded-xl font-semibold text-base sm:text-lg
                                             tracking-wide transition-all duration-300 transform
                                             hover:translate-y-[-2px] hover:shadow-xl
                                             active:translate-y-[1px] disabled:opacity-70
                                             disabled:cursor-not-allowed'
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        "Continue"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}