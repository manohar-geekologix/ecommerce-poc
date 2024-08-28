'use client';
import { auth } from '@/app/firebase';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import logo_img from '../../public/images/logo.svg';
import Link from 'next/link';
const SendCode = () => {
  const [otp, setOtp] = useState(new Array(6).fill('')); // Array to hold 6 digits
  const inputRefs = useRef([]); // Array of refs to handle input focus
  const router = useRouter();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to the next input box if current is filled
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyUp = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return; // Ensure only digits are pasted
    const newOtp = pasteData.split('');
    setOtp(newOtp);

    // Move focus to the last filled input
    inputRefs.current[Math.min(newOtp.length - 1, 5)].focus();
  };

  function generateUniqueString() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (characters.length < 30) {
      throw new Error('Not enough unique characters to generate a 30-character string.');
    }

    let uniqueString = '';
    const usedIndexes = new Set();

    while (uniqueString.length < 30) {
      const randomIndex = Math.floor(Math.random() * characters.length);

      if (!usedIndexes.has(randomIndex)) {
        uniqueString += characters[randomIndex];
        usedIndexes.add(randomIndex);
      }
    }

    return uniqueString;
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const verificationId = localStorage.getItem('verificationId');
    const otpString = otp.join(''); // Combine array into a string

    if (verificationId) {
      try {
        const credential = PhoneAuthProvider.credential(verificationId, otpString);
        await signInWithCredential(auth, credential);
        router.push('/');
        toast.success('OTP verified successfully!');
        localStorage.removeItem('verificationId');
      } catch (error) {
        toast.error('Invalid OTP');
      }
    } else {
      const verification = localStorage.getItem('verificationOtp');
      if (otpString === verification) {
        let token = generateUniqueString();
        Cookies.set('accessToken', token, { expires: 7, path: '/' });
        localStorage.removeItem('verificationOtp');
        router.push('/');
        toast.success('OTP verified successfully!');
      } else {
        toast.error('Invalid OTP');
      }
    }
  };

  return (
    <section className="bg-gray-50 bg-login-bg bg-no-repeat bg-center bg-cover h-screen flex justify-center items-center px-10">
      <div className="w-1/2">
        <div className="flex flex-col gap-5">
          <h1 className=" text-[#CE5C1C] font-medium text-5xl">Welcome to</h1>
          <h3 className="text-[#213B85] font-bold text-6xl">Demo Project</h3>
        </div>
        <div className="">
          <Image width={100} height={100} alt="man's svg" src={'/images/mans.svg'} className="size-auto" />
        </div>
      </div>
      <div className="w-1/2 px-5">
        <div className="w-full  bg-white rounded-xl shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <Image width={100} height={100} alt="logo" src={'/images/Logo.svg'} className="mx-auto w-[260px]" />
          <div className="px-6 mt-4   sm:px-7">
            <header className="mb-3 sm:ml-6  md:ml-7">
              <h1 className="text-2xl font-bold mb-1 text-[#CE5C1C]">OTP Verification</h1>
              <p className="text-[12px] text-[#213B85] ">
                Please enter the 6-digit code sent to you on your Email Address.
              </p>
            </header>
            <form className="space-y-3 md:space-y-4 justify-center text-center items-center" onSubmit={handleVerifyOtp}>
              <div className="flex items-center justify-center gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    className="w-8 sm:w-[44px]  h-8 sm:h-12 rounded-md text-center text-sm font-bold  text-slate-900  border border-gray-300 hover:border-slate-500 appearance-none  outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-indigo-100"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyUp={(e) => handleKeyUp(e, index)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-60 sm:w-[330px] text-white   font-bold rounded-lg text-base px-5 py-2.5 text-center bg-[#213B85]"
              >
                Verify Code
              </button>
              <div className="text-[14px]   mb-10 pb-7">
                <span className="text-[#CE5C1C] text-[18px] mr-1">&lt;</span>
                <Link href="/login" className="underline text-[#213B85]">
                  {' '}
                  Back to login
                </Link>{' '}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendCode;
