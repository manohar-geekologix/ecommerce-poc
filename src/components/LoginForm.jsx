'use client'
import { auth } from "@/app/firebase";
import { users } from "@/utils/MockData";
import { RecaptchaVerifier } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [formData, setFormData] = useState({ input: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // useEffect(() => {
    //     if (!window.recaptchaVerifier) {
    //         window.recaptchaVerifier = new RecaptchaVerifier(
    //             "recaptcha-container",
    //             { size: "normal", callback: () => { }, "expired-callback": () => { } },
    //             auth
    //         );
    //     }
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateInput = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (emailRegex.test(formData.input)) return "email";
        if (phoneRegex.test(formData.input)) return "phone";
        return null;
    };

    const sendOtp = async (email, otp) => {
        try {
            setLoading(true);
            const res = await fetch("/api/send-email", {
                method: "POST",
                body: JSON.stringify({ email, otp }),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to send OTP");
            const result = await res.json();
            router.push('/send-code');
            return result;
        } catch (error) {
            console.error("Error sending OTP:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        const inputType = validateInput();

        if (!inputType) {
            setErrors((prev) => ({ ...prev, input: "Please enter a valid email or phone number." }));
            return;
        }

        if (formData.password.length < 6) {
            setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters." }));
            return;
        }

        const user = users.find(
            (u) => (u.email === formData.input || u.phone === formData.input) && u.password === formData.password
        );

        if (!user) {
            toast.error("No user found with that email or phone number.");
            return;
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem('verificationOtp', otp);

        if (user.email === formData.input) {
            await sendOtp(user.email, otp);
        } else if (user.phone === formData.input) {
            await sendOtp(user.email, otp);
            // Uncomment if phone number OTP functionality is needed
            // try {
            //     const confirmationResult = await signInWithPhoneNumber(auth, `+91${formData.input.replace(/\D/g,'')}`, window.recaptchaVerifier);
            //     localStorage.setItem('verificationId', confirmationResult.verificationId);
            //     router.push('/send-code');
            //     toast.success("OTP sent to your phone");
            // } catch (error) {
            //     handlePhoneError(error);
            // }
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900">
                                    Email or Mobile Number
                                </label>
                                <input
                                    type="text"
                                    name="input"
                                    id="input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Enter your email or phone number"
                                    value={formData.input}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.input && <p className="text-red-500 text-sm mt-2">{errors.input}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                            </div>
                            <button
                                id="sign-in-button"
                                onClick={handleSubmit}
                                type="button"
                                className="w-full flex justify-center items-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-800 disabled:bg-gray-600"
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                ) : (
                                    'Login'
                                )}
                            </button>
                            <div id="recaptcha-container"></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
