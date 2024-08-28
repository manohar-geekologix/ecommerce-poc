'use client';
import { auth } from '@/app/firebase';
import { users } from '@/utils/MockData';
import { RecaptchaVerifier } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const LoginForm = () => {
  const [formData, setFormData] = useState({ input: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
      <div className="w-1/2">
        <form className="bg-white px-16 py-5 rounded-2xl shadow-login-shadow flex flex-col gap-4 w-[520px]">
          <Image width={100} height={100} alt="logo" src={'/images/Logo.svg'} className="mx-auto w-[260px]" />
          <div>
            <h3 className="text-[#CE5C1C] font-semibold text-3xl">Login</h3>
            <p className="text-[#213B85] font-normal text-sm">Welcome Back!</p>
          </div>

          <div className="group group-focus-within:border-[#CE5C1C]">
            <label htmlFor="username" className="text-[#1A1A1A] font-medium text-sm">
              Name<span className="text-[#CE5C1C]">*</span>
              <div className="flex items-center gap-2 border rounded-lg px-2 py-3 group-focus-within:border-[#CE5C1C]">
                <Image width={100} height={100} alt="person" src={'/images/person.svg'} className="size-auto" />
                <input
                  type="text"
                  name="name"
                  id="username"
                  placeholder="Full Name"
                  className="text-[#777777] text-sm border-none outline-none w-full"
                />
              </div>
            </label>
          </div>
          <div className="group group-focus-within:border-[#CE5C1C]">
            <label htmlFor="email" className="text-[#1A1A1A] font-medium text-sm">
              Email<span className="text-[#CE5C1C]">*</span>
              <div className="flex items-center gap-2 border rounded-lg px-2 py-3 group-focus-within:border-[#CE5C1C]">
                <Image width={100} height={100} alt="mail" src={'/images/mail.svg'} className="size-auto" />
                <input
                  type="email"
                  name="input"
                  id="email"
                  placeholder="Email Address"
                  className="text-[#777777] text-sm border-none outline-none w-full bg-transparent group-focus:border-[#CE5C1C]"
                  value={formData.input}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.input && <p className="text-[#CE5C1C] text-sm">{errors.input}</p>}
            </label>
          </div>

          <div className="group group-focus-within:border-[#CE5C1C]">
            <label htmlFor="mobile-number" className="text-[#1A1A1A] font-medium text-sm ">
              Mobile Number<span className="text-[#CE5C1C]">*</span>
              <div className="flex items-center gap-2 border rounded-lg px-2 py-3 group-focus-within:border-[#CE5C1C]">
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
                  className="text-[#777777] text-sm border-none outline-none w-full"
                />
              </div>
            </label>
          </div>
     
          <div className="group group-focus-within:border-[#CE5C1C]">
            <label htmlFor="password" className="text-[#1A1A1A] font-medium text-sm">
              Password<span className="text-[#CE5C1C]">*</span>
              <div className="flex items-center gap-2 border rounded-lg px-2 py-3 group-focus-within:border-[#CE5C1C]">
                <Image width={100} height={100} alt="person" src={'/images/lock.svg'} className="size-auto" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="text-[#777777] text-sm border-none outline-none w-full"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Image width={100} height={100} alt="person" src={'/images/visibility_off.svg'} className="size-auto" />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
            </label>
          </div>
          <button
            type="button"
            className="bg-[#213B85] text-white font-extrabold text-xl w-full px-3 py-3 mt-3 rounded-xl"
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
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
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
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
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
                id="sign-in-button"
                onClick={handleSubmit}
                type="button"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-800 disabled:bg-gray-600"
              >
                Login
              </button>
              <div id="recaptcha-container"></div>
            </form>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default LoginForm;
