'use client'
import { users } from "@/utils/MockData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState({ input: "", password: "" });
    const router = useRouter();

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setError((prev) => ({ ...prev, input: "" }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError((prev) => ({ ...prev, password: "" }));
    };

    const validateInput = () => {
        // Basic regex patterns
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (emailRegex.test(input)) {
            return "email";
        } else if (phoneRegex.test(input)) {
            return "phone";
        } else {
            return null;
        }
    };

    const validatePassword = () => {
        // Password must be at least 6 characters long
        return password.length >= 6;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const inputType = validateInput();
        const isPasswordValid = validatePassword();

        // Validate input and password
        if (!inputType) {
            setError((prev) => ({ ...prev, input: "Please enter a valid email or phone number." }));
            return;
        }

        if (!isPasswordValid) {
            setError((prev) => ({ ...prev, password: "Password must be at least 6 characters." }));
            return;
        }

        // Find user based on email or phone
        const user = users.find(user =>
            (user.email == input || user.phone == input)
        );

        if (user) {
            // Redirect to the /send-code page
            router.push('/send-code');
            return;
        } else {
            toast.error("No user found with that email or phone number.");
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="emailOrPhone" className="block mb-2 text-sm font-medium text-gray-900">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="emailOrPhone"
                                    id="emailOrPhone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Enter your name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="emailOrPhone" className="block mb-2 text-sm font-medium text-gray-900">
                                    Email or Mobile Number
                                </label>
                                <input
                                    type="text"
                                    name="emailOrPhone"
                                    id="emailOrPhone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Enter your email or phone number"
                                    value={input}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.input && <p className="text-red-500 text-sm mt-2">{error.input}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                {error.password && <p className="text-red-500 text-sm mt-2">{error.password}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
