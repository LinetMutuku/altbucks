"use client";
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Header from '../components/Authentication/Header'
import Image from 'next/image'
import illustrationImg from "../../../public/assets/Illustration.png"
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState<string | null>(null);
    const [resetCode, setResetCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validation states
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            // This ensures that sessionStorage is only accessed in the client-side
            const storedEmail = sessionStorage.getItem("resetEmail");
            const storedResetCode = sessionStorage.getItem("resetPasswordToken");
            setEmail(storedEmail);
            setResetCode(storedResetCode);

            console.log("Stored Reset Token:", storedResetCode);
        }
    }, []);

    // Validate password strength
    useEffect(() => {
        if (password) {
            if (password.length < 8) {
                setPasswordError("Password must be at least 8 characters");
            } else if (!/(?=.*[a-z])/.test(password)) {
                setPasswordError("Password must include lowercase letters");
            } else if (!/(?=.*[A-Z])/.test(password)) {
                setPasswordError("Password must include uppercase letters");
            } else if (!/(?=.*\d)/.test(password)) {
                setPasswordError("Password must include numbers");
            } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
                setPasswordError("Password must include special characters");
            } else {
                setPasswordError("");
            }
        } else {
            setPasswordError("");
        }
    }, [password]);

    // Validate password match
    useEffect(() => {
        if (confirmPassword) {
            if (password !== confirmPassword) {
                setConfirmPasswordError("Passwords don't match");
            } else {
                setConfirmPasswordError("");
            }
        } else {
            setConfirmPasswordError("");
        }
    }, [password, confirmPassword]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordError || confirmPasswordError) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (!email || !resetCode) {
            toast.error("Missing verification details. Please restart the process.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://authentication-1-bqvg.onrender.com/users/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    resetCode,
                    password,
                    confirmPassword,
                }),
            });

            const data = await response.json();

            console.log("API Response:", data);

            if (response.ok && data.message.includes("Password has been reset successfully")) {
                toast.success(data.message || "Password has been reset successfully");
                router.push("/log-in");
            } else {
                throw new Error(data.message || "Failed to reset password. Please try again.");
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-[#2877EA]'>
            <Header />
            <div className='flex justify-around w-[90%] mx-auto mt-12 pb-24'>
                <div className='flex flex-col gap-4 w-[30%] text-white'>
                    <h2 className='text-[48px] font-bold'>Grow with us</h2>
                    <p className='font-light text-lg tracking-wide'>
                        Access to thousands to task project and clients
                    </p>
                    <Image src={illustrationImg} className='w-full' alt='illustration'/>
                </div>

                <div className="flex w-1/2 items-center justify-center p-4 rounded-xl bg-white">
                    <div className="w-full max-w-md p-8">
                        <h2 className="mb-6 text-center text-2xl font-semibold">Reset Password</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* New Password field */}
                            <div>
                                <label className="mb-1 block text-sm text-gray-700">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`w-full p-3 border rounded-lg ${
                                            passwordError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        } text-black text-sm focus:outline-none focus:ring-2`}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" strokeWidth={2} />
                                        ) : (
                                            <Eye className="w-5 h-5" strokeWidth={2} />
                                        )}
                                    </button>
                                </div>
                                <p className='text-xs text-gray-500 mt-1'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                            </div>

                            {/* Confirm Password field */}
                            <div>
                                <label className="mb-1 block text-sm text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={`w-full p-3 border rounded-lg ${
                                            confirmPasswordError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        } text-black text-sm focus:outline-none focus:ring-2`}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-5 h-5" strokeWidth={2} />
                                        ) : (
                                            <Eye className="w-5 h-5" strokeWidth={2} />
                                        )}
                                    </button>
                                </div>
                                {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !!passwordError || !!confirmPasswordError}
                                className="mt-4 w-full rounded-xl bg-[#2877EA] p-3 text-white font-medium
                                         hover:bg-blue-600 transition-all duration-300 transform
                                         hover:translate-y-[-2px] hover:shadow-xl active:translate-y-[1px]
                                         disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}