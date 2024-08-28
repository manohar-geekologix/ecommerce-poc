'use client';
import { auth } from '@/app/firebase';
import { users } from '@/utils/MockData';
import { RecaptchaVerifier } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdVisibility } from 'react-icons/md';

const LoginForm = () => {
  const [formData, setFormData] = useState({ input: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  //   useEffect(() => {
  //     if (!window.recaptchaVerifier) {
  //       window.recaptchaVerifier = new RecaptchaVerifier(
  //         'recaptcha-container',
  //         {
  //           size: 'normal',
  //           callback: (response) => {},
  //           'expired-callback': () => {},
  //         },
  //         auth
  //       );
  //     }
  //   }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };
  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (emailRegex.test(formData.input)) return 'email';
    if (phoneRegex.test(formData.input)) return 'phone';
    return null;
  };
  const sendOtp = async (email, otp) => {
    try {
      setLoading(true);
      const res = await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to send OTP');
      const result = await res.json();
      router.push('/send-code');
      return result;
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = async () => {
    const inputType = validateInput();

    if (!inputType) {
      setErrors((prev) => ({ ...prev, input: 'Please enter a valid email or phone number.' }));
      return;
    }

    if (formData.password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters.' }));
      return;
    }

    const user = users.find(
      (u) => (u.email === formData.input || u.phone === formData.input) && u.password === formData.password
    );

    if (!user) {
      toast.error('No user found with that email or phone number.');
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
    <section className="bg-gray-50 bg-small-login-bg lg:bg-login-bg bg-no-repeat bg-center bg-cover h-screen flex justify-center items-center lg:px-10 px-4 flex-col lg:flex-row">
      <div className="lg:w-1/2 lg:block hidden">
        <div className="flex flex-col gap-1 lg:gap-5">
          <h1 className=" text-[#CE5C1C] font-medium text-2xl lg:text-5xl">Welcome to</h1>
          <h3 className="text-[#213B85] font-bold text-[32px] lg:text-6xl">Demo Project</h3>
        </div>
        <div className="lg:block hidden">
          <Image width={100} height={100} alt="man's svg" src={'/images/mans.svg'} className="size-auto" />
        </div>
      </div>
      <div className="lg:w-1/2 w-full relative">
        <div className="lg:hidden block text-center">
          <div className="flex flex-col gap-1">
            <h1 className=" text-[#CE5C1C] font-medium text-2xl">Welcome to</h1>
            <h3 className="text-[#213B85] font-bold text-[32px]">Demo Project</h3>
          </div>
        </div>
        <form className="bg-white px-5 py-3 lg:px-16 lg:py-5 rounded-2xl shadow-login-shadow flex flex-col gap-2 lg:gap-4 w-full sm:w-1/2 lg:w-[500px] mx-auto lg:absolute top-[-300px] left-14">
          <Image
            width={100}
            height={100}
            alt="logo"
            src={'/images/Logo2.svg'}
            className="mx-auto items-center size-auto"
          />
          <div>
            <h3 className="text-[#CE5C1C] font-semibold text-[20px] lg:text-3xl">Login</h3>
            <p className="text-[#213B85] font-normal text-xs lg:text-sm">Welcome Back!</p>
          </div>
          <div className="group group-focus-within:border-[#CE5C1C]">
            <label htmlFor="username" className="text-[#1A1A1A] font-medium text-xs lg:text-sm">
              Name<span className="text-[#CE5C1C]">*</span>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 lg:px-2 lg:py-3 group-focus-within:border-[#CE5C1C]">
                <Image width={100} height={100} alt="person" src={'/images/person.svg'} className="size-auto" />
                <input
                  type="text"
                  name="name"
                  id="username"
                  placeholder="Full Name"
                  className="text-[#777777] text-xs lg:text-sm border-none outline-none w-full"
                />
              </div>
            </label>
          </div>
          <div className="group group-focus-within:border-[#CE5C1C]">
            <label htmlFor="email" className="text-[#1A1A1A] font-medium text-xs lg:text-sm">
              Email<span className="text-[#CE5C1C]">*</span>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 lg:px-2 lg:py-3 group-focus-within:border-[#CE5C1C]">
                <Image width={100} height={100} alt="mail" src={'/images/mail.svg'} className="size-auto" />
                <input
                  type="email"
                  name="input"
                  id="email"
                  placeholder="Email Address"
                  className="text-[#777777] text-xs lg:text-sm border-none outline-none w-full bg-transparent group-focus:border-[#CE5C1C]"
                  value={formData.input}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.input && <p className="text-[#CE5C1C] text-sm">{errors.input}</p>}
            </label>
          </div>

          <div className="group group-focus-within:border-[#CE5C1C]">
            <label htmlFor="mobile-number" className="text-[#1A1A1A] font-medium text-xs lg:text-sm ">
              Mobile Number<span className="text-[#CE5C1C]">*</span>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 lg:px-2 lg:py-3 group-focus-within:border-[#CE5C1C]">
                <Image
                  width={100}
                  height={100}
                  alt="mobile_android"
                  src={'/images/phone_android.svg'}
                  className="size-auto"
                />
                <input
                  type="text"
                  name="mobile-number"
                  id="mobile-number"
                  placeholder="Mobile Number"
                  className="text-[#777777] text-xs lg:text-sm border-none outline-none w-full"
                />
              </div>
            </label>
          </div>

          <div className="group group-focus-within:border-[#CE5C1C]">
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
                  {show ? <MdOutlineVisibility fontSize={22} /> : <MdOutlineVisibilityOff fontSize={22} />}
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
            </label>
          </div>
          <button
            type="button"
            className="bg-[#213B85] text-white font-extrabold text-xl w-full p-2 lg:px-3 lg:py-3 mt-3 rounded-xl"
            onClick={handleSubmit}
          >
            {loading ? (
              <svg
                className="w-5 h-5 text-white animate-spin mx-auto"
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
