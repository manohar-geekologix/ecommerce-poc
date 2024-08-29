'use client';
import { users } from '@/utils/MockData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

const LoginForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error if the input is valid
    if (name === 'email' && errors.email && validateEmail(value)) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(formData.email)) newErrors.email = 'Please enter correct email address.';
    if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number.';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const user = users.find(
      (u) => (u.email === formData.email || u.phone === formData.phone) && u.password === formData.password
    );

    if (!user) return toast.error('No user found with that email or phone number.');

    const otp = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('verificationOtp', otp);
    await sendOtp(user.email, otp);
  };

  return (
    <section className="bg-small-login-bg lg:bg-login-bg bg-no-repeat bg-center bg-cover h-[100vh] flex justify-center items-center gap-7 lg:gap-0 xl:px-10 px-2 flex-col lg:flex-row overflow-hidden">
      <div className="sm:w-1/2 text-start w-full">
        <div className="flex flex-col lg:gap-5 ">
          <h1 className=" text-[#CE5C1C] font-medium text-2xl lg:text-5xl">Welcome to</h1>
          <h3 className="text-[#213B85] font-bold text-[32px] lg:text-6xl">E-Commerce.</h3>
        </div>
        <div className="lg:block hidden w-fit min-h-[451px] pt-5 3xl:pt-36">
          <Image width={100} height={100} alt="man's svg" src={'/images/mans.svg'} className="size-auto" />
        </div>
      </div>
      <div className="lg:w-1/2 w-full relative">
        <form className="bg-white px-5 py-3 lg:px-10 lg:py-5 rounded-2xl shadow-login-shadow flex flex-col gap-2 lg:gap-4 w-full sm:w-1/2 lg:w-[450px] mx-auto xl:absolute top-[-300px] lg:left-3 xl:left-2 2xl:left-10 3xl:left-24">
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

          <div className="group group-focus-within:border-[#CE5C1C]">
            <label htmlFor="email" className="text-[#1A1A1A] font-medium text-xs lg:text-sm">
              Email<span className="text-[#CE5C1C]">*</span>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 lg:px-2 lg:py-3 group-focus-within:border-[#CE5C1C]">
                <Image width={100} height={100} alt="mail" src={'/images/mail.svg'} className="size-auto" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  className="text-[#777777] text-xs lg:text-sm border-none outline-none w-full bg-transparent group-focus:border-[#CE5C1C]"
                  value={formData.input}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && <p className="text-[#CE5C1C] text-sm mt-2">{errors.email}</p>}
            </label>
          </div>

          <div className="group group-focus-within:border-[#CE5C1C]">
            <label htmlFor="mobile-number" className="text-[#1A1A1A] font-medium text-xs lg:text-sm ">
              Mobile Number
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  id="phone"
                  placeholder="Mobile Number"
                  className="text-[#777777] text-xs lg:text-sm border-none outline-none w-full"
                />
              </div>
              {errors.phone && <p className="text-[#CE5C1C] text-sm mt-2">{errors.phone}</p>}
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
                  {show ? <MdOutlineVisibility fontSize={22} color='#555555' /> : <MdOutlineVisibilityOff color='#555555' fontSize={22} />}
                </div>
              </div>
              {errors.password && <p className="text-[#CE5C1C] text-sm mt-2">{errors.password}</p>}
            </label>
          </div>
          <button
            type="button"
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
