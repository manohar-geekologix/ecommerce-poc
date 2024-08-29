"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { FaLessThan } from "react-icons/fa";

const SendCode = () => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // Array to hold 6 digits
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
    const otpString = otp.join(""); // Combine array into a string

   
      const verification = localStorage.getItem("verificationOtp");
      if (otpString === verification) {
        let token = generateUniqueString();
        Cookies.set("accessToken", token, { expires: 7, path: "/" });
        localStorage.removeItem("verificationOtp");
        router.push("/");
        toast.success("OTP verified successfully!");
      } else {
        toast.error("Invalid OTP");
      }
  };

  return (
    <section className="bg-gray-50 bg-small-login-bg lg:bg-login-bg bg-no-repeat bg-center bg-cover h-screen flex justify-center items-center lg:px-10 px-4 flex-col lg:flex-row">
      <div className="lg:w-1/2 lg:block hidden">
        <div className="flex flex-col gap-1 lg:gap-5">
          <h1 className=" text-[#CE5C1C] font-medium text-2xl lg:text-5xl">
            Welcome to
          </h1>
          <h3 className="text-[#213B85] font-bold text-[32px] lg:text-6xl">
            Demo Project
          </h3>
        </div>
        <div className="lg:block hidden">
          <Image
            width={100}
            height={100}
            alt="man's svg"
            src={"/images/mans.svg"}
            className="size-auto"
          />
        </div>
      </div>
      <div className="lg:w-1/2 w-full relative  flex flex-col  h-full justify-normal ">
        <div className="lg:hidden block text-start top-0 ">
          <div className="flex flex-col gap-1 ">
            <h1 className=" text-[#CE5C1C] font-medium text-2xl mt-10">
              Welcome to
            </h1>
            <h3 className="text-[#213B85] font-bold text-[32px]">
              DEMO PROJECT
            </h3>
          </div>
        </div>
        <div className=" h-full flex m-auto items-center">
          <div className="w-full bg-white rounded-xl lg:mr-56 shadow-lg lg:mt-10 sm:max-w-md ">
            <Image
              width={100}
              height={100}
              alt="logo"
              src={"/images/Logo.svg"}
              className="mx-auto pt-5  w-[260px]"
            />
            <div className="px-6 mt-4   lg:px-7">
              <header className="mb-3 lg:ml-6">
                <h1 className="text-2xl font-bold mb-1 text-[#CE5C1C]">
                  OTP Verification
                </h1>
                <p className="text-[12px] text-[#213B85] ">
                  Please enter the 6-digit code sent to you on your Email
                  Address.
                </p>
              </header>
              <form
                className="space-y-3 md:space-y-4  justify-center text-center items-center"
                onSubmit={handleVerifyOtp}
              >
                <div
                  className="flex items-center justify-center gap-3"
                  onPaste={handlePaste}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      className="w-8 sm:w-[44px]  h-8 sm:h-12 rounded-md text-center text-sm font-bold  text-slate-900  border border-gray-300 hover:border-slate-500 appearance-none  outline-none focus:bg-white focus:border-[#CE5C1C] focus:ring-1 focus:ring-[#CE5C1C]"
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
                <div className="text-[14px] flex  text-center justify-center items-center mr-8 mb-10 pb-7">
                  <FaLessThan className="text-[#CE5C1C] size-4 mr-2" />
                  <Link href="/login" className="underline text-[#213B85]">
                    Back to login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendCode;