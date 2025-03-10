
"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Authentication/Header";
import Image from "next/image";
import illustrationImg from "../../../public/assets/Illustration.png";
import { toast } from "react-toastify";

export default function VerificationPage() {
    const [code, setCode] = useState(["", "", "", "", ""]);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [timeLeft, setTimeLeft] = useState(120);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (code.includes("")) {
            toast.error("Please enter the complete code");
            return;
        }

        const email = sessionStorage.getItem("resetEmail");
        if (!email) {
            toast.error("Email not found. Please request a new verification code.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://authentication-1-bqvg.onrender.com/users/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    resetPasswordToken: code.join(""),
                }),
            });

            const data = await response.json();

            if (response.ok && data.message.includes("Reset code verified")) {
                toast.success("Token verified successfully");
                sessionStorage.setItem("resetPasswordToken", code.join(""));
                router.push("/reset-password");
            } else {
                throw new Error(data.message || "Invalid token. Please try again.");
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Countdown timer for resending the code.
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    // Format time in MM:SS format.
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    // Handle input change for each digit.
    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < code.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Allow backspace to move focus to the previous input.
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="bg-[#2877EA]">
            <Header />
            <div className="flex justify-around w-[90%] mx-auto mt-12 pb-24">
                <div className="w-[30%] text-white">
                    <h2 className="text-[48px] font-bold">Grow with us</h2>
                    <p className="text-lg mb-4">Access thousands of task projects and clients</p>
                    <Image src={illustrationImg} className="w-full" alt="illustration" />
                </div>

                <div className="w-1/2 flex items-center justify-center rounded-3xl bg-white">
                    <div className="p-8 w-[80%]">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Forgot Password?</h2>
                        <p className="text-gray-600 mb-2">Enter verification code</p>

                        {/* Wrap the inputs and the Verify button inside a form */}
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-between mb-4 gap-8">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-full h-12 border rounded-lg text-blue-600 text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ))}
                            </div>

                            <div className="flex justify-between">
                                <p className="text-sm text-gray-500">
                                    Resend code in{" "}
                                    <span className="text-blue-600 font-semibold">{formatTime(timeLeft)}</span>
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTimeLeft(120);
                                        toast.success("New code sent");
                                    }}
                                    className="bg-gray-200 text-xs text-gray-600 py-2 px-4 rounded-lg mt-2 cursor-not-allowed"
                                    disabled
                                >
                                    Resend code
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-3xl mt-4 hover:bg-blue-700 transition"
                            >
                                Verify
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
