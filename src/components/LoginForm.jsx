'use client';
import { users } from '@/utils/MockData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
// import  firebaseApp from "@/app/firebase";

import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import firebaseApp from '../../firebase';

const LoginForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', input: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);
  const router = useRouter();

  const auth = getAuth(firebaseApp);
  auth.useDeviceLanguage()

  const recaptchaVerifierRef = useRef(null);

  useEffect(() => {
    // Initialize RecaptchaVerifier
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: 'invisible',
      });
    }

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }
    };
  }, [auth]);

  const validateInput = () => {
    // Basic regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const indianPhoneRegex = /^\+91[6-9]\d{9}$/;  // Ensuring that the first digit after +91 is between 6-9
    const usPhoneRegex = /^\+1[2-9]\d{9}$/;      // Ensuring valid US number (starts between 2-9)
  
    if (emailRegex.test(formData.input)) {
      return "email";
    } else if (indianPhoneRegex.test(formData.input) || usPhoneRegex.test(formData.input)) {
      return "phone";
    } else {
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error if the input is valid
    if (name === 'input' && errors.email && validateInput(value)) {
      setErrors((prev) => ({ ...prev, email: '' }));
    } else if (name === 'phone' && errors.phone && validatePhone(value)) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    } else if (name === 'password' && errors.password && value.length >= 6) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const sendOtp = async (email, otp) => {
    try {
      setLoading(true);
      const res = await fetch(process.env.SEND_CODE, {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to send OTP');
      const result = await res.json();
      toast.success('OTP sent successfully!');
      router.push('/send-code');
      return result;
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const inputType = validateInput();
    // Validate input and password
    if (!inputType) {
      newErrors.email = 'Please enter a valid email or phone number.';
    }
    if(formData.input.length == 10){
      newErrors.email = 'Please include the country code (+91 or +1).';
    }

    // if (!validateEmail(formData.email)) newErrors.email = 'Please enter correct email address.';
    // if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number.';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const user = users.find(
      (u) => (u.email === formData.input || u.phone === formData.input) && u.password === formData.password
    );

    if (!user) {
      setIsValidUser(true)
      setLoading(false)
      return;
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);
      if (user.email === formData.input) {
        localStorage.setItem('verificationOtp', otp);
        await sendOtp(user?.email, otp);
      }
      if (user.phone === formData.input) {
        setLoading(true);
        const appVerifier = recaptchaVerifierRef.current;
        try {
          const confirmationResult = await signInWithPhoneNumber(auth, +918955609817, appVerifier);
          localStorage.setItem('verificationId', confirmationResult.verificationId);
          toast.success('OTP sent successfully!');
          router.push('/send-code');
        } catch (error) {
          if (error.code === 'auth/too-many-requests') {
            toast.error("Too many requests. Please try again later.");
          } else {
            console.error("Error sending OTP:", error);
          }
        } finally {
          setLoading(false);
        }
      }

      setIsValidUser(false)
    }
  };

  return (
    <section className="bg-small-login-bg lg:bg-login-bg bg-no-repeat bg-center bg-cover h-[100vh] flex justify-between lg:justify-center items-center gap-7 lg:gap-0 xl:px-10 px-2 flex-col lg:flex-row overflow-hidden">
      <div className="sm:w-1/2 text-start w-full max-lg:p-6 max-lg:mt-10 max-lg:me-10">
        <div className="flex flex-col lg:gap-5 ">
          <h1 className=" text-[#CE5C1C] font-medium text-xl lg:text-4xl">Welcome to</h1>
          <h3 className="text-[#213B85] font-bold text-[28px] lg:text-5xl">Warehouse Management.</h3>
        </div>
        <div className="lg:block hidden w-fit min-h-[451px] pt-5 3xl:pt-36">
          <Image width={100} height={100} alt="man's svg" src={'/images/mans.svg'} className="size-auto" />
        </div>
      </div>
      <div className="lg:w-1/2 w-full relative max-lg:h-full">
        <form className="bg-white px-5 py-3 lg:px-10 lg:py-5 rounded-2xl shadow-login-shadow flex flex-col gap-2 lg:gap-4 w-full sm:w-1/2 lg:w-[450px] mx-auto xl:absolute top-[-200px] lg:left-3 xl:left-2 2xl:left-10 3xl:left-24" onSubmit={handleSubmit}>
          <div className='min-h-[80px]'>
            <Image
              width={100}
              height={100}
              alt="logo"
              src={'/images/Logo2.svg'}
              className="mx-auto items-center size-1/2 lg:size-auto"
            />
          </div>
          <div>
            <h3 className="text-[#CE5C1C] font-semibold text-[20px] lg:text-3xl">Login</h3>
            <p className="text-[#213B85] font-normal text-xs lg:text-sm">Welcome Back!</p>
          </div>

          <div className="group group-focus-within:border-[#CE5C1C]" title='Please fill in your contact details'>
            <label htmlFor="email" className="text-[#1A1A1A] font-medium text-xs lg:text-sm">
              Email or Mobile Number<span className="text-[#CE5C1C]">*</span>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 lg:px-2 lg:py-3 group-focus-within:border-[#CE5C1C]">
                <FaRegUser className='mx-1.5 h-[17px] w-[16px] my-1' />
                <input
                  type="email"
                  name="input"
                  id="email"
                  placeholder="Email address or Mobile Number"
                  className="text-[#777777] text-xs lg:text-sm border-none outline-none w-full bg-transparent group-focus:border-[#CE5C1C]"
                  value={formData.input}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && <p className="text-[#CE5C1C] text-sm mt-2">{errors.email}</p>}
            </label>
          </div>

          <div className="group group-focus-within:border-[#CE5C1C]" title='Password must be at least 6 characters long'>
            <label htmlFor="password" className="text-[#1A1A1A] font-medium text-xs lg:text-sm">
              Password<span className="text-[#CE5C1C]">*</span>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 lg:px-2 lg:py-3 group-focus-within:border-[#CE5C1C]">
                <Image width={100} height={100} alt="person" src={'/images/lock.svg'} className="size-auto" />
                <input
                  type={show ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="text-[#777777] text-xs lg:text-sm border-none outline-none w-full"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div onClick={() => setShow(!show)} className="cursor-pointer">
                  {show ? <MdOutlineVisibility fontSize={22} color='#555555' /> : <MdOutlineVisibilityOff color='#555555' fontSize={22} />}
                </div>
              </div>
              {errors.password && <p className="text-[#CE5C1C] text-sm mt-2">{errors.password}</p>}
            </label>
          </div>
          {isValidUser &&
            <div className='bg-[#FFF4ED] p-2 rounded-md border border-[#CE5C1C] flex items-start gap-2 mt-2 transition-all'>
              <div>
                <IoWarningOutline className='text-[#CE5C1C] text-xl' />
              </div>
              <p className="text-[#CE5C1C] text-sm font-medium">Your Email or Password are incorrect. Please try again.</p>
            </div>
          }
          <button
            type="submit"
            className="bg-[#213B85] text-white font-extrabold text-base lg:text-xl w-full p-2 lg:px-3 lg:py-3 mt-3 rounded-xl"
            onClick={handleSubmit}
          >
            {loading ? (
              <svg
                className="w-5 h-7 text-white animate-spin mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
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
    </section>
  );
};

export default LoginForm;
