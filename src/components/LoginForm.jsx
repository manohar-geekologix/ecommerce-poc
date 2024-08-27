'use client'
import { useState } from "react";

const LoginForm = () => {
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ input: "", password: "" });

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
        // Password must be at least 8 characters long and contain at least one letter, one number, and one special character
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (passwordRegex.test(password)) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputType = validateInput();
        const isPasswordValid = validatePassword();

        if (!inputType) {
            setError((prev) => ({ ...prev, input: "Please enter a valid email or phone number." }));
        }

        if (!isPasswordValid) {
            setError((prev) => ({ ...prev, password: "Password must be at least 8 characters long and include one letter, one number, and one special character." }));
        }

        if (inputType && isPasswordValid) {
            // Handle the form submission based on the input type
            if (inputType === "email") {
                console.log("Email submitted:", input);
            } else if (inputType === "phone") {
                console.log("Phone number submitted:", input);
            }
            console.log("Password submitted:", password);
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
                                <label htmlFor="emailOrPhone" className="block mb-2 text-sm font-medium text-gray-900">Email or Mobile Number</label>
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
