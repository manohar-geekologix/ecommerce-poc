"use client"
import { auth } from "@/app/firebase";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const SendCode = () => {
    const [otp, setOtp] = useState(new Array(6).fill("")); // Array to hold 6 digits
    const router = useRouter();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move focus to next input box if current is filled
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const verificationId = localStorage.getItem('verificationId');
        if (verificationId) {

            const otpString = otp.join(''); // Combine array into a string

            try {
                const credential = PhoneAuthProvider.credential(verificationId, otpString);
                await signInWithCredential(auth, credential);
                router.push('/');
                toast.success("OTP verified successfully!");
                localStorage.removeItem('verificationId');
            } catch (error) {
                toast.error("Envalid OTP ");
            }
        } else {
            const verification = localStorage.getItem('verificationOtp');
            const otpString = otp.join(''); // Combine array into a 
            if (otpString == verification) {
                localStorage.removeItem('verificationOtp');

                router.push('/');
                toast.success("OTP verified successfully!");
            } else {
                toast.error("Envalid OTP ");
            }
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <header className="mb-8">
                            <h1 className="text-2xl font-bold mb-1 text-gray-900">Code Verification</h1>
                            <p className="text-[15px] text-slate-500">Enter the 6-digit verification code that was sent to your phone.</p>
                        </header>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleVerifyOtp}>
                            <div className="flex items-center justify-center gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="w-14 h-14 text-center text-2xl font-semibold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-indigo-100"
                                        maxLength="1"
                                        value={digit}
                                        onChange={e => handleChange(e.target, index)}
                                        onKeyUp={e => {
                                            if (e.key === 'Backspace' && e.target.previousSibling) {
                                                e.target.previousSibling.focus();
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-800">Verify Code</button>
                            <p className="text-sm font-light text-gray-500">
                                Didn't receive the code? <a href="#" className="font-medium text-primary-600 hover:underline text-blue-600">Resend</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SendCode;
