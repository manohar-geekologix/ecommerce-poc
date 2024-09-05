'use client';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaLessThan } from 'react-icons/fa';
import firebaseApp from '../../firebase';
// 

  const SendCode = () => {
    const [otp, setOtp] = useState(new Array(6).fill("")); // Array to hold 6 digits
    const inputRefs = useRef([]); // Array of refs to handle input focus
    const router = useRouter();
    const auth = getAuth(firebaseApp);
    auth.useDeviceLanguage()
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
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
   
    const handlePaste = (e) => {
      const pasteData = e.clipboardData.getData("text").slice(0, 6);
      if (!/^\d+$/.test(pasteData)) return; // Ensure only digits are pasted
      const newOtp = pasteData.split("");
      setOtp(newOtp);
   
      // Move focus to the last filled input
      inputRefs.current[Math.min(newOtp.length - 1, 5)].focus();
    };
   
    function generateUniqueString() {
      const characters =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   
      if (characters.length < 30) {
        throw new Error(
          "Not enough unique characters to generate a 30-character string."
        );
      }
   
      let uniqueString = "";
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
      const otpString = otp.join(""); // Combine array into a string
      if (verificationId) {
            
        const otpString = otp.join(''); // Combine array into a string

        try {
            const credential = PhoneAuthProvider.credential(verificationId, otpString);
            await signInWithCredential(auth, credential);
            let token = generateUniqueString();
            Cookies.set("accessToken", token, { expires: 7, path: "/" });
            router.push("/inventory");
            toast.success("OTP verified successfully!");
            localStorage.removeItem('verificationId');
        } catch (error) {
          console.log("error",error)
          toast.error("Invalid OTP");
        }
    }else{
        const verification = localStorage.getItem("verificationOtp");
        if (otpString === verification) {
          let token = generateUniqueString();
          Cookies.set("accessToken", token, { expires: 7, path: "/" });
          localStorage.removeItem("verificationOtp");
          router.push("/inventory");
          toast.success("OTP verified successfully!");
        } else {
          toast.error("Invalid OTP");
        }
      }
    };

  return (
    <section className="bg-small-login-bg lg:bg-login-bg bg-no-repeat bg-center bg-cover h-[100vh] flex justify-center items-center gap-7 lg:gap-0 xl:px-10 px-2 flex-col lg:flex-row overflow-hidden">
      <div className="sm:w-1/2 text-start w-full">
        <div className="flex flex-col lg:gap-5 ">
          <h1 className=" text-[#CE5C1C] font-medium text-2xl lg:text-5xl">Welcome to</h1>
          <h3 className="text-[#213B85] font-bold text-[32px] lg:text-6xl">Warehouse Management.</h3>
        </div>
        <div className="lg:block hidden w-fit min-h-[451px] pt-5 3xl:pt-36">
          <Image width={100} height={100} alt="man's svg" src={'/images/mans.svg'} className="size-auto" />
        </div>
      </div>
      <div className="lg:w-1/2 w-full relative">
        <div className="bg-white px-5 py-3 lg:px-5 lg:py-5 rounded-2xl shadow-login-shadow flex flex-col gap-2 lg:gap-4 xs:w-[360px] sm:w-[420px] md:w-[450px] mx-auto xl:absolute top-[-200px] lg:left-3 xl:left-2 2xl:left-10 3xl:left-24">
          <div className="min-h-[80px]">
            <Image
              width={100}
              height={100}
              alt="logo"
              src={'/images/Logo2.svg'}
              className="mx-auto items-center size-1/2 lg:size-auto"
            />
          </div>
          <div className="sm:px-6 mt-4   lg:px-6">
            <header className="mb-3 ">
              <h1 className="text-xl lg:text-3xl font-semibold lg:font-bold mb-1 text-[#CE5C1C]">OTP Verification</h1>
              <p className="text-xs lg:text-sm text-[#213B85] ">Enter 6-digit code sent to your Email Address.</p>
            </header>
            <form
              className="space-y-3 md:space-y-4  justify-center text-center items-center"
              onSubmit={handleVerifyOtp}
            >
              <div className="flex justify-between sm:gap-2 gap-1" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    className="w-[35px] h-[42px] md:w-[40px] lg:h-[50px] lg:w-[45px] rounded-md text-center text-[16px] font-bold text-slate-900  border border-gray-300 hover:border-slate-500 appearance-none  outline-none focus:bg-white focus:border-[#CE5C1C] focus:ring-1 focus:ring-[#CE5C1C]"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyUp={(e) => handleKeyUp(e, index)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="bg-[#213B85] text-white font-extrabold text-base lg:text-xl w-full p-2 lg:px-3 lg:py-3 mt-3 rounded-xl"
              >
                Verify OTP
              </button>
              <div className="text-sm lg:text-base flex  text-center justify-center items-center mb-10 pb-7">
                <Link href="/login" className="underline text-[#213B85]">
                  Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendCode;
